import { useWorkitem } from "providers/dashboard/WorkitemProvider"
import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"

export const Middleware = () => {

  const classes = {
    input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm"
  }
  const { WorkitemStatuses, curStatus, setCurStatus } = useWorkitem()

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-8">
        {
          WorkitemStatuses.map((status: string, index: number) => (
            <div key={index} className={"pb-2 hover:cursor-pointer " + (curStatus == status ? "border-b border-[#0146C5]" : "")} onClick={() => setCurStatus(status)}>
              <Text text={status} className="capitalize" color={curStatus == status ? "#0146C5" : "#1F2933"} weight="500" />
            </div>
          ))
        }
      </div>
      <div className="relative">
        <input className={classes.input} placeholder="Search" />
        <CiSearch className="absolute left-2 top-2" size={20} />
      </div>
    </div>
  )
}