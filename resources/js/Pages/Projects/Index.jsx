import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constant.js";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import { FaSortAlphaDown as AscIcon, FaSortAlphaDownAlt as DescIcon } from "react-icons/fa";
import Alert from "@/Components/Alert.jsx";
import {useEffect, useState} from "react";
import Confirmation from "@/Components/Confirmation.jsx";

export default function Index({auth, projects, queryParams = null, success}) {
    queryParams = queryParams || {}
    const searchFiledChanged = (name, value) => {
        value ? queryParams[name] = value : delete queryParams[name]
        router.get(route('project.index'), queryParams)
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
            router.get(route('project.index'), queryParams)
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
            router.get(route('project.index'), queryParams)
            console.log('Second condition')
        }
    }

    const [currentSuccess, setCurrentSuccess] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        if(success && success !== currentSuccess){
            setCurrentSuccess(success)
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
                setCurrentSuccess(null)
            }, [4000])
        }
    }, [success])

   const [projectDelete, setProjectDelete] = useState(null)

    const handleDelete = (project) => {
        setProjectDelete(project)
        console.log(projectDelete)
    }

    const confirmDelete = () => {
        if(projectDelete) {
            router.delete(route('project.destroy',projectDelete.id), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    setProjectDelete(null)
                },
                onError: (err) => {
                    console.error(err)
                    setProjectDelete(null)
                }
            })
        }
    }

    const cancelDelete = () => {
        setProjectDelete(null)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center" >
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Projects
                    </h2>
                    <Link
                        href={route('project.create')}
                        className="bg-gray-600 py-2 px-3 text-white rounded-lg shadow hover:bg-gray-700 transition-all"
                    >
                        Add new
                    </Link>
                </div>

            }
        >
            {success && isVisible &&
                <Alert message={success} />
            }
            {projectDelete &&
                <Confirmation
                    handleConfirm={confirmDelete}
                    handleCancel={cancelDelete}
                    projectName={projectDelete.name}
                />
            }


            <Head title="Projects"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/*<pre>{JSON.stringify(projects, undefined, 2)}</pre>*/}
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
                                                placeholder="Search by project name..."
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
                                            {/*    placeholder="Project owner"*/}
                                            {/*    className="w-fu"*/}
                                            {/*/>*/}
                                        </th>
                                        <th className="px-3 py-4"></th>
                                    </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th onClick={(e) => sortChanged("id")} className="px-3 py-4 hover:cursor-pointer">
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
                                        <th onClick={(e) => sortChanged("name")} className="px-3 py-4 hover:cursor-pointer">
                                            <div className="flex items-center justify-between gap-2">
                                                Name
                                                {queryParams.sort_field === 'name'
                                                && queryParams.sort_direction === 'asc'
                                                    ? <AscIcon />
                                                    : <DescIcon />
                                                }
                                            </div>
                                        </th>
                                        <th onClick={(e) => sortChanged("status")} className="px-3 py-4 hover:cursor-pointer">
                                            <div className="flex items-center justify-between gap-2">
                                                Status
                                                {queryParams.sort_field === 'status'
                                                && queryParams.sort_direction === 'asc'
                                                    ? <AscIcon />
                                                    : <DescIcon />
                                                }
                                            </div>
                                        </th>
                                        <th onClick={(e) => sortChanged("created_at")} className="px-3 py-4 hover:cursor-pointer">
                                            <div className="flex items-center justify-between gap-2">
                                                Create Date
                                                {queryParams.sort_field === 'created_at'
                                                && queryParams.sort_direction === 'asc'
                                                    ? <AscIcon />
                                                    : <DescIcon />
                                                }
                                            </div>
                                        </th>
                                        <th onClick={(e) => sortChanged("due_date")} className="px-3 py-4 hover:cursor-pointer">
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
                                    {projects.data.map((project) => (
                                        <tr key={project.id} className="bg-white border-b">
                                            <td className="px-3 py2">{project.id}</td>
                                            <td className="px-3 py2">
                                                <img src={project.image_path} alt={`image-${project.name}`} height={80} width={80} className="rounded my-3"/>
                                            </td>
                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route('project.show', project.id)}
                                                    className="hover:underline hover:text-black"
                                                >
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                            <span className={`px-3 py-1 text-white rounded ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                            </td>
                                            <td className="px-3 py-2">{project.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                            <td className="px-3 py-2 ">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 text-right">
                                                <Link href={route("project.edit", project.id)} className="text-blue-600 font-medium hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(project)} className="text-red-600 font-medium hover:underline mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                Links={projects.meta.links}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
