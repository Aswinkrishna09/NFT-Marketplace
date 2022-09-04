import React, { FunctionComponent } from "react"

interface Props {
    children: React.ReactNode
}


const BaseLayout: FunctionComponent<Props> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default BaseLayout