import Image from "next/image"
export function heroPage(){
    return (
        <>
            <div className="container flex flex-wrap items-center justify-center mx-auto mt-24 md:px-12 md:flex-row pt-32">  {/* Changed mt-10 to mt-24 */}
                <div className="mb-14 lg:mb:-0 md:w-1/2">
                    <h1 className="max-w-xl text-[7.9rem] leading-none text-gray-900 font-extrabold font-sans text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">
                        A small business is only as good as its tools
                    </h1>
                    <p className="max-w-xl text-center text-gray-500 lg:text-left lg:max-w-md">
                        A small business is only as good as its tools
                    </p>
                    <div className="flex justify-center mt-14 lg:justify-start">
                        <button type="button" className="text-white bg-indigo-600  font-medium rounded-lg text-center px-5 py-4 mr-2 ">
                            Learn more
                        </button>
                        <button type="button" className="text-white bg-indigo-600  font-medium rounded-lg text-center px-5 py-4 mr-2 ">
                            Learn more
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/12">
                    <Image src="/picture/heropage.jpg" alt="hero" width={200} height={100} />
                </div>
            </div>
        </>
    )
}