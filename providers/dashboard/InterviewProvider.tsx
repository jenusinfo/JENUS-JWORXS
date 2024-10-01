import { useHookForm } from "hooks/FormHook";
import { useHookInterview } from "hooks/InterviewHook";
import { INTERVIEWSTATUS, useApp } from "providers/AppProvider";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";
import { IForm } from "types/dashboard";
import handlebars from "handlebars";
import { XmlGenerator } from "shared/helper/XmlGenerator";
import { submitInterview, UpdateFavourite, UpdateInterview } from "lib/interview";
import { toast } from "react-toastify";

const InterviewContext: any = createContext(null)

const InterviewProvider = ({ children }: any) => {

  const { setLoading, step, setStep, curForm, setCurForm, interviewInfo: info, setInterviewInfo: setInfo, interviewFormStatus, interviewId, sessionResult, setSessionResult } = useApp()
  const { forms, getForms } = useHookForm()
  const [filteredForms, setFilteredForms] = useState(forms)
  const [sessionId, setSessionId] = useState()
  const { formStructure, formFullInfo, interviewSection } = useHookInterview({ formId: curForm?.Id })
  const [search, setSearch] = useState("")
  const [isEditMode, setIsEditMode] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>, InterviewSectionId: any, isRepeatable: any, i: any) => {
    let temp: any = { ...info }
    if (!isRepeatable) {
      if (temp[InterviewSectionId] == undefined) {
        temp[InterviewSectionId] = {}
      }
      temp[InterviewSectionId][e.target.name] = e.target.value
    } else {
      if (temp[InterviewSectionId] == undefined) {
        temp[InterviewSectionId] = []
      }
      if (temp[InterviewSectionId][i] == undefined) {
        temp[InterviewSectionId][i] = {}
      }
      console.log(temp[InterviewSectionId], i, temp[InterviewSectionId][i])
      temp[InterviewSectionId][i][e.target.name] = e.target.value
    }
    setInfo(temp)
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

      if (formSubject && formSubject != '') {
        let allSectionValuesArr: any = [];
        let sectionKeys = Object.keys(info);

        sectionKeys.map(function (sectionId) {
          let sectionTagName = interviewSection?.filter(function (section: any) {
            return section.Id == parseInt(sectionId)
          })[0].TagName;

          allSectionValuesArr[sectionTagName] = info[parseInt(sectionId)][0];
        });

        let compiledTemplate = handlebars.compile(formSubject);
        interviewSubject = compiledTemplate(allSectionValuesArr);
      }

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

  const handleFavourite = async (formId: number, isFavourite: boolean) => {
    const res = await UpdateFavourite(formId, isFavourite)

    if (res.Data) {
      getForms()
      toast.success(res.Message)
    }
  }

  useEffect(() => {
    setFilteredForms(forms.filter((form: IForm) => form.Name.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  useEffect(() => {
    setFilteredForms(forms)
  }, [forms])

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
      isEditMode, setIsEditMode
    }),
    [
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
      isEditMode, setIsEditMode
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