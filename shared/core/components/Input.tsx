interface IInput {
    name: string
    info: any
    handleChange: any
    isError?: boolean
}

const Input = ({
    name,
    info,
    handleChange,
    isError = false
}: IInput) => {

    const classes = {
        input: 'focus:outline-none pb-3 border-b border-gray-200 text-sm '
    }

    return (
        <input className={classes.input} style={{ borderColor: isError ? 'red' : '' }} name={name} value={info[`${name}`] || ""} onChange={handleChange} />
    )
}

export default Input