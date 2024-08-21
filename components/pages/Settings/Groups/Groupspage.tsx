import DataPanel from "components/Settings/Groups/DataPanel"
import GroupsHeader from "components/Settings/Groups/Header"
import GroupsProvider from "providers/settings/GroupsProvider"

const GroupsPage = () => {
    return (
        <div className="py-8">
            <GroupsProvider>
                <div className="space-y-6">
                    <GroupsHeader />
                    <DataPanel />
                </div>
            </GroupsProvider>
        </div>
    )
}

export default GroupsPage