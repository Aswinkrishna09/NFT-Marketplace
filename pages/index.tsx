/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { NftList } from '@ui'
import BaseLayout from '@ui/layout/BaseLayout'
import nfts from '../contents/meta.json'
import { NftMeta } from '@_types/nft'
import { useWeb3 } from '@provider/web3'

const Home: NextPage = () => {
  // const { etherium, providers, contract, isLoading } = useWeb3();
  const { provider, contract } = useWeb3();

  const getAccounts = async () => {
    const accounts = await provider!.listAccounts()
  }

  const getNftInfo = async () => {
    // console.log("name is ", await contract!.name())
    // console.log("symbol is ", await contract!.symbol())
  }
  if (contract) {
    getNftInfo()
  }
  if (provider) {
    getAccounts()
  }

  return (
    <BaseLayout>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Amazing Creatures NFTs</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          <NftList nfts={nfts as NftMeta[]} />
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home
