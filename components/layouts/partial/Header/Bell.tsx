import { HiOutlineBell } from "react-icons/hi2";

export default function Bell() {
  return (
    <div className="w-8 h-8 bg-gray-300 rounded-[10px] flex items-center justify-center relative">
      <HiOutlineBell className="text-blue-900" size={20} />
      <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-blue-900 border-2 border-gray-100 flex justify-center items-center">
        <p className="text-gray-100 text-[10px]">21</p>
      </div>
    </div>
  )
}