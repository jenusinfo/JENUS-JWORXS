import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHookHashTag } from "hooks/HasTagHook";
import { useHookFlowDefinitions } from "hooks/Settings/FlowDefinitionsHook";
import { useHookFormDefinitions } from "hooks/Settings/FormDefinitions";
import { useHookGroups } from "hooks/Settings/GroupsHook";
import { CreateFormDefinition, DeleteFormDefinition, UpdateFormDefinition } from "lib/settings/form-definitions";

const FormDefinitionsContext: any = createContext(null)

export interface IFormDefinitions {
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

const FormDefinitionsProvider = ({ children }: any) => {

    const { flowDefinitions, setFlowDefinitions } = useHookFlowDefinitions()
    const { formDefinitions, setFormDefinitions, getFormDefinitions } = useHookFormDefinitions()
    const { groups } = useHookGroups()
    const { hashTags } = useHookHashTag()
    const [curPageNumber, setCurPageNumber] = useState(1)
    const [curIndex, setCurIndex] = useState(-1)
    const [info, setInfo] = useState<any>({})
    const [search, setSearch] = useState("")
    const [data, setData] = useState<any>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const handleCreate = async () => {
        const res = await CreateFormDefinition(info)

        if (res.Data != null)
            setFormDefinitions([...formDefinitions, res.Data])
    }

    const handleDelete = async (id: any, index: number) => {
        await DeleteFormDefinition(id)
        getFormDefinitions()
    }

    const handleUpdate = async () => {
        const res = await UpdateFormDefinition(info.Id, info)
        let temp = [...formDefinitions]
        temp[curIndex] = res.Data
        setFormDefinitions(temp)
    }

    const isOptionSelected = (list: any, id: any, name: string) => {
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

    useEffect(() => {
		if (search) {
			const filteredData = formDefinitions.filter((item: IFormDefinitions) =>
				item.Name.toLowerCase().includes(search.toLowerCase()) ||
				item.HashTags?.join(",").toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(formDefinitions)
		}
	}, [search])

	useEffect(() => { setData(formDefinitions) }, [formDefinitions])

    const value = useMemo(
        () => ({
            flowDefinitions, data,
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
            handleMultiChange,
            search, setSearch
        }),
        [
            flowDefinitions, data,
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
            handleMultiChange,
            search, setSearch
        ]
    )

    return <FormDefinitionsContext.Provider value={value}>{children}</FormDefinitionsContext.Provider>
}

export const useFormDefinitions = () => {
    const context: any = useContext(FormDefinitionsContext)
    if (!context) {
        throw new Error("useFormDefinitions must be used within FlowDefinitionsProvider")
    }
    return context
}

export default FormDefinitionsProvider