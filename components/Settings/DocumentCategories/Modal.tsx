import { useDocumentCategories } from "providers/settings/DocumentCategoriesProvider"
import FormInput from "shared/core/components/FormInput"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const DocumentCategoriesModal = ({ isOpen, handleClose }: {
    isOpen: boolean
    handleClose: () => void
}) => {

    const { info, handleChange, handleCreate, curIndex, handleUpdate, searchApplications, associatedImports } = useDocumentCategories()

    return (
        <RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
            <div className="rounded-[2px] py-5">
                <div className="px-[29px] pb-4 border-b border-gray-100">
                    <Text text="Document Category Details" size={16} weight="700" color="black" />
                </div>
                <div className="mt-6 flex flex-col gap-5 px-[34px]">
                    <FormSelect
                        label="Search Application"
                        name="Name"
                        info={info}
                        handleChange={handleChange}
                        optionList={searchApplications?.map((each: any) => ({
                            value: each.name,
                            name: each.name
                        }))}
                    />
                    <FormInput label="Search Description" name="Description" info={info} handleChange={handleChange} />
                    <FormSelect
                        label="Associated Import"
                        name="AssociatedImport"
                        info={info}
                        handleChange={handleChange}
                        optionList={associatedImports?.map((each: any) => ({
                            value: each.name,
                            name: each.name
                        }))}
                    />
                    <FormInput label="Import Description" name="ImportDescription" info={info} handleChange={handleChange} />
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
                    <FormSelect
                        label="Is Editable"
                        name="IsEditable"
                        info={info}
                        handleChange={handleChange}
                        optionList={[
                            { value: false, name: 'No' },
                            { value: true, name: 'Yes' }
                        ]}
                    />
                    <FormSelect
                        label="Has Statuses"
                        name="HasStatuses"
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

export default DocumentCategoriesModal