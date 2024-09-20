import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import http from "services/http-common";
import { getCookie } from "shared/helper/tokens";
import { Icon } from "shared/icons";
import { IUser } from "types/auth";
import { IForm } from "types/dashboard";

const AppContext: any = createContext(null)

export interface IMenu {
  Icon: any
  name: string
  link: string
}

export const INTERVIEWSTATUS = {
  NONE: -1,
  CREATED: 0,
  UPDATED: 1
}

const AppProvider = ({ children }: any) => {

  const { push, pathname } = useRouter()
  const MENULIST: Array<IMenu> = [
    {
      Icon: (props: any) => <Icon type="sider01" fill={props.fill} />,
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      Icon: (props: any) => <Icon type="sider02" fill={props.fill} />,
      name: "Workitems",
      link: "/workitems"
    },
    {
      Icon: (props: any) => <Icon type="sider03" fill={props.fill} />,
      name: "Work Groups",
      link: "/workgroups"
    },
    {
      Icon: (props: any) => <Icon type="sider04" fill={props.fill} />,
      name: "Cover Pages",
      link: "/cover-pages"
    },
    {
      Icon: (props: any) => <Icon type="sider05" fill={props.fill} />,
      name: "Documents",
      link: "/documents"
    },
    {
      Icon: (props: any) => <Icon type="sider06" fill={props.fill} />,
      name: "Settings",
      link: "/settings"
    }
  ]
  const [account, setAccount] = useState<IUser>()
  const [userInfo, setUserInfo] = useState()
  const [loading, setLoading] = useState(false)

  const [group, setGroup] = useState(null)
  const [isMinimize, setIsMinimize] = useState(true)

  const [step, setStep] = useState(1)
  const [curForm, setCurForm] = useState<IForm>()
  const [interviewInfo, setInterviewInfo] = useState()
  const [interviewId, setInterviewId] = useState(0)
  const [interviewFormStatus, setInterviewFormStatus] = useState(INTERVIEWSTATUS.NONE)
  const [fromInterview, setFromInterview] = useState("/dashboard")
  const [sessionResult, setSessionResult] = useState({})

  const getUserInfo = async () => {
    const res = await http.get("/Org/Account/GetUserInfo")

    setUserInfo(res?.data.Data)
  }

  useEffect(() => {
    const user = getCookie('user')
    if (user) {
      setAccount(JSON.parse(user))
    }
    getUserInfo()
  }, [])

  useEffect(() => {
    if (
      pathname == '/forgot-password' ||
      pathname == "/check-email" ||
      pathname == '/reset-password'
    )
      return;
    if (getCookie('token')) {
      // push("/dashboard")
    } else {
      push("/")
    }
  }, [pathname])

  const value = useMemo(
    () => ({
      MENULIST,
      account,
      setAccount,
      group,
      setGroup,
      userInfo,
      loading,
      setLoading,
      isMinimize,
      setIsMinimize,
      step,
      setStep,
      curForm,
      setCurForm,
      interviewInfo,
      setInterviewInfo,
      interviewFormStatus,
      setInterviewFormStatus,
      interviewId,
      setInterviewId,
      fromInterview,
      setFromInterview,
      sessionResult,
      setSessionResult
    }),
    [
      MENULIST,
      account,
      setAccount,
      group,
      setGroup,
      userInfo,
      loading,
      setLoading,
      isMinimize,
      setIsMinimize,
      step,
      setStep,
      curForm,
      setCurForm,
      interviewInfo,
      setInterviewInfo,
      interviewFormStatus,
      setInterviewFormStatus,
      interviewId,
      setInterviewId,
      fromInterview,
      setFromInterview,
      sessionResult,
      setSessionResult
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context: any = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}

export default AppProvider