import { createContext, useContext, useMemo, useState } from "react";

const CabinetContext: any = createContext(null)

const CabinetProvider = ({ children }: any) => {

    const value = useMemo(
        () => ({
        }),
        [
        ]
    )

    return <CabinetContext.Provider value={value}>{children}</CabinetContext.Provider>
}

export const useCabinet = () => {
    const context: any = useContext(CabinetContext)
    if (!context) {
        throw new Error("useCabinet must be used within CabinetProvider")
    }
    return context
}

export default CabinetProvider