import { useRouter } from "next/router"
import { useWorkitem } from "providers/dashboard/WorkitemProvider"
import Modal from "shared/core/ui/Modal"
import Text from "shared/core/ui/Text"

const DeleteModal = ({ isOpen, handleClose, id, mode }: {
    isOpen: boolean,
    handleClose: () => void,
    id: string,
    mode?: string
}) => {

    const { push } = useRouter()
    const { handleDeleteInterview } = useWorkitem()

    return (
        <Modal isOpen={isOpen} handleClose={handleClose} width={440}>
            <div className="px-4 py-6">
                <Text text="Delete an Interview" size={20} color="#275E93" weight="600" />
                <div className="mt-12 px-4 space-y-4">
                    <Text text="Are you sure delete interview permanently?" size={14} color="#275E93" weight="400" />
                    <button 
                        className="bg-red-500 text-white rounded-[4px] px-4 py-2 hover:bg-red-400 transition-all duration-300" 
                        onClick={async () => {
                            await handleDeleteInterview(id); 
                            await handleClose()
                            if (mode == "InterviewForm") {
                                push("/workitems")
                            }
                        }}
                    >Proceed to Delete</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal
