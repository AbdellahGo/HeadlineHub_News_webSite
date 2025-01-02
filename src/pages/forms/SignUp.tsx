import { FormEvent, useEffect, useRef, useState } from "react";
import { container, formInputStyles, formLabelStyles } from "../../clasess"
import { FormHead, Loader } from "../../components/shared";
import { FaCheck } from "react-icons/fa6";
import { PiEyeThin } from "react-icons/pi";
import { PiEyeSlashThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { INewUser } from "../../types";
import { useCreateUserAccount, useSignInAccount } from "../../lib/react-query/queries";
import { useAppContext } from "../../context/AppContext";


const SignUp = () => {
  const navigate = useNavigate()
  const { checkAuthUser, isLoading, isAuthenticated } = useAppContext()
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const { mutateAsync: signinAccount, isPending: isSignInUser } = useSignInAccount()
  const userInputDataRef = useRef<(HTMLInputElement | null)[]>([])
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    if (!acceptTermsConditions) {
      toast.warn('Please accept the terms and conditions to continue.')
      return
    }
    const user: INewUser = {
      name: userInputDataRef.current[0]!.value,
      username: userInputDataRef.current[1]!.value,
      email: userInputDataRef.current[2]!.value,
      password: userInputDataRef.current[3]!.value
    }
    try {
      const newUser = await createUserAccount(user)
      if (!newUser) {
        toast.warn("Sign up failed. Please try again.")
        return;
      }
      const session = await signinAccount({
        email: user.email,
        password: user.password,
      })
      if (!session) {
        toast.warn("Something went wrong. Please login your new account");
        navigate("/sign-in");
        return;
      }
      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        navigate('/')
      } else {
        toast.warn("Login failed. Please try again.");
        return false
      }
    } catch (error) {
      console.log(error);
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
      <div className="shadow-shadow-12 bg-white dark:border-1 dark:border-flex-gray-15 dark:bg-dark-accent-2 max-w-[650px] w-[650px] md:p-[40px_30px] p-[25px_20px]">
        <FormHead />
        <div>
          <form className="flex flex-col gap-[15px]" onSubmit={handleSignUp}>
            <div className="grid sm:grid-cols-2 gap-[15px]">
              <div>
                <label htmlFor="#name" className={`${formLabelStyles}`}>name</label>
                <input required ref={(el) => el && userInputDataRef.current.push(el)} id="name" type="text" className={`${formInputStyles}`} />
              </div>
              <div>
                <label htmlFor="#username" className={`${formLabelStyles}`}>Username</label>
                <input required ref={(el) => el && userInputDataRef.current.push(el)} id="username" type="text" className={`${formInputStyles}`} />
              </div>
              <div>
                <label htmlFor="#email" className={`${formLabelStyles}`}>Email Address</label>
                <input required ref={(el) => el && userInputDataRef.current.push(el)} id="email" type="email" className={`${formInputStyles}`} />
              </div>
              <div>
                <label htmlFor="#password" className={`${formLabelStyles}`}>Password</label>
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
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                <span className={`flex items-center justify-center w-[15px] rounded-[2px] h-[15px] duration-3
                                  ${acceptTermsConditions ? 'bg-hyperlink-line-color border-none' : 'border-1 border-flex-gray-40 dark:bg-white'}`}
                  onClick={() => setAcceptTermsConditions(prev => !prev)}>
                  <FaCheck className={`text-10 ${acceptTermsConditions ? 'text-white' : 'hidden'}`} />
                </span>
                <p className="text-meta-fcolor dark:text-absolute-light text-13 leading-[22px]">I have read and agree to the terms & conditions</p>
              </div>
            </div>
            <button type="submit" className="mt-10 Msm:flex-1 bg-black dark:bg-flex-gray-40 hover:bg-hyperlink-line-color duration-3 min-w-max px-40 text-white leading-[40px] font-notoSans font-semibold text-13">
              {isLoading || isCreatingAccount || isSignInUser ? (
                <Loader />
              ) : 'Sign Up'}
            </button>
          </form>
          <p className="font-dmSans text-14 text-qlink-color dark:text-absolute-light mt-15 text-center">
            Already have an account? {" "}
            <Link to='/sign-in' className="text-hyperlink-line-color font-bold" >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp