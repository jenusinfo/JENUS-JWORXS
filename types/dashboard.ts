export interface IInbox {
    CreatedById: number
    CreatedOn: string
    CreatedBy: string
    ModifiedById: number
    ModifiedOn: string
    Status: string
    StatusCode: string
    ModifiedBy: string
    TaskType: string
    InterviewFormName: string
    SearchTags: null
    AssignedTo_Id: null
    AssignedOn: null
    AssignedBy_Id: null
    AssignedBy: null
    AssignedTo: null
    HashTags: Array<any>
    CreatedByBankUnit: string
    StatusId: number
    TaskIds: Array<any>
    IsLockedByTask: false
    UserTask: null
    InterviewLastModifiedOn: string
    InterviewTaskLastModifiedOn: string
    ShowSubmitButton: false
    Id: number
    InterviewFormId: number
    XMLData: null
    JsonData: null
    Subject: null
    NewJsonData: null
}

export interface IGroup {
    title: string
    description: string
    people: Array<string>
}

export interface IQuickAction {
    name: string
    link: string
}

export interface IForm {
    CreatedById: number
    CreatedBy: string
    CreatedOn: string
    ModifiedById: number
    ModifiedBy: string
    ModifiedOn: string
    IsFavourite: boolean
    Id: number
    Name: string
    RootTagName: string
    IsActive: boolean
    Description: string
    LinkToDashboard: boolean
    InterviewFormPermit: any,
    IsCheckerRequired: boolean
    HashTags: any,
    IsCoverPageInterviewForm: boolean
    Subject: string
    TaskDefinitionId: null | number
}