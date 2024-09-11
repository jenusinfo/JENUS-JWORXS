import { useMyGroups } from "providers/dashboard/MyGroupsProvider"
import Text from "shared/core/ui/Text"

export const Middleware = () => {

  const classes = {
    input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm"
  }
  const { groupStatuses, curStatus, setCurStatus, assignedList, optionList } = useMyGroups()

  return (
    <div className="flex justify-end items-center">
      <div className="flex gap-2">
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