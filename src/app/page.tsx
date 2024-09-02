import Head from "next/head"
import { Metadata } from "next"
import HomePage from "@/components/home_page/homePage"
export const metadata:Metadata={
  title:"Roy HomePage",
  description:"Explore the best homeopathic medicines and natural remedies for holistic healing at Roy Homeopathy. Shop for quality homeopathy products to treat various ailments safely and effectively."
}
const AppPage = () => {
  return (
  
    <main>
      <section>
          <HomePage/>
      </section>
    </main>
    
  )
}

export default AppPage

