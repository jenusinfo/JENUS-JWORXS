import { useHookGroups } from "hooks/Settings/GroupsHook";
import { CreateGroup, DeleteGroup, UpdateGroup } from "lib/settings/groups";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";

const GroupsContext: any = createContext(null)

export interface ISettingGroup {
	Id: number
	Name: string
	Description: string
	IsActive: boolean
	IsUnitSensitive: boolean
	IsTargetSensitive: boolean
	Abbreviation: string
}

const GroupsProvider = ({ children }: any) => {

	const { groups, setGroups } = useHookGroups()
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
		const res = await CreateGroup(info)

		if (res.Data != null)
			setGroups([...groups, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteGroup(id)
		let res = [...groups]
		res.splice(index, 1)
		setGroups(res)
	}

	const handleUpdate = async () => {
		const res = await UpdateGroup(info.Id, info)
		let temp = [...groups]
		temp[curIndex] = res.Data
		setGroups(temp)
	}

	const value = useMemo(
		() => ({
			groups,
			curPageNumber,
			setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate
		}),
		[
			groups,
			curPageNumber,
			setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate
		]
	)

	return <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
}

export const useGroups = () => {
	const context: any = useContext(GroupsContext)
	if (!context) {
		throw new Error("useGroups must be used within GroupsProvider")
	}
	return context
}

export default GroupsProvider