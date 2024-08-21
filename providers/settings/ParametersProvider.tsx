import { useHookParameters } from "hooks/Settings/ParametersHook";
import { CreateParameter, DeleteParameter, UpdateParameter } from "lib/settings/parameters";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";

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

    const { parameters, setParameters } = useHookParameters()
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
		const res = await CreateParameter(info)

		if (res.Data != null)
			setParameters([...parameters, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteParameter(id)
		let res = [...parameters]
		res.splice(index, 1)
		setParameters(res)
	}

	const handleUpdate = async () => {
		const res = await UpdateParameter(info.Id, info)
		let temp = [...parameters]
		temp[curIndex] = res.Data
		setParameters(temp)
	}

    const value = useMemo(
        () => ({
            parameters,
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
            parameters,
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