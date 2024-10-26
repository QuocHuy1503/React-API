
let links = [
    {name: "HOME", href: "/"},
    {name: "USER PAGE", href: "/card"},
    {name: "BOOKS", href: "/books"},
    {name: "USERS", href: "/users"},
    {name: "LOGIN", href: "/login"},
    {name: "LOGOUT", href: "/logout"},
];

export function navBar() {
   
    return (
    <>
        <div className="shadow-md w-full fixed top-0 left-0">
            <div className="md:flex items-center justify-between bg-white py-4">
                <div className=" text-gray-800 font-bold text-2xl cursor-pointer flex items-center font-serif">
                    <span className="text-6xl text-indigo-600 mr-1 pt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                    </span>
                    Designer
                </div>
                <div className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                    <ul className="md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 translate-all duration-500 ease-in">
                        {links.map((link) => (
                            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-40">
                                <a href={link.href} className="text-gray-800 hover:text-gray-500 duration-500">{link.name}</a>
                            </li>
                        ))}
                        <button className="bg-indigo-600 text-white font-bold py-2 px-4 border-b-4 hover:border-indigo-400 rounded md:ml-8 duration-500">
                            Getting Started
                        </button>
                    </ul>
            </div>
        </div>
    </>
    )
}