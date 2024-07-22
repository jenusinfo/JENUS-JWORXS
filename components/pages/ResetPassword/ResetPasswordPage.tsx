import ReservedPart from "components/LogIn/ReservedPart";
import ResetPasswordPanel from "components/Reset-Password/ResetPasswordPanel";

export default function ResetPasswordPage() {
  return (
    <div className={`
      w-[57%]
      flex flex-col justify-center items-center
      relative
    `}>
      <ResetPasswordPanel />
      <ReservedPart />
    </div>
  )
}