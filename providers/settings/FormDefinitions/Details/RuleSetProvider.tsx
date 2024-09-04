import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateRuleSet, UpdateRuleSet, DeleteRuleSet } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const RuleSetContext: any = createContext(null)

const RuleSetProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        ruleSets, setRuleSets, getInterviewRuleSet
	} = useHookFormDefinitionsDetail()
	const [info, setInfo] = useState<any>({})
	const [curIndex, setCurIndex] = useState(-1)

	const handleChange = (e: any) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateRuleSet({
			...info,
            InterviewFormId: id
		})

		if (res.Data != null) {
			setRuleSets([...ruleSets, res.Data])
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
		await DeleteRuleSet(sectionId)
		await getInterviewRuleSet(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateRuleSet(info.Id, info)
		let temp = [...ruleSets]
		temp[curIndex] = res.Data
		setRuleSets(temp)
		return true
	}

	useEffect(() => {
		if (id) {
            getInterviewRuleSet(id)
		}
	}, [id])

	const value = useMemo(
		() => ({
			ruleSets,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange
		}),
		[
			ruleSets,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
		]
	)

	return <RuleSetContext.Provider value={value}>{children}</RuleSetContext.Provider>
}

export const useRuleSet = () => {
	const context: any = useContext(RuleSetContext)
	if (!context) {
		throw new Error("useRule must be used within RuleProvider")
	}
	return context
}

export default RuleSetProvider