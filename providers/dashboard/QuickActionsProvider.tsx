import { createContext, useContext, useMemo, useState } from "react";
import { IQuickAction } from "types/dashboard";

const QuickActionsContext: any = createContext(null)

const QuickActionsProvider = ({ children }: any) => {

  const [quickActions, setQuickActions] = useState<Array<IQuickAction>>([
    {
      name: 'Start Interview Form',
      link: ''
    },
    {
      name: 'Start Cover Page',
      link: ''
    },
    {
      name: 'Document Search',
      link: ''
    }
  ])

  const value = useMemo(
    () => ({
      quickActions
    }),
    [
      quickActions
    ]
  )

  return <QuickActionsContext.Provider value={value}>{children}</QuickActionsContext.Provider>
}

export const useQuickActions = () => {
  const context: any = useContext(QuickActionsContext)
  if (!context) {
    throw new Error("useQuickActions must be used within QuickActionsProvider")
  }
  return context
}

export default QuickActionsProvider