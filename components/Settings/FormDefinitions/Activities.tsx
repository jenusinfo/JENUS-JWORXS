import { useFormDefinitions } from "providers/settings/FormDefinitionsProvider"
import FormInput from "shared/core/components/FormInput"
import FormMultiSelect from "shared/core/components/FormMultiSelect"
import FormSelect from "shared/core/components/FormSelect"
import Text from "shared/core/ui/Text"

const Activities = () => {

    const { info, handleChange, groups, handleMultiChange } = useFormDefinitions()

    return (
        <>
            <div className="px-[29px] py-4">
                <Text text="Activities" size={16} weight="500" color="black" />
            </div>
            <div className="px-[29px]">
                <div className="p-2 flex flex-col gap-3 rounded-[4px] border border-gray-200">
                    <FormInput label="Activity Name" name="TargetActivityName" info={info} handleChange={handleChange} />
                    <FormSelect label="Status" name="Status" info={info} handleChange={handleChange} optionList={[
                        { value: "Draft", name: "Draft" },
                        { value: "In-Progress", name: "In-Progress" },
                        { value: "Completed", name: "Completed" },
                        { value: "Cancelled", name: "Cancelled" }
                    ]} />
                    <FormInput label="Recipient Email Ids" name="RecipientEmailIds" info={info} handleChange={handleChange} />
                    <FormMultiSelect 
                        label="Groups"
                        name="GroupIds"
                        info={info}
                        zIndex={50}
                        handleMultiChange={handleMultiChange}
                        optionList={groups.map((item: any) => ({
							value: item.Id, name: item.Name
						}))}
                    />
                    <FormSelect
						label="Notify Branch"
						name="NotifyBranch"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
                    <FormSelect
						label="Notify Initiator"
						name="NotifyInitiator"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
                    <FormSelect
						label="Lock Interview"
						name="LockInterview"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
                    <FormSelect
						label="No Same Previous Person"
						name="NoSamePreviousPerson"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
                    <FormSelect
						label="Notify Assigned User"
						name="NotifyAssignedUser"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
                    <FormSelect
						label="Allow Global Unit"
						name="AllowGlobalUnit"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
                    <FormSelect
						label="Allow Attachment(s)"
						name="AllowAttachments"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={() => {}}>Add Decision</button>
                    <div className="border border-gray-200 rounded-[4px] p-4">
                        <FormInput label="Activity Name" name="TargetActivityName" info={info} handleChange={handleChange} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Activities