import LogInPanel from "components/LogIn/LogInPanel";
import ReservedPart from "components/LogIn/ReservedPart";
import useWindowSize from "shared/hooks/useWindowSize";

export default function LogInPage() {
  
  const width = useWindowSize().width

  return (
    <div className={"flex flex-col justify-center items-center relative " + (width > 870 ? 'w-[53%]' : 'w-full mt-4')}>
      <LogInPanel />
      <ReservedPart />
    </div>
  )
}