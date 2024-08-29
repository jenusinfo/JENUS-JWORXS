import { useEffect, useState } from "react"
import { GetFormDefinitions } from "lib/settings/form-definitions"
import { useApp } from "providers/AppProvider"

export const useHookFormDefinitions = () => {
    const {setLoading} = useApp()
    const [formDefinitions, setFormDefinitions] = useState<any[]>([])

    const getFormDefinitions = async () => {
        setLoading(true)
        const data = await GetFormDefinitions()

        if (data)
            setFormDefinitions(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getFormDefinitions()
    }, [])

    return {
        formDefinitions, setFormDefinitions, getFormDefinitions
    }
}
