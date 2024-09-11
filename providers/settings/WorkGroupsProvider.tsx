import { useHookHashTag } from "hooks/HasTagHook";
// import { CreateHashTag, DeleteWorkGroup, UpdateWorkGroup } from "lib/hashtag";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";

const WorkGroupsContext: any = createContext(null)

const WorkGroupsProvider = ({ children }: any) => {

    const { hashTags, setHashTags, getHashTags } = useHookHashTag()
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
		// const res = await CreateHashTag(info)

        // console.log(res)
		// if (res.Data != null)
		// 	setHashTags([...hashTags, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		// await DeleteWorkGroup(id)
		getHashTags()
	}

	const handleUpdate = async () => {
		// const res = await UpdateWorkGroup(info.Id, info)
		let temp = [...hashTags]
		// temp[curIndex] = res.Data
		setHashTags(temp)
	}

    const value = useMemo(
        () => ({
            hashTags,
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
            hashTags,
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