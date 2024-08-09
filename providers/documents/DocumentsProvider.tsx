import { useHookDocument } from "hooks/Documents/DocumentHook";
import { useApp } from "providers/AppProvider";
import { createContext, useContext, useMemo, useState } from "react";

const DocumentsContext: any = createContext(null)

const DocumentsProvider = ({ children }: any) => {

    const { userInfo } = useApp()
    const { documentCabinets } = useHookDocument({userInfo})

    const value = useMemo(
        () => ({
            documentCabinets
        }),
        [
            documentCabinets
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