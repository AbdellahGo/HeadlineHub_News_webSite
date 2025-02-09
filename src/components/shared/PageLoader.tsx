import { useEffect } from "react";

const PageLoader = () => {
    useEffect(() => {
        // Disable scrolling when loader appears
        document.body.style.overflow = "hidden";
    
        // Re-enable scrolling when component unmounts
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);
      
    return (
        <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-solid-white">
            <div className="page-loader"></div>
        </div>
    )
}

export default PageLoader