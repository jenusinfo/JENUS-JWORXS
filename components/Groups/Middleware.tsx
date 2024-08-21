import { useMyGroups } from "providers/dashboard/MyGroupsProvider"
import Text from "shared/core/ui/Text"

export const Middleware = () => {

  const classes = {
    input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm"
  }
  const { groupStatuses, curStatus, setCurStatus, assignedList, optionList } = useMyGroups()

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-8">
        {
          groupStatuses.map((status: string, index: number) => (
            <div key={index} className={"pb-2 hover:cursor-pointer " + (curStatus == status ? "border-b border-[#0146C5]" : "")} onClick={() => setCurStatus(status)}>
              <Text text={status} className="capitalize" color={curStatus == status ? "#0146C5" : "#1F2933"} weight="500" />
            </div>
          ))
        }
      </div>
      <div className="flex gap-2">
        <select className="px-4 py-2 border border-gray-200 rounded-[5px]">
          <option>Most Recent On Top</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-[5px]">
          {
            optionList.map((item: string, index: number) => (
              <option key={index}>{item}</option>
            ))
          }
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-[5px]">
          {
            assignedList.map((item: string, index: number) => (
              <option key={index}>{item}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}