import { useInterview } from "providers/dashboard/InterviewProvider"
import FormInput from "shared/core/components/FormInput"
import Text from "shared/core/ui/Text"

const PersonalDetails = () => {

    const { info, handleChange, formFullInfo, curForm } = useInterview()

//   console.log(formFullInfo)

    if (!formFullInfo) {
        return <></>
    }

    return (
        <div className="space-y-10">
            {
                formFullInfo[0].Sections.map((section: any, index: number) => (
                    <div key={index} className="flex flex-col gap-5 w-[440px]">
                        <Text text={section.Label} size={14} weight="500" />
                        <div className="flex justify-between items-end">
                            <Text text={section.Description} size={20} weight="700" />
                            <Text text="Clear section" size={14} weight="500" color="#2454DE" />
                        </div>
                        <div className="flex flex-col gap-4">
                            {
                                section.Questions.map((que: any, j: number) => (
                                    <FormInput 
                                        key={j} 
                                        label={que.Description} 
                                        name={que.TagName} 
                                        info={info[que.InterviewSectionId] || {}} 
                                        handleChange={(e: any) => handleChange(e, que.InterviewSectionId)} 
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            {/* {
                formFullInfo.map((formInfo: any, i: number) => (
                    formInfo.Sections.map((section: any, index: number) => (
                        <div key={index} className="flex flex-col gap-5 w-[440px]">
                            <Text text={section.Label} size={14} weight="500" />
                            <div className="flex justify-between items-end">
                                <Text text={section.Description} size={20} weight="700" />
                                <Text text="Clear section" size={14} weight="500" color="#2454DE" />
                            </div>
                            <div className="flex flex-col gap-4">
                                {
                                    section.Questions.map((que: any, j: number) => (
                                        <FormInput 
                                            key={j} 
                                            label={que.Description} 
                                            name={que.TagName} 
                                            info={(info[que.InterviewSectionId] && info[que.InterviewSectionId][i]) || {}} 
                                            handleChange={(e: any) => handleChange(e, que.InterviewSectionId, i)} 
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                ))
            } */}
        </div>
    )
}

export default PersonalDetails