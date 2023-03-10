import React, { createContext, FunctionComponent, useContext, useEffect, useState } from "react"
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils"
import { ethers } from 'ethers'
import { setupHooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/inpage-provider";

interface Props {
    children: React.ReactNode;
}

const pageReload = () => window.location.reload()

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked())
    if (isLocked) { pageReload(); }
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum?.on('chainChanged', pageReload)
    ethereum?.on("accountsChanged", handleAccount(ethereum))
}

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum?.removeListener('chainChanged', pageReload)
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Props> = ({ children }) => {
    const [web3Url, setWeb3Url] = useState<Web3State>(createDefaultState())

    useEffect(() => {
        async function initWeb3() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum as any)
                const contract = await loadContract('NftMarket', provider)
                setGlobalListeners(window.ethereum)
                setWeb3Url(createWeb3State({ ethereum: window.ethereum, provider, contract, isLoading: false }))
            } catch (error: any) {
                console.log(error.message)
                console.error("Please install web3 wallet")
                setWeb3Url((prev: any) => createWeb3State({ ...prev, isLoading: false }))
            }
        }
        initWeb3()
        return () => removeGlobalListeners(window.ethereum)
    }, [])



    return (
        <Web3Context.Provider value={web3Url}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context)
}

export function useHooks() {
    const { hooks } = useWeb3()
    return hooks
}


export default Web3Provider