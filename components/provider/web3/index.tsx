import React, { createContext, FunctionComponent, useContext, useState } from "react"

const Web3Context = createContext<any>(null)

interface Props {
    children: React.ReactNode
}

const Web3Provider:FunctionComponent<Props> = ({children})=>{
    const [web3Url ,setWeb3Url] = useState({test:"Hello Provider!"})
    return(
        <Web3Context.Provider value={web3Url}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3(){
    return useContext(Web3Context)
}

export default Web3Provider