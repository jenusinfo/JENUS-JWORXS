import { useHookFormDefinitions } from "hooks/Settings/FormDefinitions";
import { useHookGroups } from "hooks/Settings/GroupsHook";
import { CreateTaskDefinition, DeleteTaskDefinition, UpdateTaskDefinition } from "lib/settings/form-definitions";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";

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

    const { groups } = useHookGroups()
    const { formDefinitions, setFormDefinitions} = useHookFormDefinitions()
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
		const res = await CreateTaskDefinition(info)

		if (res.Data != null)
			setFormDefinitions([...formDefinitions, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteTaskDefinition(id)
		let res = [...formDefinitions]
		res.splice(index, 1)
		setFormDefinitions(res)
	}

	const handleUpdate = async () => {
		const res = await UpdateTaskDefinition(info.Id, info)
		let temp = [...formDefinitions]
		temp[curIndex] = res.Data
		setFormDefinitions(temp)
	}

    const isOptionSelected = (list: any, id: any) => {
		let flag = 0

		list?.forEach((item: any) => {
			if (item.Id == id) {
				flag = 1
			}
		})

		if (flag == 0)
			return false
		else if (flag == 1)
			return true
	}

    const handleMultiChange = (name: string, value: any) => {
		let temp = {...info}

		let tmp: any = []
		if (temp[`${name}`] == undefined) {
			temp[`${name}`] = []
			tmp.push({
				Name: value.name,
				Id: value.value
			})
		} else {
			temp[`${name}`].forEach((item: any) => {
				if (item.Id != value.value) {
					tmp.push({
						Name: item.Name,
						Id: item.Id
					})
				}
			})

			if (!isOptionSelected(temp[`${name}`], value.value)) {
				tmp.push({
					Name: value.name,
					Id: value.value
				})
			}
		}
		temp[`${name}`] = tmp

		setInfo(temp)
	}

    const value = useMemo(
        () => ({
            formDefinitions,
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
            groups,
            handleMultiChange
        }),
        [
            formDefinitions,
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
            groups,
            handleMultiChange
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