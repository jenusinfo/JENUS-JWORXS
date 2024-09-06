import Modal from "shared/core/ui/Modal"

const ShowEmailModal = ({ isOpen, handleClose, data }: {
    isOpen: boolean
    handleClose: () => void
    data: any
}) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className="px-6 py-4">
                <div dangerouslySetInnerHTML={{ __html: data }} />
            </div>
        </Modal>
    )
}

export default ShowEmailModal