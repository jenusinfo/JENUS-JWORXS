import { useRouter } from "next/router"
import { PiEyeSlashLight } from "react-icons/pi"
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useLogIn } from "providers/auth/LogInProvider";
import ReactLoading from 'react-loading'

const LogInPanel = () => {

  const classes = {
    label: "text-xl text-second",
    input: "py-4 w-[460px] border-b border-gray-300 text-xl focus:outline-none"
  }
  const { push } = useRouter()
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const { info, handleChange, handleLogIn, loading } = useLogIn()

  return (
    <div className="">
      <p className="text-6xl font-bold text-black">Log in to jWorxs</p>
      <p className="text-xl font-medium text-[#87878f] mt-6">Please enter your credentials to log in</p>
      <div className="flex flex-col gap-8 mt-16">
        <input name="email" value={info.email} onChange={handleChange} className={classes.input} placeholder="Email address" />
        <div className="relative">
          <input name="password" value={info.password} onChange={handleChange} className={classes.input} type={isPasswordShow ? "text" : "password"} placeholder="Password" />
          {
            !isPasswordShow
            ? <PiEyeSlashLight size={20} className="absolute right-4 top-6" onClick={() => setIsPasswordShow(true)} />
            : <IoEyeOutline size={20} className="absolute right-4 top-6" onClick={() => setIsPasswordShow(false)} />
          }
        </div>
        <p className="text-xl font-medium text-[#2454de] hover:cursor-pointer" onClick={() => push("/forgot-password")}>Forgot Password?</p>
      </div>
      <div className="mt-16">
        <button className="bg-[#2454de] hover:bg-blue-500 transition duration-500 text-white w-full rounded-[10px] py-2 text-lg font-medium flex justify-center" onClick={loading ? () => {} : handleLogIn}>
          {loading ? <ReactLoading type="spin" width={28} height={28} /> : "Log in"}
        </button>
      </div>
    </div>
  )
}

export default LogInPanel