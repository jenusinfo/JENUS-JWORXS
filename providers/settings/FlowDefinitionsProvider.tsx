import { useHookFlowDefinitions } from "hooks/Settings/FlowDefinitionsHook";
import { createContext, useContext, useMemo, useState } from "react";

const FlowDefinitionsContext: any = createContext(null)

export interface IFlowDefinitions {
    CreatedById: number
    CreatedBy: string
    CreatedOn: string
    ModifiedById: number
    ModifiedBy: string
    ModifiedOn: string
    IsFavourite: boolean
    Id: number
    Name: string
    RootTagName: string
    IsActive: boolean
    Description: null | string
    LinkToDashboard: boolean
    InterviewFormPermit: Array<
        {
            GroupId: number
        }
    >
    IsCheckerRequired: boolean
    HashTags: Array<string>
    IsCoverPageInterviewForm: boolean
    Subject: null | string
    TaskDefinitionId: null
}

const FlowDefinitionsProvider = ({ children }: any) => {

    const { flowDefinitions } = useHookFlowDefinitions()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            flowDefinitions,
            curPageNumber,
            setCurPageNumber
        }),
        [
            flowDefinitions,
            curPageNumber,
            setCurPageNumber
        ]
    )

    return <FlowDefinitionsContext.Provider value={value}>{children}</FlowDefinitionsContext.Provider>
}

export const useFlowDefinitions = () => {
    const context: any = useContext(FlowDefinitionsContext)
    if (!context) {
        throw new Error("useFlowDefinitions must be used within FlowDefinitionsProvider")
    }
    return context
}

export default FlowDefinitionsProvider