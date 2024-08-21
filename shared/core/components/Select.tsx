interface ISelect {
    name: string
    info: any
    handleChange: any
    optionList: any
}

export default function Select({
    name,
    info,
    handleChange,
    optionList
}: ISelect) {

    const classes = {
        select: 'focus:outline-none pb-3 border-b border-gray-200 text-sm'
    }

    return (
        <select className={classes.select} name={name} value={info[`${name}`]} onChange={handleChange}>
            {
                optionList.map((option: any, index: number) => (
                    <option key={index} value={option.value}>{option.name}</option>
                ))
            }
        </select>
    )
}