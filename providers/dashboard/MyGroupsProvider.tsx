import { useHookGroup } from "hooks/GroupHook";
import { createContext, useContext, useMemo, useState } from "react";

const MyGroupsContext: any = createContext(null)

const MyGroupsProvider = ({ children }: any) => {

	const { groups, loading } = useHookGroup()
	const groupStatuses = ["all", "in progress", "draft", "completed", "canceled"]
	const optionList = ["TESTERS", "First Level"]
	const assignedList = ["Assigned to All", "Assigned to Me", "Assigned On My Unit", "Assigned To Other"]
	const [curStatus, setCurStatus] = useState("all")

	const value = useMemo(
		() => ({
			groups,
			groupStatuses,
			optionList,
			assignedList,
			curStatus,
			setCurStatus,
			loading
		}),
		[
			groups,
			groupStatuses,
			optionList,
			assignedList,
			curStatus,
			setCurStatus,
			loading
		]
	)

	return <MyGroupsContext.Provider value={value}>{children}</MyGroupsContext.Provider>
}

export const useMyGroups = () => {
	const context: any = useContext(MyGroupsContext)
	if (!context) {
		throw new Error("useMyGroups must be used within MyGroupsProvider")
	}
	return context
}

export default MyGroupsProvider