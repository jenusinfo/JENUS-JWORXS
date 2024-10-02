import http from "services/http-common"

export const CreateUserTask = async (id: any, params: any) => {
    let fn = new FormData()
    fn.append("SourceId", params.SourceId)
    fn.append("Name", params.Name)
    fn.append("Description", params.Description)
    fn.append("Comments", params.Comments)
    fn.append("TaskDefinitionId", params.TaskDefinitionId)
    fn.append("CurrentActivityId", params.CurrentActivityId)
    fn.append("DecisionId", params.DecisionId)
    fn.append("CurrentActivityName", params.CurrentActivityName)
    fn.append("CurrentActivityStatus", params.CurrentActivityStatus)
    fn.append("AssignedToId", params.AssignedToId)
    fn.append("Id", params.Id)
    fn.append("ReferenceId", params.ReferenceId)
    fn.append("Id", params.Id)
    fn.append("AttachmentType", params.AttachmentType)
    fn.append("Source", params.Source)
    fn.append("UpdateInterviewStatusToInProgres", params.UpdateInterviewStatusToInProgres)
    fn.append("IsFormSubmitted", params.IsFormSubmitted)

    const res = await http.post(`/UserTasks/${id}`, fn)
}