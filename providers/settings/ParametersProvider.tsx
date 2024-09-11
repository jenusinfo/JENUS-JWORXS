import { useHookParameters } from "hooks/Settings/ParametersHook";
import { CreateParameter, DeleteParameter, UpdateParameter } from "lib/settings/parameters";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";

const ParametersContext: any = createContext(null)

export interface IParameter {
    CreatedById: number
    CreatedOn: string
    CreatedBy: string
    ModifiedById: number
    ModifiedBy: string
    ModifiedOn: string
    Id: number
    Name: string
    Description: string
    IsActive: boolean
}

const ParametersProvider = ({ children }: any) => {

    const { parameters, setParameters, getParameters } = useHookParameters()
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
		const res = await CreateParameter(info)

		if (res.Data != null)
			setParameters([...parameters, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteParameter(id)
		getParameters()
	}

	const handleUpdate = async () => {
		const res = await UpdateParameter(info.Id, info)
		let temp = [...parameters]
		temp[curIndex] = res.Data
		setParameters(temp)
	}
	
	useEffect(() => {
		if (search) {
			const filteredData = parameters.filter((item: IParameter) =>
				item.Name.toLowerCase().includes(search.toLowerCase()) ||
				item.Description?.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(parameters)
		}
	}, [search])

	useEffect(() => { setData(parameters) }, [parameters])

    const value = useMemo(
        () => ({
            parameters, data,
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
			search,
			setSearch
        }),
        [
            parameters, data,
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
			search,
			setSearch
        ]
    )

    return <ParametersContext.Provider value={value}>{children}</ParametersContext.Provider>
}

export const useParameters = () => {
    const context: any = useContext(ParametersContext)
    if (!context) {
        throw new Error("useParameters must be used within ParametersProvider")
    }
    return context
}

export default ParametersProvider