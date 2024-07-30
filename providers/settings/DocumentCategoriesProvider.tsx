import { useHookDocumentCategories } from "hooks/Settings/DocumentCategories";
import { createContext, useContext, useMemo, useState } from "react";

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

    const { documentCategories } = useHookDocumentCategories()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            documentCategories,
            curPageNumber,
            setCurPageNumber
        }),
        [
            documentCategories,
            curPageNumber,
            setCurPageNumber
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