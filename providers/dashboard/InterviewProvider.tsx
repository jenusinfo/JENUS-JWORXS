import { useHookForm } from "hooks/FormHook";
import { useHookInterview } from "hooks/InterviewHook";
import { useApp } from "providers/AppProvider";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";
import { IForm } from "types/dashboard";
import handlebars from "handlebars";
import { XmlGenerator } from "shared/helper/XmlGenerator";
import { submitInterview } from "lib/interview";

const InterviewContext: any = createContext(null)

const InterviewProvider = ({ children }: any) => {

  const { setLoading, step, setStep, curForm, setCurForm } = useApp()
  const [info, setInfo] = useState<any>({})
  const [sessionResult, setSessionResult] = useState({})
  const { forms } = useHookForm()
  const [filteredForms, setFilteredForms] = useState(forms)
  const [sessionId, setSessionId] = useState()
  const { formStructure, formFullInfo, interviewSection } = useHookInterview({ formId: curForm?.Id })
  const [search, setSearch] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>, InterviewSectionId: any) => {
    let temp: any = { ...info }
    if (temp[InterviewSectionId] == undefined) {
      temp[InterviewSectionId] = {}
    }
    temp[InterviewSectionId][e.target.name] = e.target.value
    setInfo(temp)
  }

  // const handleChange = (e: ChangeEvent<HTMLInputElement>, InterviewSectionId: any, i: number) => {
  //   let temp: any = { ...info }
  //   if (temp[InterviewSectionId] == undefined) {
  //     temp[InterviewSectionId] = []
  //   }
  //   if (temp[InterviewSectionId][i] == undefined) {
  //     temp[InterviewSectionId][i] = {}
  //   }
  //   temp[InterviewSectionId][i][e.target.name] = e.target.value
  //   setInfo(temp)
  // }

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
      let payload = {
        InterviewFormId: curForm?.Id,
        JsonData: JSON.stringify(info),
        XMLData: xmlString,
        Id: sessionId ? sessionId : 0,
        Subject: interviewSubject
      };

      const res = await submitInterview(payload)
      setSessionResult(res.Data)
      // if (paramsSessionId) {
      //   payload.Id = paramsSessionId;
      // }

      // if (sessionId || paramsSessionId) {
        
      // }
    }
  };

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
      filteredForms
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
      filteredForms
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