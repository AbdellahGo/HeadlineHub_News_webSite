import { useEffect } from "react"
import { container } from "../clasess"
import { ContactHeader, ContactSocial, ContactUsForm, LocationInMap } from "../components/sections"

const ContactUs = () => {

    useEffect(() => {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])

  return (
    <div className="w-full pt-20">
      <div className={container}>
        <div className="pt-40 pb-20 max-w-[900px] mx-auto ">
          <ContactHeader />
          <LocationInMap />
          <ContactUsForm/>
          <ContactSocial/>
        </div>
      </div>
    </div>
  )
}

export default ContactUs