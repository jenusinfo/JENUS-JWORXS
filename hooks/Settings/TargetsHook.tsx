import { GetTargets } from "lib/settings/targets"
import { useEffect, useState } from "react"

export const useHookTargets = () => {
    const [targets, setTargets] = useState<any[]>([])

    const getTargets = async () => {
        const data = await GetTargets()

        if (data)
            setTargets(data.Data)
    }

    useEffect(() => {
        getTargets()
    }, [])

    return {
        targets, setTargets
    }
}
