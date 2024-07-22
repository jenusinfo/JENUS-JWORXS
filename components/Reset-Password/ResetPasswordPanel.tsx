import { useRouter } from "next/router"
import { PiEyeSlashLight } from "react-icons/pi"
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const ResetPasswordPanel = () => {

  const classes = {
    label: "text-xl text-second",
    input: "py-4 w-[460px] border-b border-gray-300 text-xl focus:outline-none"
  }
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [isRepeatShow, setIsRepeatShow] = useState(false)

  return (
    <div className="w-[460px]">
      <p className="text-5xl font-bold text-black">Reset password</p>
      <p className="text-md font-medium text-[#87878f] mt-6">Use a passphrase at least 15 characters long OR a password at least 8 characters long with letters and numbers.</p>
      <div className="flex flex-col gap-8 mt-16">
        <div className="relative">
          <input className={classes.input} type={isRepeatShow ? "text" : "password"} placeholder="Password" />
          {
            !isRepeatShow
              ? <PiEyeSlashLight size={20} className="absolute right-0 top-6" onClick={() => setIsRepeatShow(true)} />
              : <IoEyeOutline size={20} className="absolute right-0 top-6" onClick={() => setIsRepeatShow(false)} />
          }
        </div>
        <div className="relative">
          <input className={classes.input} type={isPasswordShow ? "text" : "password"} placeholder="Repeat" />
          {
            !isPasswordShow
              ? <PiEyeSlashLight size={20} className="absolute right-0 top-6" onClick={() => setIsPasswordShow(true)} />
              : <IoEyeOutline size={20} className="absolute right-0 top-6" onClick={() => setIsPasswordShow(false)} />
          }
        </div>
      </div>
      <div className="mt-16">
        <button className="bg-[#2454de] text-white w-full rounded-[10px] py-2 text-lg font-medium">
          Reset Password
        </button>
      </div>
    </div>
  )
}

export default ResetPasswordPanel