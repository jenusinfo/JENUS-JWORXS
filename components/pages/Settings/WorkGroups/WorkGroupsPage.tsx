import WorkGroupsProvider from "providers/settings/WorkGroupsProvider"
import WorkGroupsHeader from "components/Settings/WorkGroups/Header"
import WorkGroupsDataPanel from "components/Settings/WorkGroups/DataPanel"

const WorkGroupsPage = () => {
    return (
        <div className="py-8">
            <WorkGroupsProvider>
                <WorkGroupsHeader />
                <WorkGroupsDataPanel />
            </WorkGroupsProvider>
        </div>
    )
}

export default WorkGroupsPage