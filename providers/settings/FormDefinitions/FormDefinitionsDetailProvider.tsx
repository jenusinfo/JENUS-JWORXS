import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CopyInterviewForm, CreateInterviewSection, DeleteInterviewSection, UpdateInterviewSection } from "lib/interview";
import { useRouter } from "next/router";
import { useApp } from "providers/AppProvider";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import http from "services/http-common";

const FormDefinitionsDetailContext: any = createContext(null)

const FormDefinitionsDetailProvider = ({ children }: any) => {

	const { setStep, setCurForm } = useApp()
	const { push } = useRouter()
	const { id } = useRouter().query
	const { 
		formFullInfo, getFullInfoFormDefinitions, 
		interviewSections, setInterviewSections, getInterviewSections 
	} = useHookFormDefinitionsDetail()
	const [info, setInfo] = useState<any>({})
	const [curIndex, setCurIndex] = useState(-1)
	const [isCopyLoading, setIsCopyLoading] = useState(false)

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

	const handleCopy = async () => {
		setIsCopyLoading(true)
		const res = await CopyInterviewForm(id)

		toast.success("Interview form copied successfully!")
		setIsCopyLoading(false)
	}

	const xmlGenerator = (xmltext: any) => {
        var filename = "file.xml";
        var pom = document.createElement("a");
        var bb = new Blob([xmltext], { type: "text/plain" });
        pom.setAttribute("href", window.URL.createObjectURL(bb));
        pom.setAttribute("download", filename);
        pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(":");
        pom.draggable = true;
        pom.classList.add("dragout");
        pom.click();
    };
	
	const handleXmlSample = async () => {
		const res = await http.get("/Interviews/Forms/SampleXML/" + id)
		if (res?.status)
			xmlGenerator(res.data);
	}

	const handleStart = async () => {
		setStep(2)
		let res = await http.get(`/Interviews/Forms/${id}`)
		if (res?.status) {
			setCurForm(res.data.Data)
			await push("/workitems/interview")
		}
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
			handleChange, 
			handleCopy, handleXmlSample, handleStart,
			isCopyLoading, setIsCopyLoading
		}),
		[
			formFullInfo,
			interviewSections,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
			handleCopy, handleXmlSample, handleStart,
			isCopyLoading, setIsCopyLoading
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