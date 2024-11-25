import { useState } from "react"
import { useApp } from "providers/AppProvider"
import { GetDocumentConfigurations, GetInterviewFormFullInfo, GetInterviewRuleSet, GetInterviewSection, GetParentSectionOptions, GetRules } from "lib/interview"
import { GetGlobalParams } from "lib/settings/parameters"
import { GetEventAttributes, GetEvents, GetEventServiceMapping, GetEventServices } from "lib/settings/events"

export const useHookFormDefinitionsDetail = () => {
    const {setLoading} = useApp()
    const [formFullInfo, setFormFullInfo] = useState<any[]>([])
    const [interviewSections, setInterviewSections] = useState<any[]>([])
    const [globalParams, setGolbalParams] = useState<any>([])
    const [ruleSets, setRuleSets] = useState<any>([])
    const [events, setEvents] = useState<any>([])
    const [eventServices, setEventServices] = useState<any>([])
    const [eventAttributes, setEventAttributes] = useState<any>([])
    const [interviewServices, setInterviewServices] = useState<any>([])
    const [rules, setRules] = useState<any>([])
    const [documentConfigurations, setDocumentConfigurations] = useState<any>([])
    const [parentSectionOptions, setParentSectionOptions] = useState<any>([])

    const getFullInfoFormDefinitions = async (id: any) => {
        setLoading(true)
        const res = await GetInterviewFormFullInfo(id)

        setFormFullInfo(res.Data)
        setLoading(false)
    }

    const getInterviewSections = async (id: any) => {
        setLoading(true)
        const res = await GetInterviewSection(id)

        setInterviewSections(res.Data)
        setLoading(false)
    }

    const getGlobalParams = async () => {
        setLoading(true)
        const res = await GetGlobalParams()
        
        setGolbalParams(res.Data)
        setLoading(false)
    }

    const getInterviewRuleSet = async (id: any) => {
        setLoading(true)
        const res = await GetInterviewRuleSet(id)

        setRuleSets(res.Data)
        setLoading(false)
    }

    const getEvents = async () => {
        setLoading(true)
        const res = await GetEvents()
        setEvents(res.Data)
        setLoading(false)
    }

    const getEventServices = async (id: any) => {
        setLoading(true)
        const res = await GetEventServices(id)
        setEventServices(res.Data)
        setLoading(false)
    }

    const getEventAttributes = async (id: any) => {
        setLoading(true)
        const res = await GetEventAttributes(id)
        setEventAttributes(res.Data)
        setLoading(false)
    }

    const getInterviewServices = async (id: any) => {
        setLoading(true)
        const res = await GetEventServiceMapping(id)
        setInterviewServices(res.Data)
        setLoading(false)
    }

    const getRules = async (id: any) => {
        setLoading(true)
        const res = await GetRules(id)
        setRules(res.Data)
        setLoading(false)
    }
    
    const getDocumentConfigurations = async (id: any) => {
        setLoading(true)
        const res = await GetDocumentConfigurations(id)
        setDocumentConfigurations(res.Data)
        setLoading(false)
    }

    const getParentSectionOptions = async (formId: any, sectionId: any) => {
        const res = await GetParentSectionOptions(formId, sectionId)
        setParentSectionOptions(res.Data)
    }

    return {
        formFullInfo, setFormFullInfo, getFullInfoFormDefinitions, 
        interviewSections, setInterviewSections, getInterviewSections,
        globalParams, setGolbalParams, getGlobalParams,
        ruleSets, setRuleSets, getInterviewRuleSet,
        events, setEvents, getEvents,
        eventServices, setEventServices, getEventServices,
        eventAttributes, setEventAttributes, getEventAttributes,
        interviewServices, setInterviewServices, getInterviewServices,
        rules, setRules, getRules,
        documentConfigurations, setDocumentConfigurations, getDocumentConfigurations,
        parentSectionOptions, setParentSectionOptions, getParentSectionOptions
    }
}
