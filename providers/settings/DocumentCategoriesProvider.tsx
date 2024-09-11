import { useHookDocument } from "hooks/Documents/DocumentHook";
import { useHookDocumentCategories } from "hooks/Settings/DocumentCategories";
import { CreateDocumentCategory, DeleteDocumentCategory, UpdateDocumentCategory } from "lib/settings/document-categories";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";

const DocumentCategoriesContext: any = createContext(null)

export interface IDocumentCategories {
    CreatedById: number
    CreatedOn: string
    CreatedBy: string
    ModifiedById: number
    ModifiedOn: string
    ModifiedBy: string
    Id: number
    Name: string
    Description: string
    IsActive: boolean
    AssociatedImport: string
    ImportDescription: string
    HasStatuses: boolean
    IsEditable: boolean
    DocumentStatuses: null | string
}

const DocumentCategoriesProvider = ({ children }: any) => {

    const { searchApplications, associatedImports } = useHookDocument({userInfo: undefined})
    const { documentCategories, setDocumentCategories, getDocumentCategories } = useHookDocumentCategories()
    const [curPageNumber, setCurPageNumber] = useState(1)
    const [curIndex, setCurIndex] = useState(-1)
	const [info, setInfo] = useState<any>({})
    const [search, setSearch] = useState('')
    const [data, setData] = useState<any>([])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateDocumentCategory(info)

		if (res.Data != null)
			setDocumentCategories([...documentCategories, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteDocumentCategory(id)
		getDocumentCategories()
	}

	const handleUpdate = async () => {
		const res = await UpdateDocumentCategory(info.Id, info)
		let temp = [...documentCategories]
		temp[curIndex] = res.Data
		setDocumentCategories(temp)
	}

    useEffect(() => {
		if (search) {
			const filteredData = documentCategories.filter((item: IDocumentCategories) =>
				item.Name.toLowerCase().includes(search.toLowerCase()) ||
				item.Description?.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(documentCategories)
		}
	}, [search])

	useEffect(() => { setData(documentCategories) }, [documentCategories])

    const value = useMemo(
        () => ({
            documentCategories, data,
            curPageNumber,
            setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate,
            searchApplications,
            associatedImports,
            search, setSearch
        }),
        [
            documentCategories, data,
            curPageNumber,
            setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate,
            searchApplications,
            associatedImports,
            search, setSearch
        ]
    )

    return <DocumentCategoriesContext.Provider value={value}>{children}</DocumentCategoriesContext.Provider>
}

export const useDocumentCategories = () => {
    const context: any = useContext(DocumentCategoriesContext)
    if (!context) {
        throw new Error("useDocumentCategories must be used within DocumentCategoriesProvider")
    }
    return context
}

export default DocumentCategoriesProvider