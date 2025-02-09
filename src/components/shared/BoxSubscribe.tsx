import { FormEvent, useRef, useState } from "react";
import { HNHLogo } from "../../assets"
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

const BoxSubscribe = () => {
  const inputRef = useRef<null | HTMLInputElement>(null)
    const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);
  

    const handleSubmitForm = (e: FormEvent) => {
      e.preventDefault()
      if (acceptTermsConditions) {
        toast.success('Thank you for joining our newsletter.')
        inputRef.current!.value = ''
      }else {
        toast.warn('Please accept our terms and conditions before joining our newsletter.')
      }

    }

  return (
    <div className="p-20 bg-bg-side-2 dark:bg-flex-gray-15 flex flex-col">
      <img src={HNHLogo} alt="logo" className="w-[50px]" />
      <h2 className="font-notoSans text-qlink-color mt-15 dark:text-white text-[25px] font-bold">Join Our Newsletter</h2>
      <p className="font-dmSans text-14 text-qlink-color mt-10 dark:text-white">Subscribe to our newsletter to get our newest articles instantly!</p>
      <form className="mt-15" onSubmit={handleSubmitForm}>
        <input ref={inputRef} required type="email" placeholder="Your email address" className="dark:placeholder:text-white placeholder:text-qlink-color border-none outline-none font-dmSans text-14 py-12 px-20 text-qlink-color bg-white dark:bg-mc-input-bg w-full dark:text-white" />
        <button className="font-notoSans text-14 font-semibold py-12 mt-5 px-40 text-white bg-black hover:bg-hyperlink-line-color dark:bg-hyperlink-line-color dark:hover:bg-white dark:hover:text-qlink-color duration-3">Join Up Now</button>
      </form>
      <div className="mt-10 gap-[5px]">
        <span className={`inline-flex mr-[5px] align-middle items-center justify-center w-[15px] rounded-[2px] h-[15px] duration-3
                          ${acceptTermsConditions ? 'bg-hyperlink-line-color border-none' : 'border-1 border-flex-gray-40 dark:bg-white'}`}
          onClick={() => setAcceptTermsConditions(prev => !prev)}>
          <FaCheck className={`text-10 ${acceptTermsConditions ? 'text-white' : 'hidden'}`} />
        </span>
        <p className="inline text-meta-fcolor dark:text-absolute-light font-dmSans text-13 leading-[22px]">I have read and agree to the terms & conditions</p>
      </div>
    </div>
  )
}

export default BoxSubscribe 