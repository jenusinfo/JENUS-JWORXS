import { useHookFormDefinitions } from "hooks/Settings/FormDefinitions";
import { createContext, useContext, useMemo, useState } from "react";

const FormDefinitionsContext: any = createContext(null)

export interface IFormDefinitions {
    CreatedById: number
    CreatedOn: string
    CreatedBy: string
    ModifiedById: number
    ModifiedOn: string
    ModifiedBy: string
    Id: number
    Name: string
    Description: string
    DefaultActivityName: null | string
    Comments: string
    IsActive: boolean
    AllowMultipleTasksPerInterview: boolean
    AllowMultipleTasksPerDocument: boolean
}

const FormDefinitionsProvider = ({ children }: any) => {

    const { formDefinitions, setFormDefinitions} = useHookFormDefinitions()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            formDefinitions,
            curPageNumber,
            setCurPageNumber
        }),
        [
            formDefinitions,
            curPageNumber,
            setCurPageNumber
        ]
    )

    return <FormDefinitionsContext.Provider value={value}>{children}</FormDefinitionsContext.Provider>
}

export const useFormDefinitions = () => {
    const context: any = useContext(FormDefinitionsContext)
    if (!context) {
        throw new Error("useFormDefinitions must be used within FormDefinitionsProvider")
    }
    return context
}

export default FormDefinitionsProvider