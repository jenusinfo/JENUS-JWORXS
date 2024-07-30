import DataPanel from "components/Settings/FormDefinitions/DataPanel"
import ApplicationSettingsHeader from "components/Settings/FormDefinitions/Header"
import FormDefinitionsProvider from "providers/settings/FormDefinitionsProvider"

const FormDefinitionsPage = () => {
    return (
        <div className="py-8">
            <FormDefinitionsProvider>
                <div className="space-y-6">
                    <ApplicationSettingsHeader />
                    <DataPanel />
                </div>
            </FormDefinitionsProvider>
        </div>
    )
}

export default FormDefinitionsPage