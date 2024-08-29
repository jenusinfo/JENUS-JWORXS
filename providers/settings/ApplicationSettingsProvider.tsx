import { useHookAppSettings } from "hooks/Settings/ApplicationSettings";
import { createContext, useContext, useMemo, useState } from "react";

const ApplicationSettingsContext: any = createContext(null)

export interface IApplicationSettings {
    Key: string
    Value: string
}

const ApplicationSettingsProvider = ({ children }: any) => {

    const { applicationSettings, setApplicationSettings } = useHookAppSettings()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            applicationSettings,
            curPageNumber,
            setCurPageNumber
        }),
        [
            applicationSettings,
            curPageNumber,
            setCurPageNumber
        ]
    )

    return <ApplicationSettingsContext.Provider value={value}>{children}</ApplicationSettingsContext.Provider>
}

export const useApplicationSettings = () => {
    const context: any = useContext(ApplicationSettingsContext)
    if (!context) {
        throw new Error("useApplicationSettings must be used within ApplicationSettingsProvider")
    }
    return context
}

export default ApplicationSettingsProvider