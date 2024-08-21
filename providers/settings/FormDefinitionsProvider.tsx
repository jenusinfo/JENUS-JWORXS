import { useHookFormDefinitions } from "hooks/Settings/FormDefinitions";
import { useHookGroups } from "hooks/Settings/GroupsHook";
import { CreateTaskDefinition, DeleteTaskDefinition, UpdateTaskDefinition } from "lib/settings/form-definitions";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";

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
    const [activities, setActivities] = useState([])
	const [info, setInfo] = useState<any>({
        Activities: []
    })

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

    const handleActivityChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let temp = {...info}
        temp.Activities[index][e.target.name] = e.target.value
        setInfo(temp)
    }

    const handleDecisionChange = (e: ChangeEvent<HTMLInputElement>, index: number, i: number) => {
        let temp = {...info}
        temp.Activities[index].Decisions[i][e.target.name] = e.target.value
        setInfo(temp)
    }

	const handleCreate = async () => {
        let temp = {...info}
        let tmp = temp.Activities
        tmp = tmp.map((each: any) => ({
            ...each,
            GroupIds: each.GroupIds.map((each: any) => each.Id)
        }))
        temp.Activities = tmp
		const res = await CreateTaskDefinition(temp)

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

    const handleMultiActivityChange = (name: string, value: any, index: number) => {
		let temp = {...info}

		let tmp: any = []
		if (temp.Activities[index][`${name}`] == undefined) {
			temp.Activities[index][`${name}`] = []
			tmp.push({
				Name: value.name,
				Id: value.value
			})
		} else {
			temp.Activities[index][`${name}`].forEach((item: any) => {
				if (item.Id != value.value) {
					tmp.push({
						Name: item.Name,
						Id: item.Id
					})
				}
			})

			if (!isOptionSelected(temp.Activities[index][`${name}`], value.value)) {
				tmp.push({
					Name: value.name,
					Id: value.value
				})
			}
		}
		temp.Activities[index][`${name}`] = tmp

		setInfo(temp)
	}

    useEffect(() => {
        let temp: any = []

        if (
            info &&
            info.Activities
        ) {
            info.Activities.forEach((each: any) => {
                if (each.Name) {
                    temp.push(each.Name)
                }
            })
        }

        setActivities(temp)
    }, [info])

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
            handleMultiChange,
            handleActivityChange,
            handleDecisionChange,
            handleMultiActivityChange,
            activities,
            setActivities
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
            handleMultiChange,
            handleActivityChange,
            handleDecisionChange,
            handleMultiActivityChange,
            activities,
            setActivities
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