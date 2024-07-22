import { BsWechat } from "react-icons/bs";

export default function Message() {
  return (
    <div className="w-8 h-8 bg-red-100 rounded-[10px] flex items-center justify-center relative">
      <BsWechat className="text-red-600" size={20} />
      <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-red-600 border-2 border-gray-100 flex justify-center items-center">
        <p className="text-red-100 text-[10px]">21</p>
      </div>
    </div>
  )
}