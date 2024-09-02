import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";
import { Montserrat } from "next/font/google";
import {Toaster} from "react-hot-toast"
const montserrat = Montserrat({
  weight:["400","400"],
  subsets:["latin"]
})


export const metadata: Metadata = {
  title: "Roy Homeopathy",
  description: "homeopathy, homeopathic medicine, natural remedies, holistic healing, alternative medicine, homeopathic treatments, natural health, homeopathy online, safe medicines, homeopathy shop",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
       
      <Toaster
      
      toastOptions={{
        style:{
          background:"rgb(0, 155, 255)",
          color:"white"
        }}}
      />
       
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
