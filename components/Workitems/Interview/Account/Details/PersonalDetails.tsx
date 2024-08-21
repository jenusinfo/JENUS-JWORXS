import { useInterview } from "providers/dashboard/InterviewProvider"
import FormInput from "shared/core/components/FormInput"
import Text from "shared/core/ui/Text"

const PersonalDetails = () => {

    const { info, handleChange } = useInterview()

    return (
        <div className="flex flex-col gap-10 w-[440px]">
            <Text text="Corporate Account Opening" size={14} weight="500" />
            <div className="flex justify-between items-end">
                <Text text="Personal Details" size={28} weight="700" />
                <Text text="Clear section" size={14} weight="500" color="#2454DE" />
            </div>
            <div className="flex flex-col gap-4">
                <FormInput label="CIF Code" name="CIFCode" info={info} handleChange={handleChange} />
                <FormInput label="Branch / Unit" name="BranchUnit" info={info} handleChange={handleChange} />
                <FormInput label="Title" name="Title" info={info} handleChange={handleChange} />
                <FormInput label="First Name" name="Firstname" info={info} handleChange={handleChange} />
                <FormInput label="Father's Name (Optional)" name="Fathername" info={info} handleChange={handleChange} />
                <FormInput label="Last Name" name="Lastname" info={info} handleChange={handleChange} />
                <FormInput label="Gender" name="gender" info={info} handleChange={handleChange} />
                <FormInput label="Date of Birth" name="DateOfBirth" info={info} handleChange={handleChange} />
            </div>
        </div>
    )
}

export default PersonalDetails