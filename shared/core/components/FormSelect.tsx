import Text from "../ui/Text"
import Select from "./Select"

interface IFormSelect {
    label: string
    name: string
    info: any
    handleChange: any
    optionList: any
}

export default function FormSelect({
    label,
    name,
    info,
    handleChange,
    optionList
}: IFormSelect) {

    const classes = {
        form: 'flex flex-col gap-[2px]'
    }

    return (
        <div className={classes.form}>
            <Text text={label} color="#84858c" />
            <Select name={name} info={info} handleChange={handleChange} optionList={optionList} />
        </div>
    )
}