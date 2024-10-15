import Layout from "components/layouts"
import InterviewPage from "components/pages/Workitems/Interview"
import InterviewProvider from "providers/dashboard/InterviewProvider"
import WorkitemProvider from "providers/dashboard/WorkitemProvider"

const Interview = () => {
  return (
    <InterviewProvider>
      <WorkitemProvider>
        <Layout type="blank" pageTitle="Workitems - Interview">
          <InterviewPage />
        </Layout>
      </WorkitemProvider>
    </InterviewProvider>
  )
}

export default Interview