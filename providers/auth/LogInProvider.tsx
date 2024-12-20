import { LogInUser } from "lib/auth/login";
import { useRouter } from "next/router";
import { useApp } from "providers/AppProvider";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { setCookie } from "shared/helper/tokens";

const LogInContext: any = createContext(null)

const LogInProvider = ({ children }: any) => {

  const router = useRouter()
  const { setAccount } = useApp()
  const [info, setInfo] = useState({
    email: "", password: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const handleLogIn = async () => {
    setLoading(true)
    const res = await LogInUser(info.email, info.password)

    if (res == undefined) {
      toast.error("The user name or password is incorrect.")
      setLoading(false)
      return;
    }
    setAccount(res)
    setCookie('user', JSON.stringify(res))
    setCookie('token', res.access_token)
    router.push("/dashboard")
    setLoading(false)
  }

  const value = useMemo(
    () => ({
      info,
      setInfo,
      handleChange,
      handleLogIn,
      loading
    }),
    [
      info,
      setInfo,
      handleChange,
      handleLogIn,
      loading
    ]
  )

  return <LogInContext.Provider value={value}>{children}</LogInContext.Provider>
}

export const useLogIn = () => {
  const context: any = useContext(LogInContext)
  if (!context) {
    throw new Error("useLogIn must be used within LogInProvider")
  }
  return context
}

export default LogInProvider