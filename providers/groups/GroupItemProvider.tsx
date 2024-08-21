import { useGroupItemHook } from "hooks/GroupItemHook";
import { useApp } from "providers/AppProvider";
import { createContext, useContext, useMemo, useState } from "react";

const GroupItemContext: any = createContext(null)

const GroupItemProvider = ({ children }: any) => {

  const GroupStatuses = ["all", "in progress", "draft", "completed", "canceled"]
  const optionList = ["TESTERS", "First Level"]
  const assignedList = ["Assigned to All", "Assigned to Me", "Assigned On My Unit", "Assigned To Other"]
  const [curStatus, setCurStatus] = useState("all")
  const { group } = useApp()
  const { groupItems } = useGroupItemHook(group?.Id)
  const [curPageNumber, setCurPageNumber] = useState(1)

  const value = useMemo(
    () => ({
      groupItems,
      GroupStatuses,
      optionList,
      assignedList,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber
    }),
    [
      groupItems,
      GroupStatuses,
      optionList,
      assignedList,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber
    ]
  )

  return <GroupItemContext.Provider value={value}>{children}</GroupItemContext.Provider>
}

export const useGroupItem = () => {
  const context: any = useContext(GroupItemContext)
  if (!context) {
    throw new Error("useGroupItem must be used within GroupItemProvider")
  }
  return context
}

export default GroupItemProvider