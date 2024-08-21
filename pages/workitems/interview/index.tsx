import Layout from "components/layouts"
import InterviewPage from "components/pages/Workitems/Interview"
import InterviewProvider from "providers/dashboard/InterviewProvider"

const Interview = () => {
  return (
    <InterviewProvider>
      <Layout type="blank" pageTitle="Workitems - Interview">
        <InterviewPage />
      </Layout>
    </InterviewProvider>
  )
}

export default Interview