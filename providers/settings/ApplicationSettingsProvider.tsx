import { useHookAppSettings } from "hooks/Settings/ApplicationSettings";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ApplicationSettingsContext: any = createContext(null)

export interface IApplicationSettings {
    Key: string
    Value: string
}

const ApplicationSettingsProvider = ({ children }: any) => {

    const { applicationSettings, setApplicationSettings } = useHookAppSettings()
    const [curPageNumber, setCurPageNumber] = useState(1)
    const [search, setSearch] = useState("")
    const [data, setData] = useState<any>([])

    useEffect(() => {
		if (search) {
			const filteredData = applicationSettings.filter((item: IApplicationSettings) =>
				item.Key.toLowerCase().includes(search.toLowerCase()) ||
				item.Value?.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(applicationSettings)
		}
	}, [search])

	useEffect(() => { setData(applicationSettings) }, [applicationSettings])

    const value = useMemo(
        () => ({
            applicationSettings, data,
            curPageNumber,
            setCurPageNumber,
            search, setSearch
        }),
        [
            applicationSettings, data,
            curPageNumber,
            setCurPageNumber,
            search, setSearch
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