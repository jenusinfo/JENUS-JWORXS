import { MdClose } from "react-icons/md"

interface ISelect {
    name: string
    info: any
    handleChange: any
    optionList: any
    isFormatIcon?: boolean
    handleRemove?: any
}

export default function Select({
    name,
    info,
    handleChange,
    optionList,
    isFormatIcon,
    handleRemove
}: ISelect) {

    const classes = {
        select: 'focus:outline-none pb-3 border-b border-gray-200 text-sm w-full'
    }

    return (
        <div className="relative">
            <select className={classes.select} name={name} value={(info && info[`${name}`]) || ""} onChange={handleChange}>
                {
                    optionList.map((option: any, index: number) => (
                        <option key={index} value={option.value}>{option.name}</option>
                    ))
                }
            </select>
            {isFormatIcon && <MdClose className="absolute hover:cursor-pointer" style={{ right: 20, top: 5 }} onClick={handleRemove} />}
        </div>
    )
}