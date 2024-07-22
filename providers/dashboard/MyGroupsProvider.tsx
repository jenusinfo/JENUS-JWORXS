import { createContext, useContext, useMemo, useState } from "react";
import { IGroup } from "types/dashboard";

const MyGroupsContext: any = createContext(null)

const MyGroupsProvider = ({ children }: any) => {

	const [groups, setGroups] = useState<Array<IGroup>>([
		{
			title: 'Fintech Innovations',
			description: "5 interview | 0 in progress",
			people: ['BB', 'DL', 'KM']
    },
		{
			title: 'Fintech Innovations',
			description: "5 interview | 0 in progress",
			people: ['BB', 'DL', 'KM']
    },
		{
			title: 'Fintech Innovations',
			description: "5 interview | 0 in progress",
			people: ['BB', 'DL', 'KM']
    }
	])

	const value = useMemo(
		() => ({
			groups
		}),
		[
			groups
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