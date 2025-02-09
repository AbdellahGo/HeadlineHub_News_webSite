import { FormEvent } from "react"
import { toast } from "react-toastify"

const ContactUsForm = () => {
  const parentStyles = 'flex flex-col gap-[7px]'
  const labelStyles = 'font-notoSans text-13 text-qlink-color dark:text-white font-semibold'
  const inputStyles = 'bg-transparent py-12 px-20 border-1 border-flex-gray-15 font-dmSans text-qlink-color outline-none text-14 dark:text-white'
  const handleSubmiteForm = (e: FormEvent) => {
    e.preventDefault()
    toast.success('Your report has been successfully sent and will be processed shortly. Thank you for your patience.');
    const inputs = (e.target as HTMLFormElement).querySelectorAll('input, textarea');
    inputs.forEach((el) => {
      (el as HTMLInputElement | HTMLTextAreaElement).value = '';
    });
  }
  return (
    <section className="w-full mt-15">
      <h3 className="xl:text-22 text-18 font-notoSans font-bold text-qlink-color dark:text-white">Customer Support & Technical Assistance</h3>
      <p className="mt-15 font-dmSans italic text-14 text-qlink-color dark:text-white">
        We are committed to meeting the needs of our customers.
        Please note that email response times may be longer than usual.
        For faster and more efficient assistance, we recommend reaching out via phone.
        This is often the quickest and most convenient way to resolve your concerns.
      </p>
      <form className="pt-20 flex flex-col gap-20" onSubmit={handleSubmiteForm}>
        <div className={parentStyles}>
          <label htmlFor="your-name" className={labelStyles}>
            Your Name*
          </label>
          <input required id="your-name" type="text" className={inputStyles} />
        </div>
        <div className={parentStyles}>
          <label htmlFor="email-address" className={labelStyles}>
            Email Address*
          </label>
          <input required id="email-address" type="email" className={inputStyles} />
        </div>
        <div className={parentStyles}>
          <label htmlFor="subject" className={labelStyles}>
            Subject*
          </label>
          <input required id="Subject*" type="text" className={inputStyles} />
          <p className="font-dmSans text-meta-fcolor dark:text-absolute-light text-12">Summarize your concern or ask your question clearly.</p>
        </div>
        <div className={parentStyles}>
          <label htmlFor="description" className={labelStyles}>
            What would you like help with?*
          </label>
          <textarea required id="description*" rows={7} className={`${inputStyles} resize-none`} />
          <p className="font-dmSans text-meta-fcolor dark:text-absolute-light text-12">Give a quick but meaningful overview.</p>
        </div>
        <button className="border-none outline-none duration-3 w-fit py-10 px-40 mt-10 text-16 font-semibold text-white bg-dark-accent hover:bg-hyperlink-line-color dark:hover:text-qlink-color dark:bg-hyperlink-line-color dark:hover:bg-white">
          Submit
        </button>
      </form>
    </section>
  )
}

export default ContactUsForm