import DashboardHeader from "components/Dashboard/Header"
import MyFavoriteForms from "components/Dashboard/MyFavoriteForms"
import MyGroups from "components/Dashboard/MyGroups"
import MyWorkitems from "components/Dashboard/MyWorkitems"
import QuickActions from "components/Dashboard/QuickActions"
import FormsProvider from "providers/dashboard/FormsProvider"
import MyGroupsProvider from "providers/dashboard/MyGroupsProvider"
import QuickActionsProvider from "providers/dashboard/QuickActionsProvider"
import WorkitemProvider from "providers/dashboard/WorkitemProvider"
import useWindowSize from "shared/hooks/useWindowSize"

const DashboardPage = () => {

  const width = useWindowSize().width

  return (
    <div className="py-8">
      <WorkitemProvider>
        <DashboardHeader />
        <div className={"grid gap-6 mt-8 " + (width > 1160 ? 'grid-cols-3' : 'grid-cols-1')}>
          <div className={"space-y-6 " + (width > 1160 ? 'col-span-2' : '')}>

            <MyWorkitems />
            <MyGroupsProvider>
              <MyGroups />
            </MyGroupsProvider>
          </div>
          <div className={"space-y-6 " + (width > 1160 ? 'col-span-1' : '')}>
            <QuickActionsProvider>
              <QuickActions />
            </QuickActionsProvider>
            <FormsProvider>
              <MyFavoriteForms />
            </FormsProvider>
          </div>
        </div>
      </WorkitemProvider>
    </div>
  )
}

export default DashboardPage