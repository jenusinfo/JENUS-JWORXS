import { useHookForm } from "hooks/FormHook";
import { useHookHashTag } from "hooks/HasTagHook";
import { useHookWorkitem } from "hooks/WorkitemHook";
import { AssignInterview, CancelInterview, DeleteInterview, DuplicateInterview, GetInterviewSession } from "lib/interview";
import { useRouter } from "next/router";
import { INTERVIEWSTATUS, useApp } from "providers/AppProvider";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IForm, IInbox } from "types/dashboard";

const WorkitemContext: any = createContext(null)

const WorkitemProvider = ({ children }: any) => {

  const { push } = useRouter()
  const { group, setCurForm, setStep, setInterviewInfo } = useApp()
  const WorkitemStatuses = ["All", "In-Progress", "Draft", "Completed", null]
  const { hashTags: optionList } = useHookHashTag()
  const assignedList = [
    {name: "Assigned to All", value: "All"}, 
    {name: "Assigned to Me", value: "AssignedOnMe"}, 
    {name: "Assigned On My Unit", value: "AssignedOnMyUnit"}, 
    {name: "Assigned To Others", value: "AssignedToOthers"}
  ]
  const { inboxList, setInboxList, getInbox: handleGetWorkitems } = useHookWorkitem()
  const { forms } = useHookForm()
  const [curStatus, setCurStatus] = useState("All")
  const [curAssigned, setCurAssigned] = useState("AssignedOnMe")
  const [curHashTag, setCurHashTag] = useState<string[] | string>()
  const [curInterviewForm, setCurInterviewForm] = useState<any>()
  const [searchHashTag, setSearchHashTag] = useState<string[] | string>()
  const [curPageNumber, setCurPageNumber] = useState(1)
  const [search, setSearch] = useState("")
  const [data, setData] = useState<IInbox[]>([])
  const [optionSearch, setOptionSearch] = useState("")
  const { setInterviewFormStatus, setInterviewId, setFromInterview, setSessionResult, setStatusCode } = useApp()
  const [curAssignee, setCurAssignee] = useState<any>()

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

  const handleResumeInterview = async (id: any, previousPath: string, statusCode: string, inbox: any) => {
    const res = await GetInterviewSession(id)

    if (res.Data) {
      setSessionResult(inbox)
      const form = forms.find((each: IForm) => each.Id == res.Data.InterviewFormId)
      if (form) {
        setStatusCode(statusCode)
        setInterviewInfo(JSON.parse(res.Data.JsonData))
        setInterviewFormStatus(INTERVIEWSTATUS.UPDATED)
        setInterviewId(id)
        push("/workitems/interview")
        setFromInterview(previousPath)
        setCurForm(form)
        if (statusCode == "Draft")
          setStep(2)
        else setStep(4)
      }
    }
  }

  const handleViewInterview = async (id: any, previousPath: string) => {
    const res = await GetInterviewSession(id)

    if (res.Data) {
      setSessionResult(res.Data)
      const form = forms.find((each: IForm) => each.Id == res.Data.InterviewFormId)
      if (form) {
        setInterviewInfo(JSON.parse(res.Data.JsonData))
        // setInterviewFormStatus(INTERVIEWSTATUS.UPDATED)
        setInterviewId(id)
        push("/workitems/interview")
        setFromInterview(previousPath)
        setCurForm(form)
        setStep(4)
      }
    }
  }

  const handleDeleteInterview = async (id: any) => {
    const res = await DeleteInterview(id)

    if (res.Data) {
      handleGetWorkitems(curAssigned)
      toast.success(res.Message)
    }
  }

  const handleAssign = async () => {
    const res = await AssignInterview({
      InterviewSessionIds: [curInterviewForm.Id],
      AssignedToUserId: curAssignee.Id
    })

    if (res.Data) {
      handleGetWorkitems(curAssigned)
      toast.success(res.Message)
    }
  }

  const handleCancelInterview = async (id: any) => {
    const res = await CancelInterview(id)

    if (res.Data) {
      handleGetWorkitems(curAssigned)
      toast.success(res.Message)
    }
  }

  const handleDuplicateInterview = async (id: any) => {
    const res = await DuplicateInterview(id)

    if (res.Data) {
      handleGetWorkitems(curAssigned)
      toast.success(res.Message)
    }
  }

  useEffect(() => {
    let temp = inboxList?.filter((each: IInbox) => each.InterviewFormName.toLowerCase().includes(search.toLowerCase()))
      .filter((each: any) => curStatus == "All" ? true : (each.Status == curStatus))
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
      .sort((a: IInbox, b: IInbox) => new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime())

    setData(temp)
  }, [inboxList, search, curStatus, searchHashTag])

  useEffect(() => {
    setCurPageNumber(1)
  }, [curStatus])

  useEffect(() => {
    if (group) {
      setCurHashTag([group])
      setSearchHashTag([group])
    } else {
      setCurHashTag("All")
      setSearchHashTag("All")
    }
  }, [group])

  useEffect(() => {
    handleGetWorkitems(curAssigned)
  }, [curAssigned])

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
      // loading,
      curHashTag,
      setCurHashTag,
      handleSelect,
      optionSearch,
      setOptionSearch,
      searchHashTag,
      setSearchHashTag,
      curAssigned,
      setCurAssigned,
      handleResumeInterview,
      handleDeleteInterview,
      curInterviewForm,
      setCurInterviewForm,
      curAssignee,
      setCurAssignee,
      handleAssign,
      handleCancelInterview,
      handleDuplicateInterview,
      handleViewInterview
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
      // loading,
      curHashTag,
      setCurHashTag,
      handleSelect,
      optionSearch,
      setOptionSearch,
      searchHashTag,
      setSearchHashTag,
      curAssigned,
      setCurAssigned,
      handleResumeInterview,
      handleDeleteInterview,
      curInterviewForm,
      setCurInterviewForm,
      curAssignee,
      setCurAssignee,
      handleAssign,
      handleCancelInterview,
      handleDuplicateInterview,
      handleViewInterview
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