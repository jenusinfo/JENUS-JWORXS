import { useState } from "react";
import dynamic from "next/dynamic";
import FormSelect from "shared/core/components/FormSelect"
import { useHookFlowDefinitions } from "hooks/Settings/FlowDefinitionsHook";
import { useHookUser } from "hooks/UserHook";
const ReactQuill: any = dynamic(() => import('react-quill'), { ssr: false })

const Flow = () => {

    const [comment, setComment] = useState("")
    const { flowDefinitions } = useHookFlowDefinitions()
    const { users } = useHookUser()

    return (
        <div className="space-y-6 w-[528px]">
            <FormSelect
                label="Task Type"
                name="TaskType"
                info={{}}
                handleChange={() => {}}
                optionList={[
                    {name: "Select a TaskType", value: "Select a TaskType"},
                    ...flowDefinitions.map((item: any, index: number) => ({
                        name: item.Name, value: item.Id
                    }))
                ]}
            />
            <FormSelect
                label="Decision"
                name="Decision"
                info={{}}
                handleChange={() => {}}
                optionList={[
                    {name: "Select a decision", value: "Select a decision"},
                    ...flowDefinitions.map((item: any, index: number) => ({
                        name: item.Name, value: item.Id
                    }))
                ]}
            />
            <FormSelect
                label="Asignee"
                name="Asignee"
                info={{}}
                handleChange={() => {}}
                optionList={[
                    {name: "Select a assignee", value: "Select a assignee"},
                    ...users.map((user: any, index: number) => ({
                        name: user.FirstName + " " + user.LastName, value: user.Id
                    }))
                ]}
            />
            <ReactQuill theme="snow" value={comment} onChange={setComment} placeholder="Enter your comments" />
        </div>
    )
}

export default Flow