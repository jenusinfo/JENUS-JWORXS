// export interface IDocument {
//     properties: {
//         id: number
//         owner: string
//         created: string
//         updated: string
//         revision: number
//         lastLocation: string
//     }
//     documentDef: string
//     hidden: boolean
//     fileProperties: {
//         extension: string
//         version: number
//         date: string
//         size: number
//     }
//     keys: IKey
// }

// export interface IKey {
//     document-user: string
//     document-branch: string
//     document-number: number
//     reviewedby: string
//     document-entity-type: string
//     released-status: string
//     checked: string
//     scanning-source: string
//     document-entity-name: string
//     document-date: string
//     status: string
//     document-entity-code: string
//     last-released-on: string
//     document-type: string
// }

export interface IFormDocument {
    CreatedById: number
    CreatedBy: string
    CreatedOn: string
    ModifiedBy: string
    ModifiedById: number
    ModifiedOn: string
    Id: number
    InterviewFormId: number
    Caption: string
    Description: string
    OutputFileName: string
    EfsUrl: string
    IsActive: boolean
}

export interface IInterviewDocument {
    Id: number
    JDocId: null | number
    InterviewId: number
    CreatedById: number
    CreatedBy: string
    CreatedOn: string
    GeneratedDocumentName: string
    JDocName: null | string
    InterviewFormName: string
    IsArchive: boolean
    ModifiedById: null | number
    ModifiedOn: null | string
    ModifiedBy: null | string
    EfsSettingId: number
}