import { Header } from "../../Components/Header";
import { Hero } from "../../Components/Hero";
import { Footer } from "../../Components/Footer";
import { HowItWorks } from "../../HotItWorks";
import { PrivacyFeatures } from "../../Components/PrivacyFeatures";

export function Home() {
  return (
    <>
      <Header />
      <Hero/>
      <HowItWorks/>
      <PrivacyFeatures/>
      <Footer/>

      </>
  )
}
