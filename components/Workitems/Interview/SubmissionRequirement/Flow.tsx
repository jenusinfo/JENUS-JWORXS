import FormSelect from "shared/core/components/FormSelect"
import ReactQuill from 'react-quill';
import { useState } from "react";

const Flow = () => {

    const [value, setValue] = useState("")

    return (
        <div className="space-y-6 w-[528px]">
            <FormSelect
                label="Decision"
                name="Decision"
                info={{}}
                handleChange={() => {}}
                optionList={[
                    {name: "Select a decision", value: "Select a decision"}
                ]}
            />
            <FormSelect
                label="Asignee"
                name="Asignee"
                info={{}}
                handleChange={() => {}}
                optionList={[
                    {name: "Select a assignee", value: "Select a assignee"}
                ]}
            />
            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Enter your comments" />
        </div>
    )
}

export default Flow