interface INumberInput {
    name: string
    info: any
    handleChange: any
    min: any
}

const NumberInput = ({
    name,
    info,
    handleChange,
    min
}: INumberInput) => {

    const classes = {
        input: 'focus:outline-none pb-3 border-b border-gray-200 text-sm'
    }

    return (
        <input type="number" className={classes.input} name={name} value={info[`${name}`] || ""} onChange={handleChange} min={min} />
    )
}

export default NumberInput