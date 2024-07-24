import { useCoverPages } from "providers/cover-pages/CoverPagesProvider"
import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"
import { Icon } from "shared/icons"

export const Middleware = () => {

  const classes = {
    input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm"
  }
  const { CoverPagesStatuses, curStatus, setCurStatus, assignedList, optionList } = useCoverPages()

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        {
          CoverPagesStatuses.map((status: string, index: number) => (
            <div key={index} className={"pb-2 hover:cursor-pointer " + (curStatus == status ? "border-b-2 border-[#0146C5]" : "")} onClick={() => setCurStatus(status)}>
              <Text text={status} className="capitalize" color={curStatus == status ? "#0146C5" : "#1F2933"} weight="500" />
            </div>
          ))
        }
      </div>
      <div className="flex gap-2">
        <div className="px-3.5 py-2.5 rounded-sm border border-[#c9cffb] flex">
          <div className="border-r border-[#606168] flex items-center gap-1 pr-3">
            <Icon type="lock-open" />
            <Text text="Open" color="#2454de" size={14} />
          </div>
          <div className="flex items-center gap-1 pl-3">
            <Icon type="lock-close" />
            <Text text="Close" color="#3F4044" size={14} />
          </div>
        </div>
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