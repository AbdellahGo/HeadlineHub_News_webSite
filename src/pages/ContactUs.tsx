import { container } from "../clasess"
import { ContactHeader, ContactUsForm, LocationInMap } from "../components/sections"

const ContactUs = () => {
  return (
    <div className="w-full">
      <div className={container}>
        <div className="pt-40 pb-20 max-w-[900px] mx-auto ">
          <ContactHeader />
          <LocationInMap />
          <ContactUsForm/>
        </div>
      </div>
    </div>
  )
}

export default ContactUs