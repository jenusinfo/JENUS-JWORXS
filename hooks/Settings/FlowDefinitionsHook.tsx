import { useEffect, useState } from "react"
import { GetFlowDefinitions } from "lib/settings/flow-definitions"
import { useApp } from "providers/AppProvider"

export const useHookFlowDefinitions = () => {
    const {setLoading} = useApp()
    const [flowDefinitions, setFlowDefinitions] = useState<any[]>([])

    const getFlowDefinitions = async () => {
        setLoading(true)
        const data = await GetFlowDefinitions()

        if (data)
            setFlowDefinitions(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getFlowDefinitions()
    }, [])

    return {
        flowDefinitions, setFlowDefinitions, getFlowDefinitions
    }
}
