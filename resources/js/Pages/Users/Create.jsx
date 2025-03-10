import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";




export default function Create({ auth }) {
    const {data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleSubmitForm = (e) => {
        e.preventDefault();

        post(route("user.store"))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create User
                </h2>
            }
        >

            <Head title="Create-User"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <form
                                    onSubmit={handleSubmitForm}
                                    className="p-4 sm:p-8 bg-white shadow rounded-lg "
                                >
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_name"
                                            value="Name"
                                        />
                                        <TextInput
                                            id="user_name"
                                            type="text"
                                            name="name"
                                            isFocused={true}
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="user_email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_password"
                                            value="Password"
                                        />
                                        <TextInput
                                            id="user_password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_password_confirmation"
                                            value="Confirm Password"
                                        />
                                        <TextInput
                                            id="user_password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="mt-4 items-center justify-end flex gap-3">
                                       <Link
                                        href={route("user.index")}
                                        className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                                       >
                                           Cancel
                                       </Link>
                                        <button className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-800" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
