import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import {USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP} from "@/constant.js";
import { SlCalender } from "react-icons/sl";
import { GoClock } from "react-icons/go";
import { HiOutlineStatusOnline } from "react-icons/hi";
import TaskTable from "@/Components/TaskTable.jsx";

export default function Show({auth, user, tasks, queryParams}) {
    queryParams = queryParams || {}
    const searchFiledChanged = (name, value) => {
        value ? queryParams[name] = value : delete queryParams[name]
        router.get(route('user.show', user.id), queryParams)
        console.log(queryParams)
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFiledChanged(name, e.target.value)
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            queryParams.sort_direction === 'asc'
                ? queryParams.sort_direction = 'desc'
                : queryParams.sort_direction = 'asc'
            router.get(route('Task.index'), queryParams)
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
            router.get(route('Task.index'), queryParams)
            console.log('Second condition')
        }
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`User "${user.name}"`}
                </h2>
            }
        >
            <Head title={`User (${user.id})`}/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-1/2 h-96 rounded-lg overflow-hidden">
                                <img src={user.image_path} alt={`image ${user.name}`} className="w-full"/>
                            </div>
                            <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-1/2">
                                <h1 className="font-bold text-2xl sm:text-4xl sm:mb-1">{user.name}</h1>
                                <div className="grid grid-cols-2 w-fit sm:gap-y-1">
                                    <div className="flex items-center gap-3">
                                        <HiOutlineStatusOnline className="w-4 h-4 opacity-60"/>
                                        <h1 className="text-gray-500 sm:text-lg">Status: </h1>
                                    </div>
                                    <h2 className={`px-3 text-xs sm:text-sm py-1 w-fit text-white rounded ${USER_STATUS_CLASS_MAP[user.status]}`}>
                                                {USER_STATUS_TEXT_MAP[user.status]}
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <SlCalender className="w-4 h-4 opacity-60"/>
                                        <h1 className="text-gray-500 sm:text-lg">Due date: </h1>
                                    </div>
                                    <h2 className="sm:text-lg">{user.due_date}</h2>
                                    <div className="flex items-center gap-3">
                                        <GoClock className="w-4 h-4 opacity-60"/>
                                        <h1 className="text-gray-500 sm:text-lg">Time: </h1>
                                    </div>
                                    <h2 className="sm:text-lg">{user.clock_due_date}</h2>
                                </div>
                                <div>
                                    <h1 className="text-gray-500 sm:text-lg">Description: </h1>
                                    <p className="text-gray-500 sm:text-lg">
                                        {user.description}
                                    </p>
                                    <h1 className="text-gray-500 mt-5 sm:text-lg">Created at: </h1>
                                    <h2 className="sm:text-lg">{user.created_at}</h2>
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
                            <TaskTable
                                tasks={tasks}
                                queryParams={queryParams}
                                sortChanged={sortChanged}
                                onKeyPress={onKeyPress}
                                searchFiledChanged={searchFiledChanged}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
