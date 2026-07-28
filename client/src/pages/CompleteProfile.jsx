import { useState } from "react";
import API from "../api/axios";

const CompleteProfile = () => {
    const [form, setForm] = useState({
        phone: "",
        gender: "",
        dob: "",
        experience: "",
        city: "",
        state: "",
        pincode: "",
        address: "",
        skills: "",
    });

    const [categories, setCategories] = useState([]);

    const [files, setFiles] = useState({
        profilePhoto: null,
        aadhaar: null,
        pan: null,
        experienceCertificate: null,
    });

    const serviceList = [
        "Electrician",
        "Plumber",
        "Painter",
        "Carpenter",
        "AC Repair",
        "Cleaning",
    ];

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategory = (category) => {
        if (categories.includes(category)) {
            setCategories(categories.filter((item) => item !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    const handleFile = (e) => {
        setFiles({
            ...files,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("phone", form.phone);
            formData.append("gender", form.gender);
            formData.append("dob", form.dob);
            formData.append("experience", form.experience);
            formData.append("city", form.city);
            formData.append("state", form.state);
            formData.append("pincode", form.pincode);
            formData.append("address", form.address);

            formData.append(
                "serviceCategories",
                JSON.stringify(categories)
            );

            formData.append(
                "skills",
                JSON.stringify(
                    form.skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill !== "")
                )
            );

            if (files.profilePhoto)
                formData.append("profilePhoto", files.profilePhoto);

            if (files.aadhaar)
                formData.append("aadhaar", files.aadhaar);

            if (files.pan)
                formData.append("pan", files.pan);

            if (files.experienceCertificate)
                formData.append(
                    "experienceCertificate",
                    files.experienceCertificate
                );

            const res = await API.post(
                "/provider/profile",
                formData
            );

            alert("Profile Saved Successfully!");

            console.log(res.data);
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <form
                onSubmit={handleSubmit}
                className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8"
            >
                <h1 className="text-3xl font-bold text-center mb-8">
                    Complete Provider Profile
                </h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="font-semibold block mb-2">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter Phone Number"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-2">
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold block mb-2">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-2">
                            Experience (Years)
                        </label>

                        <input
                            type="number"
                            name="experience"
                            value={form.experience}
                            onChange={handleChange}
                            placeholder="Experience"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Service Categories
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {serviceList.map((item) => (
                            <label
                                key={item}
                                className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={categories.includes(item)}
                                    onChange={() => handleCategory(item)}
                                    className="mr-2"
                                />

                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-10">
                    <label className="font-semibold block mb-2">
                        Skills (Comma Separated)
                    </label>

                    <input
                        type="text"
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                        placeholder="Repair, Installation, Wiring"
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Service Location
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="border rounded-lg p-3"
                        />

                        <input
                            type="text"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="border rounded-lg p-3"
                        />
                        <input
                            type="text"
                            name="pincode"
                            value={form.pincode}
                            onChange={handleChange}
                            placeholder="Pincode"
                            className="border rounded-lg p-3"
                        />

                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="border rounded-lg p-3"
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Upload Documents
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="font-semibold block mb-2">
                                Profile Photo
                            </label>

                            <input
                                type="file"
                                name="profilePhoto"
                                onChange={handleFile}
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-2">
                                Aadhaar Card
                            </label>

                            <input
                                type="file"
                                name="aadhaar"
                                onChange={handleFile}
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-2">
                                PAN Card
                            </label>

                            <input
                                type="file"
                                name="pan"
                                onChange={handleFile}
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-2">
                                Experience Certificate
                            </label>

                            <input
                                type="file"
                                name="experienceCertificate"
                                onChange={handleFile}
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                    </div>
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Save Profile
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CompleteProfile;