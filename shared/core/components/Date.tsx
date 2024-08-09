interface IInput {
    name: string
    info: any
    handleChange: any
}

const Date = ({
    name,
    info,
    handleChange
}: IInput) => {

    const classes = {
        input: 'focus:outline-none pb-3 border-b border-gray-200 text-sm'
    }

    return (
        <input type="date" className={classes.input} name={name} value={info[`${name}`] || ""} onChange={handleChange} />
    )
}

export default Date