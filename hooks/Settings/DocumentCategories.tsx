import { useEffect, useState } from "react"
import { GetDocumentCategories } from "lib/settings/document-categories"

export const useHookDocumentCategories = () => {
    const [documentCategories, setDocumentCategories] = useState<any[]>([])

    const getDocumentCategories = async () => {
        const data = await GetDocumentCategories()

        if (data)
            setDocumentCategories(data.Data)
    }

    useEffect(() => {
        getDocumentCategories()
    }, [])

    return {
        documentCategories, setDocumentCategories
    }
}
