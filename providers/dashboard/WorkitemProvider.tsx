import { useHookWorkitem } from "hooks/WorkitemHook";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IInbox } from "types/dashboard";

const WorkitemContext: any = createContext(null)

const WorkitemProvider = ({ children }: any) => {

  const WorkitemStatuses = ["All", "InProgress", "Draft", "Completed", null]
  const optionList = ["TESTERS", "First Level"]
  const assignedList = ["Assigned to All", "Assigned to Me", "Assigned On My Unit", "Assigned To Other"]
  const [curStatus, setCurStatus] = useState("All")
  const { inboxList, setInboxList, getInbox: handleGetWorkitems, loading } = useHookWorkitem()
  const [curPageNumber, setCurPageNumber] = useState(1)
  const [search, setSearch] = useState("")
  const [data, setData] = useState<IInbox[]>([])

  useEffect(() => {
    let temp = inboxList.filter((each: IInbox) => each.InterviewFormName.toLowerCase().includes(search.toLowerCase()))
                        .filter((each: IInbox) => curStatus == "All" ? true : each.StatusCode == curStatus)

    setData(temp)
  }, [inboxList, search, curStatus])

  useEffect(() => {
    setCurPageNumber(1)
  }, [curStatus])

  const value = useMemo(
    () => ({
      inboxList, data,
      WorkitemStatuses,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber,
      assignedList,
      optionList,
      search,
      setSearch,
      handleGetWorkitems,
      loading
    }),
    [
      inboxList, data,
      WorkitemStatuses,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber,
      assignedList,
      optionList,
      search,
      setSearch,
      handleGetWorkitems,
      loading
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