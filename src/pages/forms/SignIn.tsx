import { FaCheck } from "react-icons/fa6";
import { container, formInputStyles, formLabelStyles } from "../../clasess"
import { FormEvent, useEffect, useRef, useState } from "react";
import { FormHead, Loader } from "../../components/shared";
import { PiEyeThin } from "react-icons/pi";
import { PiEyeSlashThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { useSignInAccount } from "../../lib/react-query/queries";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";

const SignIn = () => {
  const navigate = useNavigate()
  const { checkAuthUser, isLoading, isAuthenticated } = useAppContext()
  const { mutateAsync: signinAccount, isPending: isCreatingSession } = useSignInAccount()
  const userInputDataRef = useRef<(HTMLInputElement | null)[]>([])
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);


  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    const user = {
      email: userInputDataRef.current[0]!.value,
      password: userInputDataRef.current[1]!.value,
    }
    const session = await signinAccount(user)
    if (!session) {
      toast.warn('Login failed. Please try again.');
      return
    }
    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      navigate('/')
    } else {
      toast.warn('Login failed. Please try again.');
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback')
    if (cookieFallback || isAuthenticated) {
      navigate("/")
    }
  }, [])

  return (
    <div className={`${container} flex justify-center my-[80px]`}>
      <div className="shadow-shadow-12 bg-white dark:border-1  dark:border-hyperlink-line-color  dark:bg-dark-accent-2 max-w-[450px] w-[450px] md:p-[40px_30px] p-[25px_20px]">
        <FormHead />
        <div>
          <form className="flex flex-col gap-[15px]" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="#email" className={`${formLabelStyles}`}>Your Email Address</label>
              <input required ref={(el) => el && userInputDataRef.current.push(el)} id="email" type="email" className={`${formInputStyles}`} />
            </div>
            <div>
              <label htmlFor="#password" className={`${formLabelStyles}`}>Your Password</label>
              <div className={`${formInputStyles} relative flex items-center`}
                style={{ padding: '0' }}>
                <input minLength={8} required ref={(el) => el && userInputDataRef.current.push(el)} id="password" type={isPasswordVisible ? 'text' : 'password'} className={`duration-3 focus:outline-black focus:dark:outline-hyperlink-line-color p-[12px_20px] border-none outline-none w-full bg-transparent formInputStyles`} />
                <button type='button' className="absolute right-[10px] text-18" onClick={() => setIsPasswordVisible(prev => !prev)}>
                  {isPasswordVisible ? (
                    <PiEyeThin />
                  ) : (
                    <PiEyeSlashThin />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-y-[5px]">
              <div className="font-dmSans flex items-center gap-[5px]">
                <span className={`flex items-center justify-center w-[15px] rounded-[2px] h-[15px] duration-3
                                  ${rememberMe ? 'bg-hyperlink-line-color border-none' : 'border-1 border-flex-gray-40 dark:bg-white'}`}
                  onClick={() => setRememberMe(prev => !prev)}>
                  <FaCheck className={`text-10 ${rememberMe ? 'text-white' : 'hidden'}`} />
                </span>
                <span className="text-13 text-meta-fcolor dark:text-absolute-light">Remember me</span>
              </div>
              <a href="https://github.com/AbdellahGo" target="_blank" className="text-end flex-1 text-13 text-qlink-color dark:text-white hover:underline">Lost your password?</a>
            </div>
            <button type="submit" className="mt-10 Msm:flex-1 bg-black dark:bg-flex-gray-40 hover:bg-hyperlink-line-color duration-3 min-w-max px-40 text-white leading-[40px] font-notoSans font-semibold text-13">
              {isLoading || isCreatingSession ? (
                <Loader />
              ) : 'Log In'}
            </button>
          </form>
          <p className="font-dmSans text-14 text-qlink-color dark:text-absolute-light mt-15 text-center">
            New to HeadlineHub? {" "}
            <Link to='/sign-up' className="text-hyperlink-line-color font-bold" >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn