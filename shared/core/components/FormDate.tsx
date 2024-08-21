import Text from "../ui/Text"
import Date from "./Date"

interface IFormDate {
    label: string
    name: string
    info: any
    handleChange: any
}

export default function FormDate({
    label,
    name,
    info,
    handleChange
}: IFormDate) {

    const classes = {
        form: 'flex flex-col gap-[2px]'
    }

    return (
        <div className={classes.form}>
            <Text text={label} color="#84858c" />
            <Date name={name} info={info} handleChange={handleChange} />
        </div>
    )
}