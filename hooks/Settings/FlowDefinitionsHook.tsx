import { useEffect, useState } from "react"
import { GetFlowDefinitions } from "lib/settings/flow-definitions"

export const useHookFlowDefinitions = () => {
    const [flowDefinitions, setFlowDefinitions] = useState<any[]>([])

    const getFlowDefinitions = async () => {
        const data = await GetFlowDefinitions()

        if (data)
            setFlowDefinitions(data.Data)
    }

    useEffect(() => {
        getFlowDefinitions()
    }, [])

    return {
        flowDefinitions, setFlowDefinitions
    }
}
