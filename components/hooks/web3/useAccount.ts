import { CryptoHookFactory } from '@_types/hooks';
import { useEffect } from 'react';
import useSWR from 'swr';

type UseAccountResponse = {
    connect: () => void;
    isLoading: boolean;
    isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory = ({ provider, ethereum, isLoading }) => () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
        provider ? "web3/useAccount" : null,
        async () => {
            const accounts = await provider!.listAccounts();
            if (!accounts[0]) {
                throw "Cannot retreive account! Please, Connect to web3 wallet."
            }
            return accounts[0];
        }, {
        revalidateOnFocus: false,
        shouldRetryOnError: false
    }
    )

    useEffect(() => {
        ethereum?.on("accountsChanged", handleAccountsChanged);
        return () => {
            ethereum?.removeListener('accountsChanged', handleAccountsChanged)
        }
    })

    const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as string[];
        console.log("Account changed ", accounts)
        if (accounts.length === 0) {
            console.error("Please, connect to Web3 wallet");
        } else if (accounts[0] !== data) {
            mutate(accounts[0])
        }
    }

    const connect = async () => {
        try {
            ethereum?.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
    }
    return {
        ...swr,
        data,
        isValidating,
        isLoading: isLoading || isValidating,
        isInstalled: ethereum?.isMetaMask || false,
        mutate,
        connect
    }
}