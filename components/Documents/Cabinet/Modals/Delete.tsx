import { useCabinet } from "providers/documents/CabinetProvider"
import Modal from "shared/core/ui/Modal"
import Text from "shared/core/ui/Text"

const DeleteModal = ({isOpen, handleClose}: {
    isOpen: boolean
    handleClose: () => void
}) => {

    const { checkedList, handleDelete } = useCabinet()

    return (
        <Modal isOpen={isOpen} handleClose={handleClose} width={611}>
            <div className="p-4">
                <Text text="Download Document" size={14} weight="700" />
                <Text text={checkedList.length + " records selected"} size={14} color="#606168" className="mt-4" />
                <p className="text-sm mt-12 text-center font-medium">Are you sure you want to <span className="text-[#FB5656] font-bold">permanently delete</span> selected documents?</p>
                <div className="flex justify-end mt-10 mb-4">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={() => {handleDelete(); handleClose();}}>Delete</button>
				</div>
            </div>
        </Modal>
    )
}

export default DeleteModal