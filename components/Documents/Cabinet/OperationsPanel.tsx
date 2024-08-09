import Text from "shared/core/ui/Text";
import { TbStatusChange } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";
import { MdAssignmentInd } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { useCabinet } from "providers/documents/CabinetProvider";
import { useState } from "react";
import ChangeStatusModal from "./Modals/ChangeStatus";
import ReleaseEmailModal from "./Modals/ReleaseEmail";
import DownloadModal from "./Modals/Download";
import AssignUserModal from "./Modals/AssignUser";
import DeleteModal from "./Modals/Delete";

export default function OperationsPanel() {

    const classes = {
        operationButton: "flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100 py-1 px-2 transition-all duration-500 rounded-[2px]"
    }
    const { checkedList } = useCabinet()
    const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false)
    const [isReleaseOpen, setIsReleaseOpen] = useState(false)
    const [isDownloadOpen, setIsDownloadOpen] = useState(false)
    const [isAssignOpen, setIsAssignOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    if (checkedList.length == 0) {
        return (
            <></>
        )
    }

    return (
        <div className="px-4 py-1 flex justify-between items-center bg-white">
            <div>
                <Text text={checkedList.length + " selected"} size={14} color="#606168" />
            </div>
            <div className="flex items-center gap-1">
                <div className={classes.operationButton} onClick={() => setIsChangeStatusOpen(true)}>
                    <TbStatusChange color="#0073DD" size={20} />
                    <Text text="Change Status" weight="500" />
                </div>
                <div className={classes.operationButton}>
                    <MdEditNote color="#0073DD" size={20} />
                    <Text text="Edit Metadata" weight="500" />
                </div>
                <div className={classes.operationButton}>
                    <FaShareAlt color="#0073DD" size={20} />
                    <Text text="Add to Workitem" weight="500" />
                </div>
                <div className={classes.operationButton} onClick={() => setIsDownloadOpen(true)}>
                    <IoMdDownload color="#0073DD" size={20} />
                    <Text text="Download" weight="500" />
                </div>
                <div className={classes.operationButton} onClick={() => setIsReleaseOpen(true)}>
                    <MdMarkEmailRead color="#0073DD" size={20} />
                    <Text text="Release Email" weight="500" />
                </div>
                <div className={classes.operationButton} onClick={() => setIsAssignOpen(true)}>
                    <MdAssignmentInd color="#0073DD" size={20} />
                    <Text text="Assign" weight="500" />
                </div>
                <div className={classes.operationButton} onClick={() => setIsDeleteOpen(true)}>
                    <MdDeleteSweep color="#0073DD" size={20} />
                    <Text text="Delete" weight="500" />
                </div>
            </div>
            <ChangeStatusModal isOpen={isChangeStatusOpen} handleClose={() => setIsChangeStatusOpen(false)} />
            <ReleaseEmailModal isOpen={isReleaseOpen} handleClose={() => setIsReleaseOpen(false)} />
            <DownloadModal isOpen={isDownloadOpen} handleClose={() => setIsDownloadOpen(false)} />
            <AssignUserModal isOpen={isAssignOpen} handleClose={() => setIsAssignOpen(false)} />
            <DeleteModal isOpen={isDeleteOpen} handleClose={() => setIsDeleteOpen(false)} />
        </div>
    )
}