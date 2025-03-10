import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextArea from "@/Components/TextArea.jsx";
import {useState} from "react";


export default function Edit({ auth,  project }) {
    const {data, setData, post, errors, reset } = useForm({
        image_path: project.image_path || "",
        name: project.name || "",
        status: project.status || "",
        description: project.description || "",
        due_date: project.due_date || "",
        _method: "PUT"
    })

    console.log(project)

    const handleSubmitForm = (e) => {
        e.preventDefault();

        post(route("project.update", project))
    }

    const [previewImage, setPreviewImage] = useState(project.image_path || "")
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            const previewURL = URL.createObjectURL(file)
            setPreviewImage(previewURL)
            setData("image", file)
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Project "{project.name}"
                </h2>
            }
        >

            <Head title="Create-Project"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <form
                                    onSubmit={handleSubmitForm}
                                    className="p-4 sm:p-8 bg-white shadow rounded-lg "
                                >
                                    <div className="rounded-lg overflow-hidden w-80 mb-4">
                                        <img src={previewImage} alt=""/>
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="project_image_path"
                                            value="Choose image"
                                        />
                                        <TextInput
                                            id="project_image_path"
                                            type="file"
                                            name="image"
                                            onChange={handleImageChange}
                                            className="mt-1 pl-1 block w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="project_name"
                                            value="Name"
                                        />
                                        <TextInput
                                            id="project_name"
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
                                            htmlFor="project_description"
                                            value="Description"
                                        />
                                        <TextArea
                                            id="project_description"
                                            name="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="project_due_date"
                                            value="Deadline"
                                        />
                                        <TextInput
                                            id="project_due_date"
                                            type="date"
                                            name="due_date"
                                            value={data.due_date}
                                            onChange={(e) => setData('due_date', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="project_status"
                                            value="Select status"
                                        />
                                        <SelectInput
                                            id="project_status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="mt-1 block w-full"
                                        >
                                            <option value="">Select</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                    </div>
                                    <div className="mt-4 items-center justify-end flex gap-3">
                                        <Link
                                            href={route("project.index")}
                                            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Cancel
                                        </Link>
                                        <button className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-800">
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
