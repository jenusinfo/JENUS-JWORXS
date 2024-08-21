import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import Text from "shared/core/ui/Text";

const Form = () => {

    const formList = [
        {
            title: "general questions",
            isOpen: false
        },
        {
            title: "personal details",
            isOpen: true
        },
        {
            title: "permanent residential address details",
            isOpen: false
        },
        {
            title: "contacts details",
            isOpen: false
        },
        {
            title: "occupation business activity",
            isOpen: false
        },
        {
            title: "financial details",
            isOpen: false
        }
    ]
    const personalDetails = [
        {key: "Branch / Unit", value: "Large Corporates Unit"},
        {key: "Title", value: "Ms"},
        {key: "First Name", value: "Sophia"},
        {key: "Last Name", value: "Martinez"},
        {key: "Father's Name (Middle)", value: "Erixson"},
        {key: "Gender", value: "Female"},
        {key: "Date of Birth", value: "01 April 1990"},
        {key: "Place of Birth", value: "Florida"},
        {key: "Country of Birth", value: "United States"}
    ]

    return (
        <div className="space-y-5">
            {
                formList.map((form, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-4">
                            {
                                form.isOpen
                                ? <FaAngleDown />
                                : <FaAngleRight />
                            }
                            <Text text={form.title} size={14} weight="700" className="capitalize" />
                        </div>
                        {
                            form.isOpen &&
                            <div className="w-[448px] flex flex-col gap-3 mt-4 ml-[30px]">
                                {
                                    personalDetails.map((data, j) => (
                                        <div key={j} className="flex justify-between">
                                            <Text text={data.key} size={14} color="black" />
                                            <Text text={data.value} size={14} weight="600" color="black" />
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Form