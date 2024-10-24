export default function UserPage() {
    return (
        <>
            <div className=" bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden">
                <img src="../../public/picture/pride & prejudice.jpg" alt="book" />
                <div className="p-5 flex flex-col gap-3">
                    
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100">Name</span>
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100">Name</span>
                    </div>
                    
                    <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrapiteps">
                        Best Book Ever
                    </h2>

                    <div>
                        
                        <span className="text-xl font-bold">
                            100.000đ
                        </span>
                        
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm line-through opacity-50">
                                200.000đ
                            </span>
                            <span className="text-xs px-1.5 py-0.5 rounded-full text-white bg-green-100">
                                -10%
                            </span>
                        </div>

                    </div>

                    <span className="flex items-center mt-1">
                        <img src="../../public/picture/star.png" alt="" />
                        <img src="../../public/picture/star.png" alt="" />
                        <img src="../../public/picture/star.png" alt="" />
                        <img src="../../public/picture/star.png" alt="" />
                        <img src="../../public/picture/star.png" alt="" />
                    </span>
                    <span className="text-xs ml-2 text-gray-500">
                        100 đánh giá
                    </span>

                    <div className="mt-5 flex gap-2">
                        <button className="px-6 py-2 text-white font-medium tracking-wider transition bg-yellow-300 rounded-md hover:bg-yellow-400/90">
                            Mua ngay
                        </button>
                        <button className="flex-grow flex justify-center items-center bg-gray-300/660 hover:bg-gray-300/80 transition rounded-md ">
                            {/* <img   src="../../public/picture/heart.png" alt="add to wishlist" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                
                        <button className="flex-grow flex justify-center items-center bg-gray-300/660 hover:bg-gray-300/80 transition rounded-md ">
                            {/* <img   src="../../public/picture/eye.png" alt="add to wishlist" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}