import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateInterviewSection, DeleteInterviewSection, UpdateInterviewSection } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const SectionContext: any = createContext(null)

const SectionProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
		interviewSections, setInterviewSections, getInterviewSections,
		parentSectionOptions, setParentSectionOptions, getParentSectionOptions
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
			getInterviewSections(id)
		}
	}, [id])

	useEffect(() => {
		if (id && info.Id) {
			getParentSectionOptions(id, info.Id)
		}
	}, [id, info.Id])

	const value = useMemo(
		() => ({
			interviewSections,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
			getInterviewSections,
			parentSectionOptions
		}),
		[
			interviewSections,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
			getInterviewSections,
			parentSectionOptions
		]
	)

	return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
}

export const useSection = () => {
	const context: any = useContext(SectionContext)
	if (!context) {
		throw new Error("useSection must be used within SectionProvider")
	}
	return context
}

export default SectionProvider