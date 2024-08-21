import Text from "shared/core/ui/Text"

const IdentificationDetails = () => {

    const Details = [
        { title: "Branch / Unit", value: "Large Corporates Unit" },
        { title: "Title", value: "Ms" },
        { title: "First Name", value: "Sophia" },
        { title: "Last Name", value: "Martinez" },
        { title: "Father's Name (Middle)", value: "Erixson" },
        { title: "Gender", value: "Female" },
        { title: "Date of Birth", value: "01 April 1990" },
        { title: "Place of Birth", value: "Florida" },
        { title: "Country of Birth", value: "United Sates" }
    ]

    return (
        <div className="flex flex-col gap-10 w-[440px]">
            <Text text="Corporate Account Opening" size={14} weight="500" />
            <Text text="Identification Details" size={28} weight="700" />
            <div className="flex flex-col gap-4">
                {
                    Details.map((data: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                            <Text text={data.title} size={14} />
                            <Text text={data.value} size={14} weight="600" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default IdentificationDetails