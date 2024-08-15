import { useEmailTemplates } from "providers/settings/EmailTemplatesProvider"
import FormInput from "shared/core/components/FormInput"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const EmailTemplatesModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate } = useEmailTemplates()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Email Template Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Document Definition" name="DocumentDefinition" info={info} handleChange={handleChange} />
					<FormInput label="Email From" name="EmailFrom" info={info} handleChange={handleChange} />
					<FormInput label="Email BCC" name="EmailBCC" info={info} handleChange={handleChange} />
					<FormInput label="Email Subject" name="EmailSubject" info={info} handleChange={handleChange} />
					<FormInput label="Email Attachment Name" name="EmailAttachmentName" info={info} handleChange={handleChange} />
					<FormInput label="Email Body" name="EmailBody" info={info} handleChange={handleChange} />
					<FormSelect
						label="Is Active"
						name="IsActive"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
				</div>
				<div className="flex mt-4 px-[34px]">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={curIndex != -1 ? () => handleUpdate() : () => handleCreate()}>Save</button>
				</div>
			</div>
		</RightSide>
	)
}

export default EmailTemplatesModal