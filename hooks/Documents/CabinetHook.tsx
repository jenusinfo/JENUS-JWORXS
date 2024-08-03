import { GetDocumentCabinets } from "lib/documents/cabinet"
import { useEffect, useState } from "react"

export const useHookCabinet = () => {
    const [documentCabinets, setDocumentCabinets] = useState<any[]>([])

    const getDocumentCabinets = async () => {
        const data = await GetDocumentCabinets()

        if (data)
            setDocumentCabinets(data.Data)
    }

    useEffect(() => {
        getDocumentCabinets()
    }, [])

    return {
        documentCabinets, setDocumentCabinets
    }
}
