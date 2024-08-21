import DataPanel from "components/Settings/ApplicationSettings/DataPanel"
import ApplicationSettingsHeader from "components/Settings/ApplicationSettings/Header"
import ApplicationSettingsProvider from "providers/settings/ApplicationSettingsProvider"

const ApplicationSettingsPage = () => {
    return (
        <div className="py-8">
            <ApplicationSettingsProvider>
                <div className="space-y-6">
                    <ApplicationSettingsHeader />
                    <DataPanel />
                </div>
            </ApplicationSettingsProvider>
        </div>
    )
}

export default ApplicationSettingsPage