    import {Link} from "@inertiajs/react";
    import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
    import {useState, useEffect} from "react";


    export default  function Pagination({Links, queryParams}) {
        const [urlParams, setUrlParams] = useState([])

        useEffect(() => {
            if(Object.keys(queryParams).length > 0) {
                const paramArray = Object.entries(queryParams).map(([key, value]) => `&${key}=${value}`)
                setUrlParams(paramArray)
            } else {
                setUrlParams([])
            }
        }, [queryParams]);


        return (
            <nav className="text-center text-4xl flex items-center justify-center gap-4 mt-10">
                {Links.map((link) => (
                    <Link
                        href={link.url + urlParams.slice(1).join("")|| ""}
                        key={link.label}
                        className={`inline-block py-2 px-3 rounded-lg text-gray-300 text-xs ${link.active && "bg-gray-950"} ${!link.url ? "!text-gray-500 cursor-not-allowed" : "hover:bg-gray-950"}`}
                    >
                        {link.label === '&laquo; Previous'
                            ? <FaAngleLeft className="w-4 h-4"/>
                            : link.label === 'Next &raquo;'
                                ? <FaAngleRight className="w-4 h-4"/>
                                : link.label}
                    </Link>
                ))}
            </nav>
        );
    }
