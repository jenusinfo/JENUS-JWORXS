import { useHookWorkitem } from "hooks/WorkitemHook";
import { createContext, useContext, useMemo, useState } from "react";

const WorkitemContext: any = createContext(null)

const WorkitemProvider = ({ children }: any) => {

  const WorkitemStatuses = ["all", "in progress", "draft", "completed", "canceled"]
  const optionList = ["TESTERS", "First Level"]
  const assignedList = ["Assigned to All", "Assigned to Me", "Assigned On My Unit", "Assigned To Other"]
  const [curStatus, setCurStatus] = useState("all")
  const { inboxList, setInboxList } = useHookWorkitem()
  const [curPageNumber, setCurPageNumber] = useState(1)

  const value = useMemo(
    () => ({
      inboxList,
      WorkitemStatuses,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber,
      assignedList,
      optionList
    }),
    [
      inboxList,
      WorkitemStatuses,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber,
      assignedList,
      optionList
    ]
  )

  return <WorkitemContext.Provider value={value}>{children}</WorkitemContext.Provider>
}

export const useWorkitem = () => {
  const context: any = useContext(WorkitemContext)
  if (!context) {
    throw new Error("useWorkitem must be used within WorkitemProvider")
  }
  return context
}

export default WorkitemProvider