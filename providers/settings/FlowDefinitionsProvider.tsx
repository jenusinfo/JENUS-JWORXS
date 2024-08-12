import { useHookHashTag } from "hooks/HasTagHook";
import { useHookFlowDefinitions } from "hooks/Settings/FlowDefinitionsHook";
import { useHookFormDefinitions } from "hooks/Settings/FormDefinitions";
import { useHookGroups } from "hooks/Settings/GroupsHook";
import { CreateFlowDefinition, DeleteFlowDefinition, UpdateFlowDefinition } from "lib/settings/flow-definitions";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";

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

    const { flowDefinitions, setFlowDefinitions } = useHookFlowDefinitions()
    const { formDefinitions } = useHookFormDefinitions()
    const { groups } = useHookGroups()
    const { hashTags } = useHookHashTag()
    const [curPageNumber, setCurPageNumber] = useState(1)
    const [curIndex, setCurIndex] = useState(-1)
    const [info, setInfo] = useState<any>({})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const handleCreate = async () => {
        const res = await CreateFlowDefinition(info)

        if (res.Data != null)
            setFlowDefinitions([...flowDefinitions, res.Data])
    }

    const handleDelete = async (id: any, index: number) => {
        await DeleteFlowDefinition(id)
        let res = [...flowDefinitions]
        res.splice(index, 1)
        setFlowDefinitions(res)
    }

    const handleUpdate = async () => {
        const res = await UpdateFlowDefinition(info.Id, info)
        let temp = [...flowDefinitions]
        temp[curIndex] = res.Data
        setFlowDefinitions(temp)
    }

    const isOptionSelected = (list: any, id: any, name: string) => {
        console.log("--->", id)
        let flag = 0

        list?.forEach((item: any) => {
            if (name == "HashTags") {
                if (item == id)
                    flag = 1
            } else if (name == 'InterviewFormPermit') {
				if (item.GroupId == id)
					flag = 1
			} else {
                if (item.Id == id) {
                    flag = 1
                }
            }
        })

        if (flag == 0)
            return false
        else if (flag == 1)
            return true
    }

    console.log(info)

    const handleMultiChange = (name: string, value: any) => {
        let temp = { ...info }

        let tmp: any = []
        if (temp[`${name}`] == undefined) {
            temp[`${name}`] = []
            if (name == "InterviewFormPermit") {
                tmp.push({
                    GroupId: value.value
                })
            } else if (name == "HashTags") {
                tmp.push(value.value)
            }
        } else {
            temp[`${name}`].forEach((item: any) => {
                if (name == "HashTags" ? item != value.value : name == "InterviewFormPermit" ? item.GroupId != value.value : item.Id != value.value) {
                    if (name == "InterviewFormPermit") {
                        tmp.push({
                            GroupId: item.GroupId
                        })
                    } else if (name == "HashTags") {
                        tmp.push(item)
                    }
                }
            })

            if (!isOptionSelected(temp[`${name}`], value.value, name)) {
                if (name == "InterviewFormPermit") {
                    tmp.push({
                        GroupId: value.value
                    })
                } else if (name == "HashTags") {
                    tmp.push(value.value)
                }
            }
        }
        temp[`${name}`] = tmp

        setInfo(temp)
    }

    const value = useMemo(
        () => ({
            flowDefinitions,
            curPageNumber,
            setCurPageNumber,
            info,
            setInfo,
            curIndex,
            setCurIndex,
            handleChange,
            handleCreate,
            handleDelete,
            handleUpdate,
            formDefinitions,
            groups,
            hashTags,
            handleMultiChange
        }),
        [
            flowDefinitions,
            curPageNumber,
            setCurPageNumber,
            info,
            setInfo,
            curIndex,
            setCurIndex,
            handleChange,
            handleCreate,
            handleDelete,
            handleUpdate,
            formDefinitions,
            groups,
            hashTags,
            handleMultiChange
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