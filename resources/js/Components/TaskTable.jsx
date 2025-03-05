import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {FaSortAlphaDown as AscIcon, FaSortAlphaDownAlt as DescIcon} from "react-icons/fa";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constant.js";
import {Link} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import Show from "@/Pages/Task/Show.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function TaskTable ({tasks, queryParams, onKeyPress, sortChanged, searchFiledChanged}) {
    const [selectedTask, setSelectedTask] = useState(null)
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        async function getTask() {
            if (selectedTask) {
                try {
                    const response = await axios.get(route('Task.show', { Task: selectedTask }));
                    setTaskData(response.data.task);
                } catch (error) {
                    console.error("Error fetching task:", error);
                }
            } else {
                setTaskData(null);
            }
        }
        getTask();
    }, [selectedTask]);
    const handleClose = () => {
        setIsPanelOpen(false)
        setSelectedTask(null)
    }

    const handleSelectTask = (id) => {
        setSelectedTask(id)
        setIsPanelOpen(true)
    }
    return (
        <div className="flex mx-auto flex-col relative overflow-hidden">
            {isPanelOpen && selectedTask && taskData && <Show onClose={handleClose} taskData={taskData}/>}
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-4"></th>
                        <th className="px-3 py-4"></th>
                        <th className="px-3 py-4">
                            <TextInput
                                defaultValue={queryParams.name}
                                className={`w-full`}
                                placeholder="Search by task name..."
                                onBlur={(e) => searchFiledChanged('name', e.target.value)}
                                onKeyPress={(e) => onKeyPress('name', e)}
                            />
                        </th>
                        <th className="px-3 py-4">
                            <SelectInput
                                defaultValue={queryParams.status}
                                onChange={(e) => searchFiledChanged('status', e.target.value)}
                            >
                                <option value="">Select by</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </SelectInput>
                        </th>
                        <th className="px-3 py-4"></th>
                        <th className="px-3 py-4"></th>
                        <th className="px-3 py-4">
                            {/*<TextInput*/}
                            {/*    placeholder="Task owner"*/}
                            {/*    className="w-fu"*/}
                            {/*/>*/}
                        </th>
                        <th className="px-3 py-4"></th>
                    </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th onClick={() => sortChanged("id")} className="px-3 py-4 hover:cursor-pointer">
                            <div className="flex items-center justify-between gap-2">
                                ID
                                {queryParams.sort_field === 'id'
                                && queryParams.sort_direction === 'asc'
                                    ? <AscIcon />
                                    : <DescIcon />
                                }
                            </div>
                        </th>
                        <th className="px-3 py-4">Image</th>
                        <th onClick={() => sortChanged("name")} className="px-3 py-4 hover:cursor-pointer">
                            <div className="flex items-center justify-between gap-2">
                                Name
                                {queryParams.sort_field === 'name'
                                && queryParams.sort_direction === 'asc'
                                    ? <AscIcon />
                                    : <DescIcon />
                                }
                            </div>
                        </th>
                        <th onClick={() => sortChanged("status")} className="px-3 py-4 hover:cursor-pointer">
                            <div className="flex items-center justify-between gap-2">
                                Status
                                {queryParams.sort_field === 'status'
                                && queryParams.sort_direction === 'asc'
                                    ? <AscIcon />
                                    : <DescIcon />
                                }
                            </div>
                        </th>
                        <th onClick={() => sortChanged("created_at")} className="px-3 py-4 hover:cursor-pointer">
                            <div className="flex items-center justify-between gap-2">
                                Create Date
                                {queryParams.sort_field === 'created_at'
                                && queryParams.sort_direction === 'asc'
                                    ? <AscIcon />
                                    : <DescIcon />
                                }
                            </div>
                        </th>
                        <th onClick={() => sortChanged("due_date")} className="px-3 py-4 hover:cursor-pointer">
                            <div className="flex items-center justify-between gap-2">
                                Due Date
                                {queryParams.sort_field === 'due_date'
                                && queryParams.sort_direction === 'asc'
                                    ? <AscIcon />
                                    : <DescIcon />
                                }
                            </div>
                        </th>
                        <th className="px-3 py-4 ">Created By</th>
                        <th className="px-3 py-4">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tasks.data.map((task) => (
                        <tr key={task.id} className="bg-white border-b">
                            <td className="px-3 py2">{task.id}</td>
                            <td className="px-3 py2">
                                <img src={task.image_path} alt={`image-${task.name}`} height={80} width={80} className="rounded my-3"/>
                            </td>
                            <td className="px-3 py-2">
                                <button onClick={() => handleSelectTask(task.id)} className="hover:text-black hover:underline">
                                    {task.name}
                                </button>
                            </td>
                            <td className="px-3 py-2">
                                <span className={`px-3 py-1 text-white rounded ${PROJECT_STATUS_CLASS_MAP[task.status]}`}>
                                    {PROJECT_STATUS_TEXT_MAP[task.status]}
                                </span>
                            </td>
                            <td className="px-3 py-2">{task.created_at}</td>
                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                            <td className="px-3 py-2 ">{task.createdBy.name}</td>
                            <td className="px-3 py-2 text-right">
                                <Link href={route("Task.edit", task.id)} className="text-blue-600 font-medium hover:underline mx-1">
                                    Edit
                                </Link>
                                <Link href={route("Task.destroy", task.id)} className="text-red-600 font-medium hover:underline mx-1">
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                Links={tasks.meta.links}
                queryParams={queryParams}
            />

        </div>
    );
}
