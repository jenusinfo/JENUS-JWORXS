import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHookCabinet } from "hooks/Documents/CabinetHook";
import { useHookDocument } from "hooks/Documents/DocumentHook";
import { useRouter } from "next/router";
import { useApp } from "providers/AppProvider";
import dateFormat from "dateformat"
import axios from "axios";
import { CreateAuditLog } from "lib/settings/audit-logs";
import http from "services/http-common";
import mime from "mime-types"
import { toast } from "react-toastify";

const CabinetContext: any = createContext(null)

const CabinetProvider = ({ children }: any) => {

	const COLORS = ["#E28313", "#1ED6BB", "#0073DD", "#E28313", "#1ED6BB", "#0073DD", "#E28313", "#1ED6BB", "#0073DD"]
	const HEADERS = [
		{ name: '', width: '5%' },
		{ name: '', width: '5%' },
		{ name: '', width: '5%' },
		{ name: 'document number', width: '15.6%' },
		{ name: 'status', width: '9.2%' },
		{ name: 'document type', width: '15.4%' },
		{ name: 'notes', width: '9%' },
		{ name: 'entity type', width: '9.7%' },
		{ name: 'entity name', width: '7.2%' },
		{ name: 'unit', width: '9.5%' },
		{ name: 'document date', width: '9.4%' },
	]
	const { title } = useRouter().query
	const [filterOptions, setFilterOptions] = useState([
		{
			option: "",
			value: ""
		}
	])
	const { userInfo, setLoading } = useApp()
	const {
		showDocumentBranch, showDocumentEventDate, showDocumentUser,
		selectedOptions, associatedImport,
		getSearchDocuments, getAssociatedImport
	} = useHookCabinet({ value: title })
	const { documentCabinets } = useHookDocument({ userInfo })
	const [curPageNumber, setCurPageNumber] = useState(1)
	const [statusList, setStatusList] = useState([])
	const [categoryList, setCategoryList] = useState<any>([])
	const [searchDocuments, setSearchDocuments] = useState([])
	const [statusData, setStatusData] = useState()
	const [importKeys, setImportKeys] = useState([])
	const [values, setValues] = useState([])
	const [defaultValues, setDefaultValues] = useState([])
	const [info, setInfo] = useState<any>({})
	const [selectedFiles, setSelectedFiles] = useState<any>([]);
	const [checkedList, setCheckedList] = useState<Array<number>>([])
	const [totalCount, setTotalCount] = useState(0)
	const [curCategory, setCurCategory] = useState("ALL")
	const [viewMode, setViewMode] = useState("LIST")
	const [targetStatus, setTargetStatus] = useState("")

	const handleCheck = (value: boolean, id: number) => {
		let temp = [...checkedList]
		if (value) {
			temp = [...checkedList, id]
		} else {
			temp = checkedList.filter(item => item != id)
		}

		setCheckedList(temp)
	}

	const onDrop = (acceptedFiles: any) => {
		if (acceptedFiles?.length && acceptedFiles?.length > 0) {
			let existingFiles: any = selectedFiles;

			acceptedFiles.forEach((file: any, i: number) => {
				if (!(existingFiles.some((cond: any) => cond.name == file.name))) {
					existingFiles.push(file);
				}
			});
			setSelectedFiles([...existingFiles]);
		}
	};

	const handleRemoveFile = (index: number) => {
		let temp = [...selectedFiles]
		temp.splice(index, 1)
		setSelectedFiles(temp)
	}

	const handleAddFilter = () => {
		setFilterOptions([
			...filterOptions,
			{ option: "", value: "" }
		])
	}

	const handleRemoveFilter = (index: number) => {
		let temp = [...filterOptions]
		temp.splice(index, 1)
		setFilterOptions(temp)
	}

	const handleValueChange = (e: any) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleChange = (e: any, index: number) => {
		let temp: any = [...filterOptions]
		temp[index][e.target.name] = e.target.value
		setFilterOptions(temp)
	}

	const fetchDocuments = async () => {
		const res = await getSearchDocuments(filterOptions)
		setSearchDocuments(res)
	}

	const handleImport = async () => {
		if (selectedFiles.length <= 0) {
			alert('Please select the Document!');
			return;
		}

		let application: any = documentCabinets.filter((each: any) => each.value == title)[0]
		let data = { documentDef: application.documentDefinitions };
		let keysData = { ...info }
		delete keysData?.applicationType

		importKeys.forEach(function (key: any) {

			if (key.defInputType == "DATE") {
				let dateValue = keysData[key.keyDef];
				keysData = { ...keysData, [key.keyDef]: dateFormat(dateValue || new Date(), "yyyy-mm-dd") }
			}
			else if (key.defInputType == "NUMBER") {
				let numberValue = keysData[key.keyDef];
				keysData = { ...keysData, [key.keyDef]: parseInt(numberValue) }
			}
		});

		let payload = { ...data, keys: { ...keysData } };
		let filesToImport = selectedFiles?.filter((f: any) => !f.hasOwnProperty('IsUploaded') || f?.IsUploaded == false);

		if (filesToImport.length <= 0) {
			alert('Please select the Document!');
			return;
		}

		let uploadingMetaData = selectedFiles?.map((selectedFile: any) => {
			if (filesToImport.some((f: any) => f.name == selectedFile?.name)) {
				selectedFile.IsUploading = true;
				selectedFile.IsUploaded = false;
				selectedFile.IsUploadingFailed = false;
			}
			return selectedFile;
		});

		setSelectedFiles([...uploadingMetaData])
		let successCount = 0;

		await Promise.all(
			filesToImport?.map(async (file: any) => {
				let formData = new FormData();
				formData.append("document", new File([JSON.stringify(payload)], "blob", { type: "application/json" }));
				formData.append("file", file);
				formData.append("extension", file?.name?.split(".")?.reverse()[0]);

				try {
					let response: any = await PostDocumentToDM(formData);

					successCount++;

					let updatedMetaData = selectedFiles?.map((selectedFile: any) => {
						if (selectedFile?.name == file?.name) {
							selectedFile.IsUploading = false;
							selectedFile.IsUploaded = true;
							selectedFile.IsUploadingFailed = false;
						}
						return selectedFile;
					});

					setSelectedFiles([...updatedMetaData]);

					if (response.headers.location && response.headers.location != '') {
						let createdDocId = new URL(response.headers.location).pathname.split('/')[5];
						if (createdDocId) {
							CreateAuditLog(createdDocId, null, { documentDef: application.documentDefinitions }, "Uploaded");
						}
					}
				} catch (e) {
					console.log(e)
				}
			})
		)
	}

	const PostDocumentToDM = (formData: any) => {
		let config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
			},
		};

		return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dm/rest/v1/documents`, formData, config);
	};

	const getGroupedByStatus = () => {
		let temp: any = []
		let documents = [...searchDocuments]
		documents = (curCategory == "ALL" ? searchDocuments : documents.filter((each: any) => each.keys["document-category"] == curCategory))
		statusList.forEach((status: any) => {
			let tmpData = documents.slice(curPageNumber * 50 - 50, curPageNumber * 50).filter((each: any) => each.keys.status == status)
			temp.push({
				status: status,
				count: tmpData.length,
				isOpen: false,
				data: tmpData
			})
		})
		setStatusData(temp)
		setTotalCount(documents.length)
	}

	const handleDrop = async (id: any, status: any) => {
		let curData: any = searchDocuments.filter((each: any) => each.properties.id == id.id)[0]
		let temp = {
			documentDef: curData.documentDef,
			keys: curData.keys,
			properties: curData.properties
		}
		temp.keys.status = status
		const res = await http.put(`/dm/rest/v1/documents/by-id/${curData.properties.id}`, temp)
		if (res?.status) {
			fetchDocuments()
		}
	}

	const handleChangeStatus = async (curData: any, status: string) => {
		let temp = {
			documentDef: curData.documentDef,
			keys: curData.keys,
			properties: curData.properties
		}
		temp.keys.status = status
		const res = await http.put(`/dm/rest/v1/documents/by-id/${curData.properties.id}`, temp)
		if (res?.status) {
			fetchDocuments()
		}
	}

	const handleReleaseEmail = async (email: string) => {
		let Documents: any = []
		checkedList.forEach((id) => {
			let tmp: any = searchDocuments.filter((each: any) => each.properties.id == id)[0]
			Documents.push({
				DocumentDef: tmp.documentDef,
				DocumentId: tmp.properties.id,
				RecipientEmailAddress: email
			})
		})
		setLoading(true)
		const res = await http.post(`/DmDocument/Release`, { ChangeStatus: false, Documents })
		setLoading(false)
	}

	const handleDownload = async () => {
		let date = new Date()

		checkedList.forEach(async (id) => {
			let tmp: any = searchDocuments.filter((each: any) => each.properties.id == id)[0]
			const res = await http.get(`/dm/rest/v1/documents/by-id/${id}/${tmp.properties.revision}/file`, {
				responseType: 'blob',
				headers: {
					Accept: 'application/json'
				}
			}).then((res) => {
				if (res?.data.Success != false) {
					const url = window.URL.createObjectURL(new Blob([res?.data]))
					const link = document.createElement("a")
					link.href = url
					let fileExtension = mime.extension(res?.headers["content-type"]);
					link.setAttribute(
						"download",
						`${id}-${date}.` + fileExtension
					);
					document.body.appendChild(link);
					// if (!return_link) {
						link.click();
					// } else {
						//console.log(url, "insield url");
						// return url;
					// }
				} else {
					alert("Something went wrong!")
				}
			})
		})
	}

	const handleAssignUser = async (email: string, userId: string) => {
		checkedList.map(async (id) => {
			let tmp: any = searchDocuments.filter((each: any) => each.properties.id == id)[0]
			tmp = {
				documentDef: tmp?.documentDef,
				hidden: tmp?.hidden,
				keys: tmp.keys,
				properties: tmp.properties,
				fileProperties: tmp.fileProperties
			}
			tmp.keys.assignedto = userId
			const res = await http.put(`/dm/rest/v1/documents/by-id/${id}`, tmp)
			await http.post(`/DmDocument/Assign?emailId=${email}`, {emailId: email})
		})
		toast.success("Notification sent successfully!")
	}

	const handleDelete = async () => {
		checkedList.map(async (id) => {
			const res = await http.delete(`/dm/rest/v1/documents/by-id/${id}`)
		})
	}

	useEffect(() => {
		if (statusList.length > 0) {
			getGroupedByStatus()
		}
	}, [statusList, curPageNumber, curCategory])

	useEffect(() => {
		if (totalCount < curPageNumber * 50) {
			setCurPageNumber(1)
		}
	}, [totalCount])

	useEffect(() => {
		if (searchDocuments.length > 0) {
			let statusTempList: any = searchDocuments.map((each: any) => each.keys.status)
			let set = new Set(statusTempList)
			statusTempList = Array.from(set)
			setStatusList(statusTempList)

			statusTempList = searchDocuments.map((each: any) => each.keys['document-category'])
			set = new Set(statusTempList)
			statusTempList = Array.from(set)
			setCategoryList(statusTempList)
		}
	}, [searchDocuments])

	useEffect(() => {
		if (associatedImport != "" && userInfo) {
			const Func = async () => {
				const res = await getAssociatedImport(userInfo, filterOptions)
				setImportKeys(res?.keys)
				setDefaultValues(res?.defaultValues)
				setValues(res?.defaultValues)
			}

			Func()
		}
	}, [associatedImport, userInfo])

	useEffect(() => {
		if (selectedOptions.length > 0) {
			setFilterOptions([
				{
					option: selectedOptions[0].value,
					value: ""
				}
			])
		}
	}, [selectedOptions])

	const value = useMemo(
		() => ({
			HEADERS, COLORS,
			curPageNumber, setCurPageNumber,
			totalCount,
			selectedOptions, searchDocuments, associatedImport,
			filterOptions, setFilterOptions,
			handleChange, handleAddFilter, handleRemoveFilter,
			fetchDocuments,
			showDocumentBranch, showDocumentEventDate, showDocumentUser,
			importKeys, defaultValues, values,
			info, setInfo,
			handleValueChange,
			documentCabinets,
			onDrop,
			selectedFiles, handleRemoveFile, handleImport,
			statusData, setStatusData, handleCheck, categoryList,
			curCategory, setCurCategory,
			viewMode, setViewMode,
			handleDrop, checkedList, setCheckedList,
			targetStatus, setTargetStatus,
			handleChangeStatus,
			handleReleaseEmail,
			handleDownload,
			handleAssignUser,
			handleDelete
		}),
		[
			HEADERS, COLORS,
			curPageNumber, setCurPageNumber,
			totalCount,
			selectedOptions, searchDocuments, associatedImport,
			filterOptions, setFilterOptions,
			handleChange, handleAddFilter, handleRemoveFilter,
			fetchDocuments,
			showDocumentBranch, showDocumentEventDate, showDocumentUser,
			importKeys, defaultValues, values,
			info, setInfo,
			handleValueChange,
			documentCabinets,
			onDrop,
			selectedFiles, handleRemoveFile, handleImport,
			statusData, setStatusData, handleCheck, categoryList,
			curCategory, setCurCategory,
			viewMode, setViewMode,
			handleDrop, checkedList, setCheckedList,
			targetStatus, setTargetStatus,
			handleChangeStatus,
			handleReleaseEmail,
			handleDownload,
			handleAssignUser,
			handleDelete
		]
	)

	return <CabinetContext.Provider value={value}>{children}</CabinetContext.Provider>
}

export const useCabinet = () => {
	const context: any = useContext(CabinetContext)
	if (!context) {
		throw new Error("useCabinet must be used within CabinetProvider")
	}
	return context
}

export default CabinetProvider