import Layout from "components/layouts"
import LogInPage from "components/pages/LogIn"
import LogInProvider from "providers/auth/LogInProvider"

const Home = () => {
  return (
    <Layout type="base" pageTitle="LogIn">
      <LogInProvider>
        <LogInPage />
      </LogInProvider>
    </Layout>
  )
}

export default Home