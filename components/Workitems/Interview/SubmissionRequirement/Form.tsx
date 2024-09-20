import { useInterview } from "providers/dashboard/InterviewProvider";
import { useEffect, useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import Text from "shared/core/ui/Text";

const Form = () => {

    const [formList, setFormList] = useState([])
    const personalDetails = [
        { key: "Branch / Unit", value: "Large Corporates Unit" },
        { key: "Title", value: "Ms" },
        { key: "First Name", value: "Sophia" },
        { key: "Last Name", value: "Martinez" },
        { key: "Father's Name (Middle)", value: "Erixson" },
        { key: "Gender", value: "Female" },
        { key: "Date of Birth", value: "01 April 1990" },
        { key: "Place of Birth", value: "Florida" },
        { key: "Country of Birth", value: "United States" }
    ]
    const { formFullInfo, info } = useInterview()

    useEffect(() => {
        if (formFullInfo) {
            let temp: any = []
            formFullInfo[0].Sections.forEach((form: any) => {
                temp.push({
                    id: form.Id,
                    title: form.Label,
                    isOpen: false
                })
            })
            setFormList(temp)
        }
    }, [formFullInfo])

    return (
        <div className="space-y-5">
            {
                formList.map((form: any, index: number) => (
                    <div key={index}>
                        <div className="flex items-center gap-4 hover: cursor-pointer" onClick={() => {
                            let temp: any = [...formList]
                            temp[index].isOpen = !temp[index].isOpen
                            setFormList(temp)
                        }}>
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
                                    // Object.entries(
                                    Object.entries(info).map(([key, value]: any, index) => (
                                        key == form.id &&
                                        Object.entries(value).map(([k, val]: any, j: number) => (
                                            <div key={j} className="flex justify-between">
                                                <Text text={k} size={14} color="black" />
                                                <Text text={val} size={14} weight="600" color="black" />
                                            </div>
                                        ))
                                    )
                                    )
                                    // )?.map(([key, value]: any, j: number) => (
                                    //     <div key={j} className="flex justify-between">
                                    //         <Text text={key} size={14} color="black" />
                                    //         <Text text={value} size={14} weight="600" color="black" />
                                    //     </div>
                                    // ))
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