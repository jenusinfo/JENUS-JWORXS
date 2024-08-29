import { GetParameters } from "lib/settings/parameters"
import { useApp } from "providers/AppProvider"
import { useEffect, useState } from "react"

export const useHookParameters = () => {
    const {setLoading} = useApp()
    const [parameters, setParameters] = useState<any[]>([])

    const getParameters = async () => {
        setLoading(true)
        const data = await GetParameters()

        if (data)
            setParameters(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getParameters()
    }, [])

    return {
        parameters, setParameters, getParameters
    }
}
