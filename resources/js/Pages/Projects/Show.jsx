import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constant.js";
import { SlCalender } from "react-icons/sl";
import { GoClock } from "react-icons/go";
import { HiOutlineStatusOnline } from "react-icons/hi";

export default function Show({auth, project}) {
    console.log(project)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`Project "${project.name}"`}
                </h2>
            }
        >
            <Head title={`Project "${project.name}"`}/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-1/2 rounded-lg overflow-hidden">
                                <img src={project.image_path} alt={`image ${project.name}`}/>
                            </div>
                            <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-1/2">
                                <h1 className="font-bold text-2xl sm:text-4xl sm:mb-1">{project.name}</h1>
                                <div className="grid grid-cols-2 w-fit sm:gap-y-1">
                                    <div className="flex items-center gap-3">
                                        <HiOutlineStatusOnline className="w-4 h-4 opacity-60"/>
                                        <h1 className="text-gray-500 sm:text-lg">Status: </h1>
                                    </div>
                                    <h2 className={`px-3 text-xs sm:text-sm py-1 w-fit text-white rounded ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <SlCalender className="w-4 h-4 opacity-60"/>
                                        <h1 className="text-gray-500 sm:text-lg">Due date: </h1>
                                    </div>
                                    <h2 className="sm:text-lg">{project.due_date}</h2>
                                    <div className="flex items-center gap-3">
                                        <GoClock className="w-4 h-4 opacity-60"/>
                                        <h1 className="text-gray-500 sm:text-lg">Time: </h1>
                                    </div>
                                    <h2 className="sm:text-lg">{project.clock_due_date}</h2>
                                </div>
                                <div>
                                    <h1 className="text-gray-500 sm:text-lg">Description: </h1>
                                    <p className="text-gray-500 sm:text-lg">
                                        {project.description}
                                    </p>
                                    <h1 className="text-gray-500 mt-5 sm:text-lg">Created at: </h1>
                                    <h2 className="sm:text-lg">{project.created_at}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col sm:flex-row gap-6">
                            Tasks
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
