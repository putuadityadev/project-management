import React from 'react';

const Confirmation = ({handleConfirm, handleCancel, projectName}) => {
    return (
        <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 group select-none w-[250px] flex flex-col p-4 items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
            <div className>
                <div className="text-center p-3 flex-auto justify-center">
                    <svg fill="currentColor" viewBox="0 0 20 20" className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fillRule="evenodd" />
                    </svg>
                    <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
                    <p className="font-bold text-sm text-gray-500 px-2">
                        To Delete <span className="text-red-500">{projectName}</span> ?
                    </p>
                </div>
                <div className="p-2 mt-2 text-center space-x-2 md:block">
                    <button className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-lg hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                    onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-lg transition ease-in duration-300" onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
