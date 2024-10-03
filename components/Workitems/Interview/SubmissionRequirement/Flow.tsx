import { useState } from "react";
import dynamic from "next/dynamic";
import FormSelect from "shared/core/components/FormSelect"
import { useHookFlowDefinitions } from "hooks/Settings/FlowDefinitionsHook";
import { useHookUser } from "hooks/UserHook";
import { useInterview } from "providers/dashboard/InterviewProvider";
const ReactQuill: any = dynamic(() => import('react-quill'), { ssr: false })

const Flow = () => {

    const { flowInfo, setFlowInfo, handleFlowChange, comment, setComment, decisions, flowDefinitions } = useInterview()
    const { users } = useHookUser()

    return (
        <div className="space-y-6 w-[528px]">
            <FormSelect
                label="Task Type"
                name="TaskDefinitionId"
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
                name="DecisionId"
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
                label="Assignee"
                name="AssignedToId"
                info={flowInfo}
                handleChange={handleFlowChange}
                optionList={[
                    {name: "Assigned To", value: "Select a assignee"},
                    ...users.map((user: any, index: number) => ({
                        name: user.FirstName + " " + user.LastName, value: user.Id
                    }))
                ]}
            />
            {/* <ReactQuill theme="snow" value={comment} onChange={setComment} placeholder="Enter your comments" /> */}
            <textarea 
                className=" border border-gray-100 rounded-[4px] px-2 py-2 focus:outline-none text-sm w-full" 
                value={comment} 
                onChange={e => setComment(e.target.value)} 
                placeholder="Enter your comments" 
            />
        </div>
    )
}

export default Flow