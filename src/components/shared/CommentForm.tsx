import { FormEvent, useRef, useState } from "react";
import { FaCheck, FaRegComment } from "react-icons/fa6";
import { toast } from "react-toastify";



const commentInputs = [
    {
        placeholder: 'Your name',
        type: 'text'
    },
    {
        placeholder: 'Your email',
        type: 'email'
    },
    {
        placeholder: 'Your website',
        type: 'text'
    },
]

const CommentForm = () => {
    const [userDataComment, setUserDataComment] = useState<string[]>(
        JSON.parse(localStorage.getItem('userDataComment') || '[]')
      );
    const commentinputRef = useRef<HTMLTextAreaElement | null>(null)
    const userinputsDataRef = useRef<(HTMLInputElement | null)[]>([])
    const [saveUserData, setSaveUserData] = useState(false);
    const hanldepostComment = (e: FormEvent) => {
        e.preventDefault()
        let userInputs = userinputsDataRef.current
        const useData = userInputs.map((el) => el?.value || '')
        
        if (saveUserData) {
            localStorage.setItem('userDataComment', JSON.stringify(useData))
            setUserDataComment(useData)
        }

        toast.success('Your comment has been successfully posted.')
        commentinputRef.current!.value = ''
        userInputs.forEach((el) => el!.value = '')
    } 
    

    return (
        <div className="md:mt-[35px] mt-[25px] relative md:pt-[37px] pt-[27px] md:pb-[35px] pb-[25px]">
            <span className="absolute z-10 top-0 left-0 right-0 overflow-hidden h-[3px] bg-repeat-x"
                style={{ backgroundImage: '-webkit-linear-gradient(right,#88888826 20%,transparent 21%,transparent 100%)', backgroundPosition: '0 0', backgroundSize: '5px' }} />
            <h3 className="flex items-center gap-[5px] font-notoSans font-bold text-20 text-qlink-color dark:text-white">
                <FaRegComment />
                Leave a Comment
            </h3>
            <p className="mt-15 font-dmSans text-13 text-qlink-color italic dark:text-white">
                Your email address will not be published. Required fields are marked {" "}
                <span className="text-[#ff4545]">*</span>
            </p>
            <form className="mt-15" onSubmit={hanldepostComment}>
                <textarea required ref={commentinputRef} placeholder="Leave a Comment"
                    className="block w-full resize-none h-[200px] md:px-20 px-15 md:py-15 py-7 border-none outline-none
                    dark:placeholder:text-white placeholder:text-qlink-color text-qlink-color text-14 font-dmSans
                    dark:text-white bg-flex-gray-7">
                </textarea>
                <div className="mt-20 grid grid-cols-3 gap-20">
                    {commentInputs.map(({ placeholder, type }, i) => (
                        <input required ref={(el) => userinputsDataRef.current.push(el)} key={placeholder} type={type} 
                        value={userDataComment[i]}
                         placeholder={placeholder} className="font-dmSans py-12 px-20 bg-flex-gray-7 border-none outline-none dark:text-white text-qlink-color dark:placeholder:text-white placeholder:text-qlink-color text-14 " />
                    ))}
                </div>
                <div className="mt-20">
                    <div>
                        <span className={`inline-flex mr-[5px] align-middle items-center justify-center w-[15px] rounded-[2px] h-[15px] duration-3
                                              ${saveUserData ? 'bg-hyperlink-line-color border-none' : 'border-1 border-flex-gray-40 dark:bg-white'}`}
                            onClick={() => setSaveUserData(prev => !prev)}>
                            <FaCheck className={`text-10 ${saveUserData ? 'text-white' : 'hidden'}`} />
                        </span>
                        <p className="inline text-qlink-color dark:text-absolute-light font-dmSans text-13 leading-[22px]">Save my name, email, and website in this browser for the next time I comment.</p>
                    </div>
                    <button
                        className="font-notoSans text-14 font-semibold py-12 mt-5 px-40 text-white bg-black
                     hover:bg-hyperlink-line-color dark:bg-hyperlink-line-color dark:hover:bg-white dark:hover:text-qlink-color duration-3">
                        Post Comment
                    </button>

                </div>
            </form>
        </div>
    )
}

export default CommentForm