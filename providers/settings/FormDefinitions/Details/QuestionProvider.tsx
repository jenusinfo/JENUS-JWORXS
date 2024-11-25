import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateInterviewQuestion, DeleteInterviewQuestion, UpdateInterviewQuestion } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const QuestionContext: any = createContext(null)

const QuestionProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        formFullInfo, setFormFullInfo, getFullInfoFormDefinitions,
        interviewSections, getInterviewSections,
        globalParams, getGlobalParams,
        ruleSets, getInterviewRuleSet
	} = useHookFormDefinitionsDetail()
	const [info, setInfo] = useState<any>({})
	const [curIndex, setCurIndex] = useState(-1)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleChange = (e: any) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateInterviewQuestion({
			...info,
			InterviewFormId: id
		})

		if (res.Data != null) {
			await getFullInfoFormDefinitions(id)
			return true
		}

		if (res.ModelErrors) {
			Object.entries(res.ModelErrors).map(([key, value]: any, index: number) => {
				toast.error(value[0])
			})
			return false
		}
	}

	const handleDelete = async (QuestionId: any) => {
		await DeleteInterviewQuestion(QuestionId)
		await getFullInfoFormDefinitions(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateInterviewQuestion(info.Id, info)
		await getFullInfoFormDefinitions(id)
		return true
	}

	useEffect(() => {
		if (id) {
			getFullInfoFormDefinitions(id)
		}
		if (id && isModalOpen) {
			getInterviewSections(id)
            getGlobalParams()
            getInterviewRuleSet(id)
		}
	}, [id, isModalOpen])

	const value = useMemo(
		() => ({
            interviewSections,
            globalParams,
            ruleSets,
            formFullInfo,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
			setIsModalOpen,
			getFullInfoFormDefinitions
		}),
		[
            interviewSections,
            globalParams,
            ruleSets,
            formFullInfo,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
			setIsModalOpen,
			getFullInfoFormDefinitions
		]
	)

	return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export const useQuestion = () => {
	const context: any = useContext(QuestionContext)
	if (!context) {
		throw new Error("useQuestion must be used within QuestionProvider")
	}
	return context
}

export default QuestionProvider