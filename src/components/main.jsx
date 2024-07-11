import FeaturesSection from "./Feature"
import Footer from "./Footer"
import Header from "./header"
import MainSection from "./MainSection"



const Main = () => {
  return (
    <div className="flex-grow">
        <Header />
        <MainSection />
        <FeaturesSection />
        <Footer />
    </div>
  )
}

export default Main