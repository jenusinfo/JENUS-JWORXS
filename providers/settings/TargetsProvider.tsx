import { useHookTargets } from "hooks/Settings/TargetsHook";
import { createContext, useContext, useMemo, useState } from "react";

const TargetsContext: any = createContext(null)

export interface ITarget {
    CreatedById: number
    CreatedOn: string
    CreatedBy: string
    ModifiedById: number
    ModifiedOn: string
    ModifiedBy: string
    Id: number
    Name: string
    Description: string
    IsActive: boolean
}

const TargetsProvider = ({ children }: any) => {

    const { targets, setTargets } = useHookTargets()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            targets,
            curPageNumber,
            setCurPageNumber
        }),
        [
            targets,
            curPageNumber,
            setCurPageNumber
        ]
    )

    return <TargetsContext.Provider value={value}>{children}</TargetsContext.Provider>
}

export const useTargets = () => {
    const context: any = useContext(TargetsContext)
    if (!context) {
        throw new Error("useTargets must be used within TargetsProvider")
    }
    return context
}

export default TargetsProvider