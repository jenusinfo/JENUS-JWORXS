import DocumentConfigurationsDataPanel from "components/Settings/FormDefinitions/Details/DocumentConfigurations/DataPanel"
import HeaderPanel from "components/Settings/FormDefinitions/Details/HeaderPanel"
import QuestionsDataPanel from "components/Settings/FormDefinitions/Details/Questions/DataPanel"
import RulesDataPanel from "components/Settings/FormDefinitions/Details/Rules/DataPanel"
import RuleSetsDataPanel from "components/Settings/FormDefinitions/Details/RuleSets/DataPanel"
import SectionsDataPanel from "components/Settings/FormDefinitions/Details/Sections/DataPanel"
import ServicesDataPanel from "components/Settings/FormDefinitions/Details/Services/DataPanel"
import DocumentConfigurationProvider from "providers/settings/FormDefinitions/Details/DocumentConfigurationProvider"
import QuestionProvider from "providers/settings/FormDefinitions/Details/QuestionProvider"
import RuleProvider from "providers/settings/FormDefinitions/Details/RuleProvider"
import RuleSetProvider from "providers/settings/FormDefinitions/Details/RuleSetProvider"
import SectionProvider from "providers/settings/FormDefinitions/Details/SectionProvider"
import ServiceProvider from "providers/settings/FormDefinitions/Details/ServiceProvider"
import FormDefinitionsDetailProvider from "providers/settings/FormDefinitions/FormDefinitionsDetailProvider"

const FormDefinitionsDetailPage = () => {
	return (
		<div className="py-8">
            <FormDefinitionsDetailProvider>
                <div className="space-y-6">
					<HeaderPanel />
                    <SectionProvider>
    					<SectionsDataPanel />
                    </SectionProvider>
                    <QuestionProvider>
                        <QuestionsDataPanel />
                    </QuestionProvider>
                    <ServiceProvider>
                        <ServicesDataPanel />
                    </ServiceProvider>
                    <RuleProvider>
                        <RulesDataPanel />
                    </RuleProvider>
                    <RuleSetProvider>
                        <RuleSetsDataPanel />
                    </RuleSetProvider>
                    <DocumentConfigurationProvider>
                        <DocumentConfigurationsDataPanel />
                    </DocumentConfigurationProvider>
                </div>
            </FormDefinitionsDetailProvider>
        </div>
	)
}

export default FormDefinitionsDetailPage