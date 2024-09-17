import Layout from "components/layouts"
import GroupItemPage from "components/pages/Groups/GroupItem"
import MyGroupsProvider from "providers/dashboard/MyGroupsProvider"
import GroupItemProvider from "providers/groups/GroupItemProvider"

const GroupItem = () => {
  return (
    <Layout type="main" pageTitle="Groups - Digital Banking">
      <MyGroupsProvider>
        <GroupItemProvider>
          <GroupItemPage />
        </GroupItemProvider>
      </MyGroupsProvider>
    </Layout>
  )
}

export default GroupItem