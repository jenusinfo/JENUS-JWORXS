import { useFlowDefinitions } from "providers/settings/FlowDefinitionsProvider"
import { MdDelete } from "react-icons/md"
import FormInput from "shared/core/components/FormInput"
import FormMultiSelect from "shared/core/components/FormMultiSelect"
import FormSelect from "shared/core/components/FormSelect"
import Text from "shared/core/ui/Text"

const Activities = () => {

    const { info, setInfo, handleActivityChange, groups, handleMultiChange, handleDecisionChange, handleMultiActivityChange, activities } = useFlowDefinitions()

    return (
        <>
            <div className="px-[29px] py-4">
                <Text text="Activities" size={16} weight="500" color="black" />
                <button className="text-white bg-[#2454de] rounded-[4px] py-2 h-fit text-xs w-full mt-2" onClick={() => {
                    if (info.Activities == undefined) {
                        setInfo({
                            ...info,
                            Activities: [{ Status: "Draft" }]
                        })
                    } else {
                        let temp = { ...info }
                        temp.Activities.push({ Status: "Draft" })
                        setInfo(temp)
                    }
                }}>Add Activity</button>
            </div>
            <div className="space-y-2">
                {
                    info.Activities &&
                    info?.Activities.map((activity: any, index: number) => (
                        <div key={index} className="px-[29px]">
                            <div className="p-2 flex flex-col gap-3 rounded-[4px] border border-gray-200">
                                <div className="flex justify-end">
                                    <MdDelete color="red" size={20} className="hover:cursor-pointer" onClick={() => {
                                        let temp = { ...info }
                                        temp.Activities.splice(index, 1)
                                        setInfo(temp)
                                    }} />
                                </div>
                                <FormInput label="Activity Name" name="Name" info={activity} handleChange={(e: any) => handleActivityChange(e, index)} />
                                <FormSelect label="Status" name="Status" info={activity} handleChange={(e: any) => handleActivityChange(e, index)} optionList={[
                                    { value: 1, name: "Draft" },
                                    { value: 2, name: "In-Progress" },
                                    { value: 3, name: "Completed" },
                                    { value: 4, name: "Cancelled" }
                                ]} />
                                <FormInput label="Recipient Email Ids" name="RecipientEmailIds" info={activity} handleChange={(e: any) => handleActivityChange(e, index)} />
                                <FormMultiSelect
                                    label="Groups"
                                    name="GroupIds"
                                    info={activity}
                                    zIndex={50}
                                    index={index}
                                    handleMultiChange={handleMultiActivityChange}
                                    optionList={groups.map((item: any) => ({
                                        value: item.Id, name: item.Name
                                    }))}
                                />
                                <FormSelect
                                    label="Notify Branch"
                                    name="NotifyBranch"
                                    info={activity}
                                    handleChange={(e: any) => handleActivityChange(e, index)}
                                    optionList={[
                                        { value: false, name: 'No' },
                                        { value: true, name: 'Yes' }
                                    ]}
                                />
                                <FormSelect
                                    label="Notify Initiator"
                                    name="NotifyInitiator"
                                    info={activity}
                                    handleChange={(e: any) => handleActivityChange(e, index)}
                                    optionList={[
                                        { value: false, name: 'No' },
                                        { value: true, name: 'Yes' }
                                    ]}
                                />
                                <FormSelect
                                    label="Lock Interview"
                                    name="LockInterview"
                                    info={activity}
                                    handleChange={(e: any) => handleActivityChange(e, index)}
                                    optionList={[
                                        { value: false, name: 'No' },
                                        { value: true, name: 'Yes' }
                                    ]}
                                />
                                <FormSelect
                                    label="No Same Previous Person"
                                    name="NoSamePreviousPerson"
                                    info={activity}
                                    handleChange={(e: any) => handleActivityChange(e, index)}
                                    optionList={[
                                        { value: false, name: 'No' },
                                        { value: true, name: 'Yes' }
                                    ]}
                                />
                                <FormSelect
                                    label="Notify Assigned User"
                                    name="NotifyAssignedUser"
                                    info={activity}
                                    handleChange={(e: any) => handleActivityChange(e, index)}
                                    optionList={[
                                        { value: false, name: 'No' },
                                        { value: true, name: 'Yes' }
                                    ]}
                                />
                                <FormSelect
                                    label="Allow Global Unit"
                                    name="AllowGlobalUnit"
                                    info={activity}
                                    handleChange={(e: any) => handleActivityChange(e, index)}
                                    optionList={[
                                        { value: false, name: 'No' },
                                        { value: true, name: 'Yes' }
                                    ]}
                                />
                                <FormSelect
                                    label="Allow Attachment(s)"
                                    name="AllowAttachments"
                                    info={activity}
                                    handleChange={(e: any) => handleActivityChange(e, index)}
                                    optionList={[
                                        { value: false, name: 'No' },
                                        { value: true, name: 'Yes' }
                                    ]}
                                />
                                <button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={() => {
                                    let temp = { ...info }
                                    if (info.Activities[index].Decisions == undefined) {
                                        temp.Activities[index].Decisions = [{}]
                                        setInfo(temp)
                                    } else {
                                        temp.Activities[index].Decisions.push({})
                                        setInfo(temp)
                                    }
                                }}>Add Decision</button>
                                {
                                    info.Activities[index].Decisions &&
                                    info.Activities[index].Decisions.map((decision: any, i: number) => (
                                        <div key={i} className="border border-gray-200 rounded-[4px] p-4 flex flex-col gap-2">
                                            <div className="flex justify-end">
                                                <MdDelete color="red" size={20} className="hover:cursor-pointer" onClick={() => {
                                                    let temp = { ...info }
                                                    temp.Activities[index].Decisions.splice(i, 1)
                                                    setInfo(temp)
                                                }} />
                                            </div>
                                            <FormInput label="Decision Name" name="Name" info={decision} handleChange={(e: any) => handleDecisionChange(e, index, i)} />
                                            <FormSelect label="Target Activity" name="TargetActivityName" info={decision} handleChange={(e: any) => handleDecisionChange(e, index, i)} optionList={[{ value: "", name: "Choose" }, ...activities.map((each: any) => ({
                                                value: each, name: each
                                            }))]} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Activities