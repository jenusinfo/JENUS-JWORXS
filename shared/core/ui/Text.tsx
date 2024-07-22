interface IText {
    text: string
    color: string
    size: number
    weight: string
    className: string
}

const Text = ({
    text,
    color,
    size,
    weight,
    className
}: IText) => {
    return (
        <p
            style={{
                fontSize: size,
                color: color,
                fontWeight: weight
            }}
            className={className}
        >
            {text}
        </p>
    )
}

Text.defaultProps = {
    size: 14,
    color: "#202124",
    weight: "400",
    className: ""
}

export default Text