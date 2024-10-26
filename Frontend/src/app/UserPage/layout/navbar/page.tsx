let links = [
    {name: "HOME", href: "/"},
    {name: "USER PAGE", href: "/card"},
    {name: "BOOKS", href: "/books"},
    {name: "USERS", href: "/users"},
    {name: "LOGIN", href: "/login"},
    {name: "LOGOUT", href: "/logout"},
];
export default function navBar() {
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
                <ul className="md:flex md:items-center ">
                    {links.map((link) => (
                        <li key={link.name} className="md:ml-8 text-xl">
                            <a href={link.href} className="text-gray-800 hover:text-gray-500 duration-500">{link.name}</a>
                        </li>
                    ))}
                    <button className="bg-indigo text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded md:ml-8 hover:*:text-indigo">
                        Getting Started
                    </button>
                    
                </ul>

            </div>
        </div>
    </>
    )
}