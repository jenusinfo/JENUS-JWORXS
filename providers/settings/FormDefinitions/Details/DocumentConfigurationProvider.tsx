import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateDocumentConfiguration, UpdateDocumentConfiguration, DeleteDocumentConfiguration } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const DocumentConfigurationContext: any = createContext(null)

const DocumentConfigurationProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        documentConfigurations, setDocumentConfigurations, getDocumentConfigurations
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
		const res = await CreateDocumentConfiguration({
			...info,
            InterviewFormId: id
		})

		if (res.Data != null) {
			setDocumentConfigurations([...documentConfigurations, res.Data])
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
		await DeleteDocumentConfiguration(sectionId)
		await getDocumentConfigurations(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateDocumentConfiguration(info.Id, info)
		let temp = [...documentConfigurations]
		temp[curIndex] = res.Data
		setDocumentConfigurations(temp)
		return true
	}

	useEffect(() => {
		if (id) {
            getDocumentConfigurations(id)
		}
	}, [id])

	const value = useMemo(
		() => ({
			documentConfigurations, setDocumentConfigurations, getDocumentConfigurations,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange
		}),
		[
            documentConfigurations, setDocumentConfigurations, getDocumentConfigurations,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
		]
	)

	return <DocumentConfigurationContext.Provider value={value}>{children}</DocumentConfigurationContext.Provider>
}

export const useDocumentConfiguration = () => {
	const context: any = useContext(DocumentConfigurationContext)
	if (!context) {
		throw new Error("useRule must be used within RuleProvider")
	}
	return context
}

export default DocumentConfigurationProvider