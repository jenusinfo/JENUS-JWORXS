import { useWorkitem } from "providers/dashboard/WorkitemProvider"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoEllipsisVerticalSharp, IoRefresh } from "react-icons/io5"
import Text from "shared/core/ui/Text"
import { IInbox } from "types/dashboard"
import { getFormattedDate } from 'shared/helper/common';
import DropDown from "shared/core/ui/Dropdown"
import { useState } from "react"
import DeleteModal from "./Modals/Delete_Modal"
import AssignModal from "./Modals/Assign_Modal"

const DataPanel = () => {

  const { data, curPageNumber, setCurPageNumber, handleResumeInterview, setCurInterviewForm, handleCancelInterview, handleDuplicateInterview } = useWorkitem()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [interviewId, setInterviewId] = useState<string>()
  const [isAssignOpen, setIsAssignOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-[5px] mt-2 bg-white">
      <div className="pl-6 pr-2 py-2 flex items-center justify-between border-b border-gray-200">
        <IoRefresh />
        <div className="flex items-center gap-2">
          <Text text={`${(curPageNumber - 1) * 10 + 1}-${curPageNumber * 10} of ${data?.length}`} />
          <IoIosArrowBack className="hover:cursor-pointer" onClick={curPageNumber > 1 ? () => setCurPageNumber(curPageNumber - 1) : () => { }} />
          <IoIosArrowForward className="hover:cursor-pointer" onClick={() => setCurPageNumber(curPageNumber + 1)} />
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
                #
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                INTERVIEW NAME
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                STATUS
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                ACTIVITY
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                ASSIGNEE
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                GROUP
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                UNIT
              </div>
            </th>
            <th className="py-3">
              <div className="px-2 border-l border-gray-200 text-left">
                UPDATED
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {
            data &&
            data
              .slice((curPageNumber - 1) * 10, curPageNumber * 10)
              .map((inbox: any, index: number) => (
                <tr key={index} className="border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 transition-all duration-500">
                  <td className="py-5">
                    <DropDown
                      target={<div className="flex justify-center z-10">
                        <IoEllipsisVerticalSharp />
                      </div>}
                      left={0}
                      top={20}
                      zIndex={100-index}
                    >
                      <div className="shadow-lg border-t border-[#2454DE] bg-white w-[200px]">
                        <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100">
                          <Text text="View" size={14} weight="500" />
                        </div>
                        <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleResumeInterview(inbox.Id, "/workitems")}>
                          <Text text="Edit" size={14} weight="500" />
                        </div>
                        <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setCurInterviewForm(inbox); setIsAssignOpen(true) }}>
                          <Text text="Assign" size={14} weight="500" />
                        </div>
                        <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleDuplicateInterview(inbox.Id)}>
                          <Text text="Duplicate" size={14} weight="500" />
                        </div>
                        <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleCancelInterview(inbox.Id)}>
                          <Text text="Cancel" size={14} weight="500" />
                        </div>
                        {inbox.StatusCode == "Draft" && <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setIsDeleteOpen(true); setInterviewId(inbox.Id) }}>
                          <Text text="Delete" size={14} color="#FB5656" weight="500" />
                        </div>}
                      </div>
                    </DropDown>
                  </td>
                  <td className="px-2">{inbox.Id}</td>
                  <td className="px-2">
                    <div>
                      <p>{inbox.Subject}</p>
                      <p>{inbox.InterviewFormName}</p>
                    </div>
                  </td>
                  <td className="px-2">
                    <div className="flex items-center gap-1 font-semibold">
                      {inbox.StatusCode == "Draft" && <div className="border-2 border-[#E28313] w-2 h-2 rounded-full" />}
                      {inbox.StatusCode == "InProgress" && <div className="border-2 border-blue-600 w-2 h-2 rounded-full" />}
                      {inbox.StatusCode == "Completed" && <div className="border-2 border-green-600 w-2 h-2 rounded-full" />}
                      {(inbox.StatusCode == null || inbox.StatusCode == "Cancelled") && <div className="border-2 border-red-600 w-2 h-2 rounded-full" />}
                      {inbox.StatusCode == null || inbox.StatusCode == "Cancelled" ? "Cancelled" : inbox.Status}
                    </div>
                  </td>
                  <td className="px-2">
                    <div>
                      <p>{inbox.UserTask?.CurrentActivityName}</p>
                      <p>{inbox.UserTask?.TaskDefinitionName}</p>
                    </div>
                  </td>
                  <td className="px-2">{inbox.AssignedTo}</td>
                  <td className="px-2">{inbox.HashTags.join(",")}</td>
                  <td className="px-2">{inbox.CreatedByBankUnit}</td>
                  <td className="px-2">{getFormattedDate(inbox.ModifiedOn)}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
      {interviewId && <DeleteModal isOpen={isDeleteOpen} handleClose={() => setIsDeleteOpen(false)} id={interviewId} />}
      <AssignModal isOpen={isAssignOpen} handleClose={() => setIsAssignOpen(false)} />
    </div>
  )
}

export default DataPanel