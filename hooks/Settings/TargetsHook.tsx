import { GetTargets } from "lib/settings/targets"
import { useApp } from "providers/AppProvider"
import { useEffect, useState } from "react"

export const useHookTargets = () => {
    const {setLoading} = useApp()
    const [targets, setTargets] = useState<any[]>([])

    const getTargets = async () => {
        setLoading(true)
        const data = await GetTargets()

        if (data)
            setTargets(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getTargets()
    }, [])

    return {
        targets, setTargets, getTargets
    }
}
