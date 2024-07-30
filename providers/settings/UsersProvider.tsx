import { useHookUsers } from "hooks/Settings/UsersHook";
import { createContext, useContext, useMemo, useState } from "react";

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

	const { users } = useHookUsers()
	const [curPageNumber, setCurPageNumber] = useState(1)

	const value = useMemo(
		() => ({
			users,
			curPageNumber,
			setCurPageNumber
		}),
		[
			users,
			curPageNumber,
			setCurPageNumber
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