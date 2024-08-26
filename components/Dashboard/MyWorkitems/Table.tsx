import Text from "shared/core/ui/Text";
import { IoRefresh } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useWorkitem } from "providers/dashboard/WorkitemProvider";
import { IInbox } from "types/dashboard";

export const Table = () => {

  const { inboxList, data, curPageNumber, setCurPageNumber, search, handleGetWorkitems, curStatus } = useWorkitem()

  return (
    <div className="border border-gray-200 rounded-[5px] mt-4">
      <div className="pl-6 pr-2 py-2 flex items-center justify-between border-b border-gray-200">
        <IoRefresh onClick={handleGetWorkitems} />
        <div className="flex items-center gap-2">
          <Text text={`${(curPageNumber-1)*5+1}-${curPageNumber*5} of ${data.length}`} />
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
              <div className="px-2 border-l border-gray-200 text-center">
                ID
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                WORKITEM FROM NAME
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                STATUS
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                ACTIVITY ON
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {
            data
            .sort((a: IInbox, b:IInbox) => a.Id - b.Id)
            .slice((curPageNumber-1)*5, curPageNumber*5)
            .map((inbox: IInbox, index: number) => (
              <tr key={index} className="border-b border-gray-200 odd:bg-gray-100 even:bg-white hover:cursor-pointer hover:bg-blue-100 transition duration-500">
                <td className="py-3">
                  <div className="flex justify-center">
                    <IoEllipsisVerticalSharp />
                  </div>
                </td>
                <td className="px-2 text-center">{inbox.Id}</td>
                <td className="px-2">{inbox.InterviewFormName}</td>
                <td className="px-2">
                  <div className="flex items-center gap-1 font-semibold">
                    {inbox.StatusCode == "Draft" && <div className="border-2 border-[#E28313] w-2 h-2 rounded-full" />}
                    {inbox.StatusCode == "InProgress" && <div className="border-2 border-blue-600 w-2 h-2 rounded-full" />}
                    {inbox.StatusCode == "Completed" && <div className="border-2 border-green-600 w-2 h-2 rounded-full" />}
                    {inbox.StatusCode == null && <div className="border-2 border-red-600 w-2 h-2 rounded-full" />}
                    {inbox.Status == null ? "Cancelled" : inbox.Status}
                  </div>
                </td>
                <td className="px-2">{inbox.CreatedBy}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table