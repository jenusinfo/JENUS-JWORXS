import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateInterviewSection, DeleteInterviewSection, UpdateInterviewSection } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const FormDefinitionsDetailContext: any = createContext(null)

const FormDefinitionsDetailProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const { 
		formFullInfo, getFullInfoFormDefinitions, 
		interviewSections, setInterviewSections, getInterviewSections 
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
		const res = await CreateInterviewSection({
			...info,
			InterviewFormId: id
		})

		if (res.Data != null) {
			setInterviewSections([...interviewSections, res.Data])
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
		await DeleteInterviewSection(sectionId)
		await getInterviewSections(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateInterviewSection(info.Id, info)
		let temp = [...interviewSections]
		temp[curIndex] = res.Data
		setInterviewSections(temp)
		return true
	}

	useEffect(() => {
		if (id) {
			getFullInfoFormDefinitions(id)
			getInterviewSections(id)
		}
	}, [id])

	const value = useMemo(
		() => ({
			formFullInfo,
			interviewSections,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange
		}),
		[
			formFullInfo,
			interviewSections,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange
		]
	)

	return <FormDefinitionsDetailContext.Provider value={value}>{children}</FormDefinitionsDetailContext.Provider>
}

export const useFormDefinitionsDetail = () => {
	const context: any = useContext(FormDefinitionsDetailContext)
	if (!context) {
		throw new Error("useFormDefinitionsDetail must be used within FormDefinitionsDetailProvider")
	}
	return context
}

export default FormDefinitionsDetailProvider