import Text from "../ui/Text"
import NumberInput from "./Number"

interface IFormNumber {
    label: string
    name: string
    info: any
    handleChange: any
    min: number
}

export default function FormNumber({
    label,
    name,
    info,
    handleChange,
    min
}: IFormNumber) {

    const classes = {
        form: 'flex flex-col gap-[2px]'
    }

    return (
        <div className={classes.form}>
            <Text text={label} color="#84858c" />
            <NumberInput name={name} min={min} info={info} handleChange={handleChange} />
        </div>
    )
}

FormNumber.defaultProps = {
    min: 0
}