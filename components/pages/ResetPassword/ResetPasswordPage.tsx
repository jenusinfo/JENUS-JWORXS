import ReservedPart from "components/LogIn/ReservedPart";
import ResetPasswordPanel from "components/Reset-Password/ResetPasswordPanel";
import useWindowSize from "shared/hooks/useWindowSize";

export default function ResetPasswordPage() {

  const width = useWindowSize().width

  return (
    <div className={"flex flex-col justify-center items-center relative " + (width > 870 ? 'w-[53%]' : 'w-full mt-4')}>
      <ResetPasswordPanel />
      <ReservedPart />
    </div>
  )
}