import { useRouter } from "next/router"
import { PiEyeSlashLight } from "react-icons/pi"
import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Text from "shared/core/ui/Text";
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const ResetPasswordPanel = () => {

  const classes = {
    label: "text-xl text-second",
    input: "py-4 w-[460px] border-b border-gray-300 text-xl focus:outline-none"
  }
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [isRepeatShow, setIsRepeatShow] = useState(false)
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [passwordValidation, setPasswordValidataion] = useState({
    isSpecialCharacter: false,
    isCapitalLetter: false,
    isLowercaseLetter: false,
    isGreaterThanEight: false,
    isMatch: false
  })

  const handleChange = () => {
    setPasswordValidataion({
      isSpecialCharacter: hasSpecialChar.test(password) ? true : false,
      isCapitalLetter: hasUpperCase.test(password) ? true : false,
      isLowercaseLetter: hasLowerCase.test(password) ? true : false,
      isGreaterThanEight: password.length >= 8 ? true : false,
      isMatch: password != "" && password == repeatedPassword ? true : false
    })
  }

  useEffect(() => {
    handleChange()
  }, [password, repeatedPassword])

  return (
    <div className="w-[460px]">
      <p className="text-5xl font-bold text-black">Reset password</p>
      <p className="text-md font-medium text-[#87878f] mt-6">Use a passphrase at least 15 characters long OR a password at least 8 characters long with letters and numbers.</p>
      <div className="flex flex-col gap-8 mt-16">
        <div className="relative">
          <input className={classes.input} type={isRepeatShow ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {
            !isRepeatShow
              ? <PiEyeSlashLight size={20} className="absolute right-0 top-6" onClick={() => setIsRepeatShow(true)} />
              : <IoEyeOutline size={20} className="absolute right-0 top-6" onClick={() => setIsRepeatShow(false)} />
          }
        </div>
        <div className="relative">
          <input className={classes.input} type={isPasswordShow ? "text" : "password"} placeholder="Repeat" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} />
          {
            !isPasswordShow
              ? <PiEyeSlashLight size={20} className="absolute right-0 top-6" onClick={() => setIsPasswordShow(true)} />
              : <IoEyeOutline size={20} className="absolute right-0 top-6" onClick={() => setIsPasswordShow(false)} />
          }
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex items-center">
          <ValidationCheckIcon type={password == "" ? 0 : passwordValidation.isSpecialCharacter ? 1 : 2} />
          <Text text="Password has special characters." color={passwordValidation.isSpecialCharacter ? "#3F4044" : "#84858C"} />
        </div>
        <div className="flex items-center">
          <ValidationCheckIcon type={password == "" ? 0 : passwordValidation.isCapitalLetter ? 1 : 2} />
          <Text text="Password has a capital letter." color={passwordValidation.isCapitalLetter ? "#3F4044" : "#84858C"} />
        </div>
        <div className="flex items-center">
          <ValidationCheckIcon type={password == "" ? 0 : passwordValidation.isLowercaseLetter ? 1 : 2} />
          <Text text="Password has a lowercase letter." color={passwordValidation.isLowercaseLetter ? "#3F4044" : "#84858C"} />
        </div>
        <div className="flex items-center">
          <ValidationCheckIcon type={password == "" ? 0 : passwordValidation.isGreaterThanEight ? 1 : 2} />
          <Text text="Password at least 8 character length." color={passwordValidation.isGreaterThanEight ? "#3F4044" : "#84858C"} />
        </div>
        <div className="flex items-center">
          <ValidationCheckIcon type={password == "" ? 0 : passwordValidation.isMatch ? 1 : 2} />
          <Text text="Password and repeat password should match." color={passwordValidation.isMatch ? "#3F4044" : "#84858C"} />
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

const ValidationCheckIcon = ({type}: {type: number}) => {
  return (
    <div className="w-5 h-5 flex justify-center items-center">
      {type == 0 && <div className="w-0.5 h-0.5 bg-[#202124] rounded-full" />}
      {type == 1 && <IoCheckmark color="#1ED6BB" />}
      {type == 2 && <IoCloseOutline color="#FB5656" />}
    </div>
  )
}

export default ResetPasswordPanel