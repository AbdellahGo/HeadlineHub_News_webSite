import { Link } from "react-router"
import { LogoDarkMode, LogoLightMode } from "../../assets"
import { container } from "../../clasess"
import { useAppContext } from "../../context/AppContext"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

import { FaLinkedin } from "react-icons/fa6";
import { FaRedditSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { footerlinks } from "../../lib/constants";
import { FaGithubSquare } from "react-icons/fa";

import { FormEvent, useRef, useState } from "react";

import { toast } from 'react-toastify';

const Footer = () => {
  const EmailInputRef = useRef<HTMLInputElement | null>(null)
  const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);
  const { isDarkMode } = useAppContext()
  const mySocialMedia = [
    {
      link: 'https://www.youtube.com/@INFINITY_HUB_AGX',
      icon: <FaYoutube />
    },
    {
      link: 'https://www.linkedin.com/in/abdellah-gou-93b5a430a/',
      icon: <FaLinkedin />
    },
    {
      link: 'https://github.com/AbdellahGo',
      icon: <FaGithubSquare />
    },
    {
      link: 'https://www.reddit.com/user/Helpful-Cap-8092/',
      icon: <FaRedditSquare />
    },
  ]

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    if (!EmailInputRef.current?.value) {
      toast.warn("Please enter your email to subscribe.");
      return
    }
    if (!acceptTermsConditions) {
      toast.warn("Please accept the terms and conditions to subscribe.");
      return
    }
    EmailInputRef.current.value = ''
    toast.success("Your email has been sent successfully.");

  }

  return (
    <footer className="xl:mt-50 mt-40 border-t-1 border-flex-gray-30">
      <div className={`${container}`}>
        <div className="flex lg:flex-row flex-col xl:gap-[180px] lg:gap-[120px] gap-[20px] my-10">
          <div className="lg:w-4/12 w-full flex flex-col gap-20 py-10">
            <Link to='/' className="relative group overflow-hidden transition duration-3 hover:opacity-[.66]">
              <img src={isDarkMode ? LogoDarkMode : LogoLightMode} alt="logo" className="max-w-[190px] w-[190px] " />
            </Link>
            <p className="font-dmSans text-[13px] text-qlink-color dark:text-white leading-[22px]">
              <strong>Your Go-To for Breaking News:</strong> Dive into real-time updates and live stories that matter,
              from politics and tech to entertainment and beyond.
              Stay informed with the trusted source that keeps you connected 24/7.
            </p>
            <ul className="flex items-center gap-[5px]">
              {mySocialMedia.map(({ icon, link }) => (
                <li key={link}>
                  <a href={link} target="_blank" className="block border-1 border-[#888] text-[#888] rounded-[4px] p-[5px] text-18 duration-3 
                  hover:bg-hyperlink-line-color hover:text-white hover:border-hyperlink-line-color">
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-8/12 w-full flex flex-col gap-20 py-20">
            <h2 className="flex items-center gap-[4px] text-hyperlink-line-color dark:text-white font-notoSans font-semibold text-[15px] leading-[15px]">
            Essential Links
              <MdOutlineKeyboardArrowRight size={17} />
            </h2>
            <ul className="flex flex-wrap items-center gap-15">
              {footerlinks.map(({ label, link }, i) => (
                <li key={link} className="pr-15 relative flex items-center text-qlink-color dark:text-white">
                  <Link to={link} className="block font-notoSans font-medium text-14 leading-[24px] duration-0 hover:opacity-[.8] ">
                    {label}
                  </Link>
                  <span className={`absolute right-0 ${footerlinks.length === i + 1 && 'hidden'}`}>/</span>
                </li>
              ))}
            </ul>
            <p className="mb-[-10px]  text-13 leading-[22px] text-qlink-color dark:text-white">
              Subscribe Now for Real-time Updates on the Latest Stories!
            </p>
            <div>
              <form onSubmit={handleSubmitForm}>
                <div className="w-full flex sm:flex-row flex-col gap-8">
                  <input ref={EmailInputRef} type="email" placeholder="Your email address" className="outline-none border-none flex-1 text-14 leading-[24px] text-qlink-color placeholder:text-qlink-color placeholder:dark:text-white dark:text-white bg-flex-gray-15 dark:bg-flex-gray-30 block py-12 px-20" />
                  <button type="submit" className="font-notoSans Msm:flex-1 bg-black dark:bg-flex-gray-40 hover:bg-hyperlink-line-color duration-3 min-w-max px-40 text-white leading-[40px] font-semibold text-13">Subscribe Now</button>
                </div>
                <div className="mt-10 flex items-center gap-[5px]">
                  <span className={`flex items-center justify-center w-[15px] rounded-[2px] h-[15px] duration-3
                    ${acceptTermsConditions ? 'bg-hyperlink-line-color border-none' : 'border-1 border-flex-gray-40 dark:bg-white'}`}
                    onClick={() => setAcceptTermsConditions(prev => !prev)}>
                    <FaCheck className={`text-10 ${acceptTermsConditions ? 'text-white' : 'hidden'}`} />
                  </span>
                  <p className="text-meta-fcolor dark:text-absolute-light text-13 leading-[22px]">I have read and agree to the terms & conditions</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-1 border-flex-gray-30">
        <div className='mt-10 pb-20 text-center'>
          <p className="dark:text-white font-dmSans text-qlink-color text-[13px] leading-[22px] opacity-[0.7]">
            &copy; 2025{" "}
            <a target="_blank" href="https://github.com/AbdellahGo/HeadlineHub_News_webSite" className="inline-block text-hyperlink-line-color font-bold">HeadlineHub</a>
            . Developed by {" "}
            <a  target="_blank" href={'https://github.com/AbdellahGo'} className="inline-block text-hyperlink-line-color font-bold">AbdellahGX</a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer