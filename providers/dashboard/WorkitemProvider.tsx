import { useHookHashTag } from "hooks/HasTagHook";
import { useHookWorkitem } from "hooks/WorkitemHook";
import { useApp } from "providers/AppProvider";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IInbox } from "types/dashboard";

const WorkitemContext: any = createContext(null)

const WorkitemProvider = ({ children }: any) => {

  const { group } = useApp()
  const WorkitemStatuses = ["All", "InProgress", "Draft", "Completed", null]
  const { hashTags: optionList } = useHookHashTag()
  const assignedList = ["Assigned to All", "Assigned to Me", "Assigned On My Unit", "Assigned To Other"]
  const { inboxList, setInboxList, getInbox: handleGetWorkitems, loading } = useHookWorkitem()
  const [curStatus, setCurStatus] = useState("All")
  const [curHashTag, setCurHashTag] = useState<string[] | string>()
  const [searchHashTag, setSearchHashTag] = useState<string[] | string>()
  const [curPageNumber, setCurPageNumber] = useState(1)
  const [search, setSearch] = useState("")
  const [data, setData] = useState<IInbox[]>([])
  const [optionSearch, setOptionSearch] = useState("")

  const handleSelect = (item: any) => {
    let temp: string[] | string
    if (Array.isArray(curHashTag)) {
      temp = [...curHashTag]
    } else {
      temp = []
    }
    if (temp.includes(item)) {
      temp = temp.filter((each: string) => each != item)
    } else {
      temp.push(item)
    }
    setCurHashTag(temp)
  }

  useEffect(() => {
    let temp = inboxList.filter((each: IInbox) => each.InterviewFormName.toLowerCase().includes(search.toLowerCase()))
      .filter((each: IInbox) => curStatus == "All" ? true : each.StatusCode == curStatus)
      .filter((each: IInbox) => {
        if (Array.isArray(searchHashTag)) {
          let flag = 0
          for (let i = 0; i < each.HashTags.length; i++) {
            if (searchHashTag.includes(each.HashTags[i])) {
              flag = 1
              return true
            }
          }
          if (flag == 0)
            return false
        } else {
          return true
        }
      })

    setData(temp)
  }, [inboxList, search, curStatus, searchHashTag])

  useEffect(() => {
    setCurPageNumber(1)
  }, [curStatus])

  useEffect(() => {
    if (group) {
      setCurHashTag(group)
      setSearchHashTag(group)
    } else {
      setCurHashTag("All")
      setSearchHashTag("All")
    }
  }, [group])

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
      loading,
      curHashTag,
      setCurHashTag,
      handleSelect,
      optionSearch,
      setOptionSearch,
      searchHashTag,
      setSearchHashTag
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
      loading,
      curHashTag,
      setCurHashTag,
      handleSelect,
      optionSearch,
      setOptionSearch,
      searchHashTag,
      setSearchHashTag
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