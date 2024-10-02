import { useState } from "react";
import dynamic from "next/dynamic";
import FormSelect from "shared/core/components/FormSelect"
import { useHookFlowDefinitions } from "hooks/Settings/FlowDefinitionsHook";
import { useHookUser } from "hooks/UserHook";
import { useInterview } from "providers/dashboard/InterviewProvider";
const ReactQuill: any = dynamic(() => import('react-quill'), { ssr: false })

const Flow = () => {

    const { flowInfo, setFlowInfo, handleFlowChange, comment, setComment, decisions } = useInterview()
    const { flowDefinitions } = useHookFlowDefinitions()
    const { users } = useHookUser()

    console.log(flowInfo)

    return (
        <div className="space-y-6 w-[528px]">
            <FormSelect
                label="Task Type"
                name="TaskType"
                info={flowInfo}
                handleChange={handleFlowChange}
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
                info={flowInfo}
                handleChange={handleFlowChange}
                optionList={[
                    {name: "Select a decision", value: "Select a decision"},
                    ...decisions.map((item: any, index: number) => ({
                        name: item.Name, value: item.Id
                    }))
                ]}
            />
            <FormSelect
                label="Asignee"
                name="Asignee"
                info={flowInfo}
                handleChange={handleFlowChange}
                optionList={[
                    {name: "Assigned To", value: "Select a assignee"},
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