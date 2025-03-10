import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import { FaSortAlphaDown as AscIcon, FaSortAlphaDownAlt as DescIcon } from "react-icons/fa";
import Alert from "@/Components/Alert.jsx";
import {useEffect, useState} from "react";
import Confirmation from "@/Components/Confirmation.jsx";

export default function Index({auth, users, queryParams = null, flash}) {
    queryParams = queryParams || {}
    const searchFiledChanged = (name, value) => {
        value ? queryParams[name] = value : delete queryParams[name]
        router.get(route('user.index'), queryParams)
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
            router.get(route('user.index'), queryParams)
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
            router.get(route('user.index'), queryParams)
            console.log('Second condition')
        }
    }
    console.log(flash)

    const[currentSucces, setCurrentSucces] = useState(flash.success)
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        if(currentSucces){
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
                setCurrentSucces(null)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [currentSucces])

   const [userDelete, setUserDelete] = useState(null)

    const handleDelete = (user) => {
        setUserDelete(user)
        console.log(userDelete)
    }

    const confirmDelete = () => {
        if(userDelete) {
            router.delete(route('user.destroy',userDelete.id), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: (page) => {
                    setUserDelete(null)
                    if(page.props.success){
                        setCurrentSucces(page.props.success)
                    }
                },
                onError: (err) => {
                    console.error(err)
                    setUserDelete(null)
                }
            })
        }
    }

    const cancelDelete = () => {
        setUserDelete(null)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center" >
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Users
                    </h2>
                    <Link
                        href={route('user.create')}
                        className="bg-gray-600 py-2 px-3 text-white rounded-lg shadow hover:bg-gray-700 transition-all"
                    >
                        Add new
                    </Link>
                </div>

            }
        >
            {isVisible && currentSucces && <Alert message={currentSucces} />}
            {userDelete &&
                <Confirmation
                    handleConfirm={confirmDelete}
                    handleCancel={cancelDelete}
                    userName={userDelete.name}
                />
            }


            <Head title="Users"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/*<pre>{JSON.stringify(users, undefined, 2)}</pre>*/}
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-4"></th>
                                        <th className="px-3 py-4">
                                            <TextInput
                                                defaultValue={queryParams.name}
                                                className={`w-full`}
                                                placeholder="Search by user name..."
                                                onBlur={(e) => searchFiledChanged('name', e.target.value)}
                                                onKeyPress={(e) => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-4">
                                            <TextInput
                                                defaultValue={queryParams.email}
                                                className={`w-full`}
                                                placeholder="Search by user email..."
                                                onBlur={(e) => searchFiledChanged('email', e.target.value)}
                                                onKeyPress={(e) => onKeyPress('email', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-4"></th>
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
                                        <th onClick={(e) => sortChanged("email")} className="px-3 py-4 hover:cursor-pointer">
                                            <div className="flex items-center justify-between gap-2">
                                                Email
                                                {queryParams.sort_field === 'email'
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
                                        <th className="px-3 py-4">Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="bg-white border-b">
                                            <td className="px-3 py2">{user.id}</td>
                                            <td className="px-3 py-2">
                                                <Link
                                                >
                                                    {user.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-2">{user.created_at}</td>
                                            <td className="px-3 py-2 text-right">
                                                <Link href={route("user.edit", user.id)} className="text-blue-600 font-medium hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(user)} className="text-red-600 font-medium hover:underline mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                Links={users.meta.links}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
