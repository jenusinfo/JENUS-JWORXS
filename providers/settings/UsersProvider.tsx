import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";
import { useHookRole } from "hooks/RoleHook";
import { useHookUsers } from "hooks/Settings/UsersHook";
import { useHookUnits } from "hooks/Settings/UnitsHook";
import { useHookTargets } from "hooks/Settings/TargetsHook";
import { useHookDocumentCategories } from "hooks/Settings/DocumentCategories";
import { useHookGroup } from "hooks/GroupHook";
import { useHookGroups } from "hooks/Settings/GroupsHook";
import { CreateUser, DeleteUser, UpdateUser } from "lib/settings/users";

const UsersContext: any = createContext(null)

export interface ISettingUser {
	BankUnitName: string
	Id: number
	UserName: string
	FirstName: string
	LastName: null | string
	IsSSO: boolean
	Email: number
	PhoneNumber: null | string
	Roles: Array<
		{
			Id: number
			Name: string
		}
	>
	BankUnitId: number
	UserGroups: null | string
	UserTargets: null | string
	UserDocumentDefinitions: null | string
}

const UsersProvider = ({ children }: any) => {

	const { roles } = useHookRole()
	const { targets } = useHookTargets()
	const { documentCategories } = useHookDocumentCategories()
	const { units } = useHookUnits()
	const { groups } = useHookGroups()
	const { users, setUsers } = useHookUsers()
	const [curPageNumber, setCurPageNumber] = useState(1)
	const [curIndex, setCurIndex] = useState(-1)
	const [info, setInfo] = useState<any>({})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
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

	const handleCreate = async () => {
		const res = await CreateUser(info)

		if (res.Data != null)
			setUsers([...users, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteUser(id)
		let res = [...users]
		res.splice(index, 1)
		setUsers(res)
	}

	const handleUpdate = async () => {
		const res = await UpdateUser(info.Id, info)
		let temp = [...users]
		temp[curIndex] = res.Data
		setUsers(temp)
	}

	const value = useMemo(
		() => ({
			users,
			curPageNumber,
			setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleMultiChange,
			handleCreate,
			handleDelete,
			handleUpdate,
			roles,
			targets,
			documentCategories,
			units,
			groups
		}),
		[
			users,
			curPageNumber,
			setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleMultiChange,
			handleCreate,
			handleDelete,
			handleUpdate,
			roles,
			targets,
			documentCategories,
			units,
			groups
		]
	)

	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export const useUsers = () => {
	const context: any = useContext(UsersContext)
	if (!context) {
		throw new Error("useUsers must be used within UsersProvider")
	}
	return context
}

export default UsersProvider