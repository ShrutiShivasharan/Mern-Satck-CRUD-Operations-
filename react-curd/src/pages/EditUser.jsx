import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EditUser = () => {
    const navigate = useNavigate();
    const cancleButtonFun = () => {
        navigate("/");
    }

    const { id } = useParams();
    const [formData, setFormData] = useState({
        Fname: '',
        Lname: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        profile: null,
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setFormData(data);
                } else {
                    alert("Failed To fetch data by ID");
                }
            } catch (err) {
                console.error("error while Fetching user data by ID");
                alert("error while Fetching user data by ID");
            }
        }
        fetchUserData();
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value,
        });
    }

    const handleFileChnage = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData, [name]: files[0],
        });
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/editUser/${id}`,formDataToSend,{
                Headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            if(response.status === 200){
                alert("user data updated!!");
                navigate("/");
            }
            // const response = await fetch(`http://localhost:8000/api/editUser/${id}`, {
            //     method: 'PUT',
            //     body: formDataToSend
            // })
            // if (response.ok) {
            //     const result = await response.json();
            //     alert("user data updated!!");
            //     navigate("/");
            // } else {
            //     const error = await response.json();
            //     alert("Failed To updated user data!!", error.message);
            // }
        } catch (err) {
            console.error("error while updating user data!!");
            alert("error while updating user data!!");
        }
    }



    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto">
                    <form onSubmit={handleSubmitForm}>
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                        <i class="fa-solid fa-user mr-2"></i> photo (Optinal)
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <i class="fa-solid fa-photo-film"></i>
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="profile"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="profile"
                                                        name="profile"
                                                        type="file"
                                                        onChange={handleFileChnage}
                                                        className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div className="sm:col-span-3">
                                        <label htmlFor="Fname" className="block text-sm/6 font-medium text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="Fname"
                                                name="Fname"
                                                type="text"
                                                value={formData.Fname}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="Lname" className="block text-sm/6 font-medium text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="Lname"
                                                name="Lname"
                                                type="text"
                                                value={formData.Lname}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                            Storng password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="text"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                            Full address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                                            State
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="state"
                                                name="state"
                                                type="text"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="pincode" className="block text-sm/6 font-medium text-gray-900">
                                            Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="pincode"
                                                name="pincode"
                                                type="number"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="country"
                                                name="country"
                                                type="text"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-6">
                            <button onClick={cancleButtonFun} type="button" className="rounded-md bg-red-500 px-12 py-2 text-sm font-semibold text-white shadow-sm">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-12 py-2 text-sm font-semibold text-white shadow-sm">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-5 py-5"></div>
            </div>
        </>
    )
}

export default EditUser;





