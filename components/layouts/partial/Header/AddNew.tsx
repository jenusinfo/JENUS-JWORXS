import { MdOutlineLibraryAdd } from "react-icons/md";

const AddNew = () => {
    return (
        <button className="text-white bg-red-600 px-6 py-3 flex items-center gap-3 rounded-[10px]">
            <MdOutlineLibraryAdd color="white" size={20} />
            New
        </button>
    )
}

export default AddNew