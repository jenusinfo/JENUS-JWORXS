import { useHookForm } from "hooks/FormHook";
import { useHookInterview } from "hooks/InterviewHook";
import { INTERVIEWSTATUS, useApp } from "providers/AppProvider";
import React, { ChangeEvent, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IForm } from "types/dashboard";
import handlebars from "handlebars";
import { XmlGenerator } from "shared/helper/XmlGenerator";
import { GetInterviewSession, submitInterview, UpdateFavourite, UpdateInterview } from "lib/interview";
import { toast } from "react-toastify";
import http from "services/http-common";
import { CreateUserTask, GetCurrentUserTask, UpdateUserTask } from "lib/usertask";
import { useHookFlowDefinitions } from "hooks/Settings/FlowDefinitionsHook";
import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import axios from "axios";
import mime from 'mime-types'
import { IInterviewDocument } from "types/document";

const InterviewContext: any = createContext(null)

const InterviewProvider = ({ children }: any) => {

  const { setLoading, step, setStep, curForm, setCurForm, interviewInfo: info, setInterviewInfo: setInfo, interviewFormStatus, interviewId, sessionResult, setSessionResult } = useApp()
  const { flowDefinitions } = useHookFlowDefinitions()
  const { forms, getForms } = useHookForm()
  const [filteredForms, setFilteredForms] = useState(forms)
  const [sessionId, setSessionId] = useState()
  const { formStructure, formFullInfo, interviewSection } = useHookInterview({ formId: curForm?.Id })
  const [search, setSearch] = useState("")
  const [isEditMode, setIsEditMode] = useState(true)
  const [flowInfo, setFlowInfo] = useState<any>({})
  const [comment, setComment] = useState("")
  const [defaultActivity, setDefaultActivity] = useState<any>()
  const [decisions, setDecisions] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const { documentConfigurations, getDocumentConfigurations } = useHookFormDefinitionsDetail()
  const [interviewDocuments, setInterviewDocuments] = useState<IInterviewDocument[]>([])
  const [nextClicked, setNextClicked] = useState(0)
  const [checked, setChecked] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>, keyArray: string) => {
    setInfo((prevInfo: any) => {
      // Deep clone function to create a completely new object
      const deepClone = (obj: any): any => {
        if (obj === null || typeof obj !== 'object') return obj;

        if (Array.isArray(obj)) {
          return obj.map(item => deepClone(item));
        }

        const clonedObj: any = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepClone(obj[key]);
          }
        }

        return clonedObj;
      };

      // Create a deep clone of the previous info
      const updatedInfo = deepClone(prevInfo);

      // Recursive function to update nested value
      const updateNestedValue = (obj: any, keys: string[], value: string) => {
        if (keys.length === 1) {
          obj[keys[0]] = value;
          return obj;
        }

        const [currentKey, ...remainingKeys] = keys;
        updateNestedValue(obj[currentKey], remainingKeys, value);
        return obj;
      };

      // Split the key array and add the target name
      const fullKeyPath = keyArray.split("#").concat(e.target.name);

      // Update the nested value
      updateNestedValue(updatedInfo, fullKeyPath, e.target.value);

      return updatedInfo;
    });
  };

  const handleFlowChange = async (e: any) => {
    if (isEdit && e.target.name == "TaskDefinitionId")
      return;
    setFlowInfo({
      ...flowInfo,
      [e.target.name]: e.target.value
    })
    if (e.target.name == "TaskDefinitionId") {
      const res = await http.get(`/TaskDefinitions/${e.target.value}/DefaultActivity`)

      if (res?.data) {
        setDefaultActivity(res.data.Data)
        setDecisions(res.data.Data.Decisions)
      }
    }
  }

  const formSubmitHandler = async () => {
    // e?.preventDefault();
    // let required = checkErrorsHandler();
    let required = false
    if (required) return;
    else {
      setLoading(true);

      let formSubject = curForm?.Subject;
      let interviewSubject = '';

      // if (formSubject && formSubject != '') {
      //   let allSectionValuesArr: any = [];
      //   let sectionKeys = Object.keys(info);

      //   sectionKeys.map(function (sectionId) {
      //     let sectionTagName = interviewSection?.filter(function (section: any) {
      //       return section.Id == parseInt(sectionId)
      //     })[0].globalId;

      //     allSectionValuesArr[sectionTagName] = info[parseInt(sectionId)][0];
      //   });

      //   let compiledTemplate = handlebars.compile(formSubject);
      //   interviewSubject = compiledTemplate(allSectionValuesArr);
      // }

      let interviewQuestions: any = []
      formFullInfo[0].Sections?.forEach((each: any) => {
        each.Questions?.forEach((item: any) => {
          interviewQuestions.push(item)
        })
      })

      let xmlString = XmlGenerator(
        info,
        curForm?.RootTagName,
        interviewSection,
        interviewQuestions
      );

      if (interviewFormStatus == INTERVIEWSTATUS.CREATED) {
        let payload = {
          InterviewFormId: curForm?.Id,
          JsonData: JSON.stringify(info),
          XMLData: xmlString,
          Id: sessionId ? sessionId : 0,
          Subject: interviewSubject
        };
        const res = await submitInterview(payload)
        setSessionResult(res.Data)
      }
      if (interviewFormStatus == INTERVIEWSTATUS.UPDATED) {
        let payload = {
          InterviewFormId: curForm?.Id,
          JsonData: JSON.stringify(info),
          NewJsonData: JSON.stringify(info),
          XMLData: xmlString,
          Id: interviewId,
          Subject: interviewSubject
        };
        const res = await UpdateInterview(interviewId, payload)
        setSessionResult(res.Data)
      }
      // if (paramsSessionId) {
      //   payload.Id = paramsSessionId;
      // }

      // if (sessionId || paramsSessionId) {

      // }
    }
  };

  const clearSection = async (isRepeatable: boolean, sectionId: number) => {
    setInfo({
      ...info,
      [sectionId]: isRepeatable ? [] : {}
    })
  }

  const handleFavourite = async (formId: number, isFavourite: boolean) => {
    const res = await UpdateFavourite(formId, isFavourite)

    if (res.Data) {
      getForms()
      toast.success(res.Message)
    }
  }

  const handleSaveFlow = async () => {
    let params: any = {}
    params.SourceId = null
    params.Name = curForm.Subject
    params.Description = ""
    params.Comments = comment
    params.TaskDefinitionId = flowInfo.TaskDefinitionId
    params.CurrentActivityId = defaultActivity.Id
    params.currentActivityName = defaultActivity.Name
    params.currentActivityStatus = defaultActivity.StatusString
    params.DecisionId = flowInfo.DecisionId
    params.AssignedToId = flowInfo.AssignedToId
    params.Id = isEdit ? sessionResult.UserTask.Id : 0
    params.ReferenceId = isEdit ? null : sessionResult.Id || null
    params.AttachmentType = isEdit ? null : "Interview"
    params.Source = null
    params.UpdateInterviewStatusToInprogress = false
    params.IsFormSubmitted = true

    if (isEdit) {
      let res = await UpdateUserTask(sessionResult.UserTask.Id, params)

      if (res) {
        res = await GetInterviewSession(sessionResult.Id)
        if (res?.data)
          setSessionResult(res?.data.Data)
      }
    } else {
      let res = await CreateUserTask(params)

      if (res) {
        res = await GetInterviewSession(sessionResult.Id)
        if (res?.data)
          setSessionResult(res?.data.Data)
      }
    }
  }

  const getCurrentUserTask = async (id: any) => {
    const res = await GetCurrentUserTask(id)

    if (res?.data) {
      setDefaultActivity(res.data.Data)
      setDecisions(res.data.Data.Decisions)
    }
  }

  const handleGenerateDocument = async (id: any) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Interviews/Sessions/ExecuteEFS/${sessionResult.Id}/${id}`, {
        responseType: "blob",
      })
      .then(async (res) => {
        setLoading(false);
        let fileExtension = "." + (mime.extension(res.headers["content-type"]) || "pdf");
        let disposition = res.headers["content-disposition"];
        let filename = "";

        if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
        }

        if (filename == "") {
          //filename = `${interviewName + "_" + session?.CreatedOn}`;
          filename = `${sessionId + "_" + sessionResult?.CreatedOn}`;
        }

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;

        if (filename.toLowerCase().endsWith(fileExtension.toLowerCase())) {
          link.setAttribute("download", filename);
        }
        else {
          link.setAttribute("download", filename + fileExtension);
        }

        document.body.appendChild(link);
        link.click();

        setTimeout(function () {
          document.body.removeChild(link);
          //link.remove();
        }, 500);

      })
      .catch(async (error) => {
        setLoading(false);
        let errorObj = JSON.parse(await error.response.data.text());
        toast.error(errorObj?.Message || "Please try after sometime")
      });
  }

  const getInterviewDocuments = async () => {
    const res = await http.get(`/DocumentOutputs/Interviews/${sessionResult.Id}`)

    setInterviewDocuments(res?.data.Data)
  }

  const handleStatusToInProgress = async () => {
    const res = await http.post(`/Interviews/Sessions/InProgress?interviewSessionId=${sessionResult.Id}`, { interviewSessionId: sessionResult.Id }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }
    })
  }

  const validateInterviewForm = () => {
    setNextClicked(prev => prev+1)
    setChecked(true)

    return checked
  }

  useEffect(() => {
    if (curForm) {
      getDocumentConfigurations(curForm.Id)
    }
  }, [curForm])

  useEffect(() => {
    if (sessionResult.UserTask && flowDefinitions && flowDefinitions.length) {
      setIsEdit(true)
      let taskDefinitionName = sessionResult.UserTask.TaskDefinitionName
      let currentFlowDefinition = flowDefinitions.filter((each: any) => each.Name == taskDefinitionName)[0]
      setFlowInfo({
        TaskDefinitionId: currentFlowDefinition.Id
      })
      getCurrentUserTask(sessionResult.UserTask.Id)
    }
  }, [sessionResult, flowDefinitions])

  useEffect(() => {
    setFilteredForms(forms.filter((form: IForm) => form.Name.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  useEffect(() => {
    setFilteredForms(forms)
  }, [forms])

  useEffect(() => {
    if (formStructure) {

      const processControls = (controls: any, temp: any) => {
        controls.forEach((control: any) => {

          if (!control.isHidden) {
            if (control.globalId) {
              if (control.isRepeatable) {
                temp[control.globalId] = []
                temp[control.globalId].push({})
              } else {
                temp[control.globalId] =
                  control.type === "repeater" ? [] :
                    control.type === "section" ? {} : "";
              }
            }

            if (control.controls) {
              const nestedTemp = control.isRepeatable ? temp[control.globalId][0] : control.globalId ? temp[control.globalId] : temp;
              processControls(control.controls, nestedTemp);
            }
          }
        });
      };

      let controls = formStructure.controls
      let temp: any = {}
      processControls(controls, temp)
      if (interviewFormStatus == INTERVIEWSTATUS.CREATED) {
        setInfo(temp)
      }
    }
  }, [formStructure])

  const initialValues = useMemo(() => {
    if (formStructure) {
      const processControls = (controls: any, temp: any) => {
        controls.forEach((control: any) => {
          if (!control.isHidden) {
            if (control.globalId) {
              if (control.isRepeatable) {
                temp[control.globalId] = []
                temp[control.globalId].push({})
              } else {
                temp[control.globalId] =
                  control.type === "repeater" ? [] :
                    control.type === "section" ? {} : "";
              }
            }

            if (control.controls) {
              const nestedTemp = control.isRepeatable ? temp[control.globalId][0] : control.globalId ? temp[control.globalId] : temp;
              processControls(control.controls, nestedTemp);
            }
          }
        })
      };

      let temp: any = {}
      processControls(formStructure.controls, temp)
      return JSON.parse(JSON.stringify(temp))
    }
    return {}
  }, [formStructure])

  const value = useMemo(
    () => ({
      step, setStep,
      info, setInfo, handleChange,
      forms,
      curForm, setCurForm,
      formStructure,
      formFullInfo,
      formSubmitHandler,
      sessionResult,
      search, setSearch,
      filteredForms,
      handleFavourite,
      isEditMode, setIsEditMode,
      flowInfo, setFlowInfo, handleFlowChange,
      comment, setComment,
      decisions, setDecisions,
      handleSaveFlow, flowDefinitions, documentConfigurations,
      handleGenerateDocument, getInterviewDocuments,
      interviewDocuments, handleStatusToInProgress,
      clearSection, validateInterviewForm,
      initialValues,
      nextClicked, setNextClicked,
      checked, setChecked
    }),
    [
      step, setStep,
      info, setInfo, handleChange,
      forms,
      curForm, setCurForm,
      formFullInfo,
      formSubmitHandler,
      sessionResult,
      search, setSearch,
      filteredForms,
      handleFavourite,
      isEditMode, setIsEditMode,
      flowInfo, setFlowInfo, handleFlowChange,
      comment, setComment,
      decisions, setDecisions,
      handleSaveFlow, flowDefinitions, documentConfigurations,
      handleGenerateDocument, getInterviewDocuments,
      interviewDocuments, handleStatusToInProgress,
      clearSection, validateInterviewForm,
      nextClicked, setNextClicked,
      checked, setChecked
    ]
  )

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>
}

export const useInterview = () => {
  const context: any = useContext(InterviewContext)
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider")
  }
  return context
}

export default InterviewProvider