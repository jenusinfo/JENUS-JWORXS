import { useHookGroups } from "hooks/Settings/GroupsHook";
import { createContext, useContext, useMemo, useState } from "react";

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

	const { groups } = useHookGroups()
	const [curPageNumber, setCurPageNumber] = useState(1)

	const value = useMemo(
		() => ({
			groups,
			curPageNumber,
			setCurPageNumber
		}),
		[
			groups,
			curPageNumber,
			setCurPageNumber
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