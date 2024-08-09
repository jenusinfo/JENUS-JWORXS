export const RADIO_STATUS = {
    DISABLE: "DISABLE",
    ENABLE: "ENABLE",
    CHECKED: "CHECKED",
    SELECTED: "SELECTED"
}

const RadioButton = ({status, onClick}: {status: string, onClick: () => void}) => {
    return (
        <div 
            className="rounded-full" 
            style={{ 
                width: 16, 
                height: 16, 
                border: status == RADIO_STATUS.CHECKED 
                    ? '6px solid #2454DE'
                    : status == RADIO_STATUS.SELECTED
                    ? '6px solid #AAAAAF'
                    :  status == RADIO_STATUS.ENABLE
                    ? '1.5px solid #AAAAAF'
                    : '1.5px solid #EEF0FE'
            }}
            onClick={onClick}
        />
    )
}

RadioButton.defaultProps = {
    status: RADIO_STATUS.DISABLE,
    onClick: () => {}
}

export default RadioButton