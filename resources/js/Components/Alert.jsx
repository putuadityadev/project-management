
const ALert = ({message}) => {
    return (
        <div className="flex flex-col gap-2 w-64 text-[10px] sm:text-xs z-50 fixed top-8 right-1/2 translate-x-1/2 animate-fade-in-out">
            <div className="succsess-alert cursor-default flex items-center justify-between w-full py-3 h-fit rounded-lg bg-emerald-600 px-4">
                <div className="flex gap-2">
                    <div className="text-white bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold">Succes</p>
                        <p className="text-white">{message}</p>
                    </div>
                </div>
                {/*<button className="text-white hover:bg-white/5 p-1 rounded-md transition-colors ease-linear">*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">*/}
                {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />*/}
                {/*    </svg>*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default ALert;
