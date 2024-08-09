import { useCabinet } from "providers/documents/CabinetProvider"
import Modal from "shared/core/ui/Modal"
import Text from "shared/core/ui/Text"

const DownloadModal = ({isOpen, handleClose}: {
    isOpen: boolean
    handleClose: () => void
}) => {

    const { checkedList, handleDownload } = useCabinet()

    return (
        <Modal isOpen={isOpen} handleClose={handleClose} width={611}>
            <div className="p-4">
                <Text text="Download Document" size={14} weight="700" />
                <Text text={checkedList.length + " records selected"} size={14} color="#606168" className="mt-4" />
                <Text text="Are you sure you want to download selected document(s)?" size={14} weight="500" className="mt-12 text-center" />
                <div className="flex justify-end mt-10 mb-4">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={() => {handleDownload(); handleClose();}}>Download</button>
				</div>
            </div>
        </Modal>
    )
}

export default DownloadModal