import Text from "../ui/Text"
import Input from "./Input"

interface IFormInput {
    label: string
    name: string
    info: any
    handleChange: any
    isError?: boolean
    isFormatIcon?: boolean
    handleRemove?: any
}

export default function FormInput({
    label,
    name,
    info,
    handleChange,
    isError = false,
    isFormatIcon = false,
    handleRemove
}: IFormInput) {

    const classes = {
        form: 'flex flex-col gap-[2px]'
    }

    return (
        <div className={classes.form}>
            <Text text={label} color="#84858c" />
            <Input name={name} info={info} handleChange={handleChange} isError={isError} isFormatIcon={isFormatIcon} handleRemove={handleRemove} />
        </div>
    )
}