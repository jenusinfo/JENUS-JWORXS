import Text from "shared/core/ui/Text";
import { IoRefresh } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useWorkitem } from "providers/dashboard/WorkitemProvider";
import { IInbox } from "types/dashboard";
import Loading from 'react-loading'
import { Icon } from "shared/icons";
import DropDown from "shared/core/ui/Dropdown";
import { useState } from "react";
import DeleteModal from "components/Workitems/Modals/Delete_Modal";
import AssignModal from "components/Workitems/Modals/Assign_Modal";

export const Table = () => {

  const { data, curPageNumber, setCurPageNumber, handleGetWorkitems, loading, handleResumeInterview, setCurInterviewForm, handleCancelInterview, handleDuplicateInterview } = useWorkitem()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [interviewId, setInterviewId] = useState<string>()
  const [isAssignOpen, setIsAssignOpen] = useState(false)

  return (
    <>
      {
        loading
          ? <div className="h-[236px] flex justify-center items-center">
            <Loading type="spokes" color="#0146c5" />
          </div>
          :
          (
            data?.length == 0
              ? <div className="h-[236px] flex flex-col justify-center items-center">
                <Icon type="not-found" />
                <Text text="No Search Results Found" weight="700" color="#071B55" className="mt-2" />
                <Text text="Try adjusting your search keywords to find what you're looking for." size={12} color="#071B55" className="w-[215px] text-center" />
              </div>
              : <div className="border border-gray-200 rounded-[5px] mt-4">
                <div className="pl-6 pr-2 py-2 flex items-center justify-between border-b border-gray-200">
                  <IoRefresh onClick={handleGetWorkitems} />
                  <div className="flex items-center gap-2">
                    <Text text={`${(curPageNumber - 1) * 5 + 1}-${curPageNumber * 5} of ${data?.length}`} />
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
                        <div className="px-2 border-l border-gray-200 text-center">
                          #
                        </div>
                      </th>
                      <th className="py-3">
                        <div className="px-2 border-l border-gray-200 text-left">
                          NAME
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
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {
                      data &&
                      data
                        .slice((curPageNumber - 1) * 5, curPageNumber * 5)
                        .map((inbox: IInbox, index: number) => (
                          <tr key={index} className="border-b border-gray-200 odd:bg-gray-100 even:bg-white hover:cursor-pointer">
                            <td className="py-3">
                              <DropDown
                                target={<div className="flex justify-center z-10">
                                  <IoEllipsisVerticalSharp />
                                </div>}
                                left={0}
                                top={20}
                                zIndex={100 - index}
                              >
                                <div className="shadow-lg border-t border-[#2454DE] bg-white w-[200px]">
                                  <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100">
                                    <Text text="View" size={14} weight="500" />
                                  </div>
                                  <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleResumeInterview(inbox.Id)}>
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
                                  <div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setIsDeleteOpen(true); setInterviewId(inbox.Id.toString()) }}>
                                    <Text text="Delete" size={14} color="#FB5656" weight="500" />
                                  </div>
                                </div>
                              </DropDown>
                            </td>
                            <td className="px-2 text-center">{inbox.Id}</td>
                            <td className="px-2">{inbox.InterviewFormName}</td>
                            <td className="px-2">
                              <div className="flex items-center gap-1 font-semibold">
                                {inbox.StatusCode == "Draft" && <div className="border-2 border-[#E28313] w-2 h-2 rounded-full" />}
                                {inbox.StatusCode == "InProgress" && <div className="border-2 border-blue-600 w-2 h-2 rounded-full" />}
                                {inbox.StatusCode == "Completed" && <div className="border-2 border-green-600 w-2 h-2 rounded-full" />}
                                {(inbox.StatusCode == null || inbox.StatusCode == "Cancelled") && <div className="border-2 border-red-600 w-2 h-2 rounded-full" />}
                                {inbox.StatusCode == null || inbox.StatusCode == "Cancelled" ? "Cancelled" : inbox.Status}
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
      {interviewId && <DeleteModal isOpen={isDeleteOpen} handleClose={() => setIsDeleteOpen(false)} id={interviewId} />}
      <AssignModal isOpen={isAssignOpen} handleClose={() => setIsAssignOpen(false)} />
    </>
  )
}

export default Table