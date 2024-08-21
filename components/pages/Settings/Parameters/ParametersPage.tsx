import DataPanel from "components/Settings/Parameters/DataPanel"
import GroupsHeader from "components/Settings/Parameters/Header"
import ParametersProvider from "providers/settings/ParametersProvider"

const ParametersPage = () => {
    return (
        <div className="py-8">
            <ParametersProvider>
                <div className="space-y-6">
                    <GroupsHeader />
                    <DataPanel />
                </div>
            </ParametersProvider>
        </div>
    )
}

export default ParametersPage