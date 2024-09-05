import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { useHookParameters } from "hooks/Settings/ParametersHook";
import { CreateOptionParam, UpdateOptionParam, DeleteOptionParam } from "lib/settings/parameters";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const OptionParamContext: any = createContext(null)

const OptionParamProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        optionParams, setOptionParams, getOptionParams
	} = useHookParameters()
	const [info, setInfo] = useState<any>({})
	const [curIndex, setCurIndex] = useState(-1)

	const handleChange = (e: any) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateOptionParam({
			...info,
            GlobalParamId: id
		})

		if (res.Data != null) {
			setOptionParams([...optionParams, res.Data])
			return true
		}

		if (res.ModelErrors) {
			Object.entries(res.ModelErrors).map(([key, value]: any, index: number) => {
				toast.error(value[0])
			})
			return false
		}
	}

	const handleDelete = async (sectionId: any) => {
		await DeleteOptionParam(sectionId)
		await getOptionParams(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateOptionParam(info.Id, info)
		let temp = [...optionParams]
		temp[curIndex] = res.Data
		setOptionParams(temp)
		return true
	}

	useEffect(() => {
		if (id) {
            getOptionParams(id)
		}
	}, [id])

	const value = useMemo(
		() => ({
			optionParams,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange
		}),
		[
			optionParams,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
		]
	)

	return <OptionParamContext.Provider value={value}>{children}</OptionParamContext.Provider>
}

export const useOptionParam = () => {
	const context: any = useContext(OptionParamContext)
	if (!context) {
		throw new Error("useOptionParam must be used within OptionParamProvider")
	}
	return context
}

export default OptionParamProvider