import GroupsHeader from "components/Groups/Header"
import DataPanel from "components/Groups/DataPanel"
import { Middleware } from "components/Groups/Middleware"
import MyGroupsProvider from "providers/dashboard/MyGroupsProvider"

const GroupsPage = () => {
    return (
        <div className="py-8">
            <MyGroupsProvider>
                <GroupsHeader />
                <div className="mt-8">
                    <Middleware />
                    <DataPanel />
                </div>
            </MyGroupsProvider>
        </div>
    )
}

export default GroupsPage