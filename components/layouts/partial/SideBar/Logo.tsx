import Text from "shared/core/ui/Text";

export default function Logo() {
  return (
    <div className="
      flex items-center gap-3 
      w-full p-2 rounded-[5px] 
      hover:bg-[#f4f6ff] hover:cursor-pointer 
      transition duration-300
    ">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.3333 6.00781H4L14.6667 25.9992L18.6667 19.3325L11.3333 6.00781Z" fill="#2454DE" />
        <path d="M18 6L22.6667 14L28 6H18Z" fill="#2454DE" />
      </svg>
      <Text text="jWorxs" size={14} color="#2454DE" weight="600" />
    </div>
  )
}