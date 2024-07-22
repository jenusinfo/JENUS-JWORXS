import LogInPanel from "components/LogIn/LogInPanel";
import ReservedPart from "components/LogIn/ReservedPart";

export default function LogInPage() {
  return (
    <div className={`
      w-[57%]
      flex flex-col justify-center items-center
      relative
    `}>
      <LogInPanel />
      <ReservedPart />
    </div>
  )
}