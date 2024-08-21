import { GetParameters } from "lib/settings/parameters"
import { useEffect, useState } from "react"

export const useHookParameters = () => {
    const [parameters, setParameters] = useState<any[]>([])

    const getParameters = async () => {
        const data = await GetParameters()

        if (data)
            setParameters(data.Data)
    }

    useEffect(() => {
        getParameters()
    }, [])

    return {
        parameters, setParameters
    }
}
