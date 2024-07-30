import DataPanel from "components/Settings/FlowDefinitions/DataPanel"
import FlowDefinitionsHeader from "components/Settings/FlowDefinitions/Header"
import FlowDefinitionsProvider from "providers/settings/FlowDefinitionsProvider"

const FlowDefinitionsPage = () => {
    return (
        <div className="py-8">
            <FlowDefinitionsProvider>
                <div className="space-y-6">
                    <FlowDefinitionsHeader />
                    <DataPanel />
                </div>
            </FlowDefinitionsProvider>
        </div>
    )
}

export default FlowDefinitionsPage