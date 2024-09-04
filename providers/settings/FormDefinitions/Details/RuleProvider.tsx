import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateRule, UpdateRule, DeleteRule } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const RuleContext: any = createContext(null)

const RuleProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
		rules, setRules, getRules,
        ruleSets, getInterviewRuleSet,
        formFullInfo, getFullInfoFormDefinitions
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
		const res = await CreateRule({
			...info
		})

		if (res.Data != null) {
			setRules([...rules, res.Data])
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
		await DeleteRule(sectionId)
		await getRules(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateRule(info.Id, info)
		let temp = [...rules]
		temp[curIndex] = res.Data
		setRules(temp)
		return true
	}

	useEffect(() => {
		if (id) {
			getRules(id)
            getInterviewRuleSet(id)
            getFullInfoFormDefinitions(id)
		}
	}, [id])

	const value = useMemo(
		() => ({
			rules,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
            ruleSets, formFullInfo
		}),
		[
			rules,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
            ruleSets, formFullInfo
		]
	)

	return <RuleContext.Provider value={value}>{children}</RuleContext.Provider>
}

export const useRule = () => {
	const context: any = useContext(RuleContext)
	if (!context) {
		throw new Error("useRule must be used within RuleProvider")
	}
	return context
}

export default RuleProvider