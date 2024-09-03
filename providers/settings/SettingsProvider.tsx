import { createContext, useContext, useMemo, useState } from "react";

const SettingsContext: any = createContext(null)

const SettingsProvider = ({ children }: any) => {

    const [data, setData] = useState([
        { title: 'Units', description: 'Define and manage measurement units for various application functionalities.', link: '/settings/units' },
        { title: 'User Groups', description: 'Organize users into manageable groups for streamlined permissions and access.', link: '/settings/groups' },
        { title: 'Users', description: 'Add, and manage user accounts and their roles.', link: '/settings/users' },
        { title: 'Events', description: 'Define and manage measurement units for various application functionalities.', link: '/settings/events' },
        { title: 'Parameters', description: 'Organize users into manageable groups for streamlined permissions and access.', link: '/settings/parameters' },
        { title: 'Application Settings', description: 'Add, and manage user accounts and their roles.', link: '/settings/application-settings' },
        { title: 'Form Definitions', description: 'Define and manage measurement units for various application functionalities.', link: '/settings/form-definitions' },
        { title: 'Flow Definitions', description: 'Organize users into manageable groups for streamlined permissions and access.', link: '/settings/flow-definitions' },
        { title: 'Audit Logs', description: 'Add, and manage user accounts and their roles.', link: '/settings/audit-logs' },
        { title: 'Document Categories', description: 'Define and manage measurement units for various application functionalities.', link: '/settings/document-categories' },
        { title: 'Email Templates', description: 'Organize users into manageable groups for streamlined permissions and access.', link: '/settings/email-templates' },
        { title: 'Targets', description: 'Add, and manage user accounts and their roles.', link: '/settings/targets' },
        { title: 'Work Groups', description: 'Define and manage measurement units for various application functionalities.', link: '/settings/work-group' }
    ])

  const value = useMemo(
    () => ({
        data
    }),
    [
        data
    ]
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const context: any = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider")
  }
  return context
}

export default SettingsProvider