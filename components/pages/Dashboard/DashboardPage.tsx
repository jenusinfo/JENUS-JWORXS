import DashboardHeader from "components/Dashboard/Header"
import MyFavoriteForms from "components/Dashboard/MyFavoriteForms"
import MyGroups from "components/Dashboard/MyGroups"
import MyWorkitems from "components/Dashboard/MyWorkitems"
import QuickActions from "components/Dashboard/QuickActions"
import FormsProvider from "providers/dashboard/FormsProvider"
import MyGroupsProvider from "providers/dashboard/MyGroupsProvider"
import QuickActionsProvider from "providers/dashboard/QuickActionsProvider"
import WorkitemProvider from "providers/dashboard/WorkitemProvider"

const DashboardPage = () => {
  return (
    <div className="py-8">
      <DashboardHeader />
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2 space-y-6">
          <WorkitemProvider>
            <MyWorkitems />
          </WorkitemProvider>
          <MyGroupsProvider>
            <MyGroups />
          </MyGroupsProvider>
        </div>
        <div className="col-span-1 space-y-6">
          <QuickActionsProvider>
            <QuickActions />
          </QuickActionsProvider>
          <FormsProvider>
            <MyFavoriteForms />
          </FormsProvider>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage