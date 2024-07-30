import { useEffect, useState } from "react"
import { GetAppSettings } from "lib/settings/application-settings"

export const useHookAppSettings = () => {
    const [applicationSettings, setApplicationSettings] = useState<any[]>([])

    const getAppSettings = async () => {
        const data = await GetAppSettings()

        if (data)
            setApplicationSettings(data.Data)
    }

    useEffect(() => {
        getAppSettings()
    }, [])

    return {
        applicationSettings, setApplicationSettings
    }
}
