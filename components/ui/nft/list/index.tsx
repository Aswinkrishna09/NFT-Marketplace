/* eslint-disable @next/next/no-img-element */

import React, { FunctionComponent } from 'react'
import { NftMeta } from '@_types/nft'
import NftItem from '../item'

type NftListProps = {
    nfts: NftMeta[]
}

const NftList: FunctionComponent<NftListProps> = ({ nfts }) => {
    return (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {nfts.map(nft => <NftItem key={nft.image} nft={nft} />)}
        </div>
    )
}

export default NftList