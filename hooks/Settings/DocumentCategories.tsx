import { useEffect, useState } from "react"
import { GetDocumentCategories } from "lib/settings/document-categories"
import { useApp } from "providers/AppProvider"

export const useHookDocumentCategories = () => {
    const {setLoading} = useApp()
    const [documentCategories, setDocumentCategories] = useState<any[]>([])

    const getDocumentCategories = async () => {
        setLoading(true)
        const data = await GetDocumentCategories()

        if (data)
            setDocumentCategories(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getDocumentCategories()
    }, [])

    return {
        documentCategories, setDocumentCategories, getDocumentCategories
    }
}
