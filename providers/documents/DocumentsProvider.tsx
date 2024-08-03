import { useHookCabinet } from "hooks/Documents/CabinetHook";
import { createContext, useContext, useMemo, useState } from "react";

const DocumentsContext: any = createContext(null)

const DocumentsProvider = ({ children }: any) => {

    const { documentCabinets, setDocumentCabinets } = useHookCabinet()

    const value = useMemo(
        () => ({
            documentCabinets, setDocumentCabinets
        }),
        [
            documentCabinets, setDocumentCabinets
        ]
    )

    return <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>
}

export const useDocuments = () => {
    const context: any = useContext(DocumentsContext)
    if (!context) {
        throw new Error("useDocuments must be used within DocumentsProvider")
    }
    return context
}

export default DocumentsProvider