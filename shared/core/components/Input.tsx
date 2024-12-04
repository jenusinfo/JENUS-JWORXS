import { MdClose } from "react-icons/md"

interface IInput {
    name: string
    info: any
    handleChange: any
    isError?: boolean
    isFormatIcon?: boolean
    handleRemove: any
}

const Input = ({
    name,
    info,
    handleChange,
    isError = false,
    isFormatIcon = false,
    handleRemove
}: IInput) => {

    const classes = {
        input: 'focus:outline-none pb-3 border-b border-gray-200 text-sm w-full'
    }

    return (
        <div className="relative">
            <input className={classes.input} style={{ borderColor: isError ? 'red' : '' }} name={name} value={(info && info[`${name}`]) || ""} onChange={handleChange} />
            {isFormatIcon && <MdClose className="absolute right-0 top-0 hover:cursor-pointer" onClick={handleRemove} />}
        </div>
    )
}

export default Input