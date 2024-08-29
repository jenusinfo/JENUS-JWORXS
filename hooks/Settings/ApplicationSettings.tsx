import { useEffect, useState } from "react"
import { GetAppSettings } from "lib/settings/application-settings"
import { useApp } from "providers/AppProvider"

export const useHookAppSettings = () => {
    const {setLoading} = useApp()
    const [applicationSettings, setApplicationSettings] = useState<any[]>([])

    const getAppSettings = async () => {
        setLoading(true)
        const data = await GetAppSettings()

        if (data)
            setApplicationSettings(data)
        setLoading(false)
    }

    useEffect(() => {
        getAppSettings()
    }, [])

    return {
        applicationSettings, setApplicationSettings
    }
}
