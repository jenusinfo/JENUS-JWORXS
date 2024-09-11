import { useHookTargets } from "hooks/Settings/TargetsHook";
import { CreateTarget, DeleteTarget, UpdateTarget } from "lib/settings/targets";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";

const TargetsContext: any = createContext(null)

export interface ITarget {
    CreatedById: number
    CreatedOn: string
    CreatedBy: string
    ModifiedById: number
    ModifiedOn: string
    ModifiedBy: string
    Id: number
    Name: string
    Description: string
    IsActive: boolean
}

const TargetsProvider = ({ children }: any) => {

    const { targets, setTargets, getTargets } = useHookTargets()
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
		const res = await CreateTarget(info)

		if (res.Data != null)
			setTargets([...targets, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteTarget(id)
		getTargets()
	}

	const handleUpdate = async () => {
		const res = await UpdateTarget(info.Id, info)
		let temp = [...targets]
		temp[curIndex] = res.Data
		setTargets(temp)
	}

	useEffect(() => {
		if (search) {
			const filteredData = targets.filter((item: ITarget) =>
				item.Name.toLowerCase().includes(search.toLowerCase()) ||
				item.Description?.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(targets)
		}
	}, [search])

	useEffect(() => { setData(targets) }, [targets])

    const value = useMemo(
        () => ({
            targets, data,
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
            targets, data,
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

    return <TargetsContext.Provider value={value}>{children}</TargetsContext.Provider>
}

export const useTargets = () => {
    const context: any = useContext(TargetsContext)
    if (!context) {
        throw new Error("useTargets must be used within TargetsProvider")
    }
    return context
}

export default TargetsProvider