import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer>
            <section>
            <div className="footer footer-center bg-base-200 text-base-content rounded p-10">
                    <nav className="grid grid-flow-col gap-4">
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Locations</a>
                        <a className="link link-hover"></a>
                    </nav>
                    <nav>
                        <div className="grid grid-flow-col gap-4">
                        <Link href={"#"} className="">
                            <FaTwitter size={24} className=" text-accent"/>
                        </Link>
                        
                        <Link href={"linkedin.com/in/hirock-dutta-196a7a267"}>
                            <FaLinkedin size={24} className=" text-accent"/>
                        </Link>
                       
                    
                            <Link href={"https://www.facebook.com/profile.php?id=100028605347325"}>
                                <FaFacebookF size={24} className=" text-accent"/>
                            </Link>
                        
                        </div>
                    </nav>
                    <aside>
                        <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                    </aside>
                    </div>
            </section>
        </footer>
    )
}

export default Footer
