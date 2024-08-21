import Text from "shared/core/ui/Text";

export default function Logo() {
  return (
    <div className="
      flex items-center gap-3 
      w-full p-2 rounded-[5px] 
      hover:bg-[#f4f6ff] hover:cursor-pointer 
      transition duration-300
    ">
      <img src='/assets/jenus-symbol.png' width={24} height={20} />
      <Text text="jWorxs" size={14} color="#2454DE" weight="600" />
    </div>
  )
}