import Header from "../../Components/Header";
import { Hero } from "../../Components/Hero";
import { Footer } from "../../Components/Footer";
import { HowItWorks } from "../../HotItWorks";
import { PrivacyFeatures } from "../../Components/PrivacyFeatures";
import { PrivacyTech } from "../../Components/Privacy";

export function Home() {
  return (
    <>
      <Header button={true} />
      <Hero/>
      <HowItWorks/>
      <PrivacyFeatures/>
      <PrivacyTech/>
      <Footer/>

      </>
  )
}
