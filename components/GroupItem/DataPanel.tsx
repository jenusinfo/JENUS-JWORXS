import { useGroupItem } from "providers/groups/GroupItemProvider"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoEllipsisVerticalSharp, IoRefresh } from "react-icons/io5"
import Text from "shared/core/ui/Text"
import { IGroupItem, IInbox } from "types/dashboard"

const DataPanel = () => {
  const { groupItems, curPageNumber, setCurPageNumber } = useGroupItem()

  console.log("--->", groupItems)

  return (
    <div className="border border-gray-200 rounded-[5px] mt-2 bg-white">
      <div className="pl-6 pr-2 py-2 flex items-center justify-between border-b border-gray-200">
        <IoRefresh />
        <div className="flex items-center gap-2">
          <Text text={`${(curPageNumber-1)*10+1}-${curPageNumber*10} of ${groupItems.length}`} />
          <IoIosArrowBack className="hover:cursor-pointer" onClick={curPageNumber > 1 ? () => setCurPageNumber(curPageNumber-1) : () => {}} />
          <IoIosArrowForward className="hover:cursor-pointer" onClick={() => setCurPageNumber(curPageNumber+1)} />
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-xs text-[#A4A7B0] border-b border-gray-200">
            <th className="py-3">
              <div className="flex justify-center">
                <IoEllipsisVerticalSharp />
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                ID
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                Name
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                Description
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {
            groupItems
            .sort((a: IGroupItem, b:IGroupItem) => a.Id - b.Id)
            .slice((curPageNumber-1)*10, curPageNumber*10)
            .map((group: IGroupItem, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-5">
                  <div className="flex justify-center">
                    <IoEllipsisVerticalSharp />
                  </div>
                </td>
                <td className="px-2">{group.Id}</td>
                <td className="px-2">{group.Name}</td>
                <td className="px-2">
                  {group.Description}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default DataPanel