import { useHookHashTag } from "hooks/HasTagHook";
import { CreateHashTag, DeleteHashTag, UpdateHashTag } from "lib/hashtag";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";

const WorkGroupsContext: any = createContext(null)

const WorkGroupsProvider = ({ children }: any) => {

    const { workGroups, setWorkGroups, getHashTagDetail } = useHookHashTag()
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
		const res = await CreateHashTag(info)
		getHashTagDetail()
	}

	const handleDelete = async (id: any) => {
		await DeleteHashTag(id)
		getHashTagDetail()
	}

	const handleUpdate = async () => {
		const res = await UpdateHashTag(info.Id, info)
		getHashTagDetail()
	}

	useEffect(() => {
		if (search) {
			const filteredData = workGroups.filter((item: any) =>
				item.Tag.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(workGroups)
		}
	}, [search])

	useEffect(() => { setData(workGroups) }, [workGroups])

    const value = useMemo(
        () => ({
            workGroups, data,
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
			search, setSearch
        }),
        [
            workGroups, data,
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
			search, setSearch
        ]
    )

    return <WorkGroupsContext.Provider value={value}>{children}</WorkGroupsContext.Provider>
}

export const useWorkGroups = () => {
    const context: any = useContext(WorkGroupsContext)
    if (!context) {
        throw new Error("useWorkGroups must be used within WorkGroupsProvider")
    }
    return context
}

export default WorkGroupsProvider