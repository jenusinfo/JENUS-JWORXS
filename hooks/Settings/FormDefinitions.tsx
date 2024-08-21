import { useEffect, useState } from "react"
import { GetFormDefinitions } from "lib/settings/form-definitions"

export const useHookFormDefinitions = () => {
    const [formDefinitions, setFormDefinitions] = useState<any[]>([])

    const getFormDefinitions = async () => {
        const data = await GetFormDefinitions()

        if (data)
            setFormDefinitions(data.Data)
    }

    useEffect(() => {
        getFormDefinitions()
    }, [])

    return {
        formDefinitions, setFormDefinitions
    }
}
