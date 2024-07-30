import { useHookParameters } from "hooks/Settings/ParametersHook";
import { createContext, useContext, useMemo, useState } from "react";

const ParametersContext: any = createContext(null)

export interface IParameter {
    CreatedById: number
    CreatedOn: string
    CreatedBy: string
    ModifiedById: number
    ModifiedBy: string
    ModifiedOn: string
    Id: number
    Name: string
    Description: string
    IsActive: boolean
}

const ParametersProvider = ({ children }: any) => {

    const { parameters, setParameters } = useHookParameters()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            parameters,
            curPageNumber,
            setCurPageNumber
        }),
        [
            parameters,
            curPageNumber,
            setCurPageNumber
        ]
    )

    return <ParametersContext.Provider value={value}>{children}</ParametersContext.Provider>
}

export const useParameters = () => {
    const context: any = useContext(ParametersContext)
    if (!context) {
        throw new Error("useParameters must be used within ParametersProvider")
    }
    return context
}

export default ParametersProvider