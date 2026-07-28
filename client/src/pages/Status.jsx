import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Status = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/provider/profile");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Provider Application Status
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left Side */}
          <div>

            {profile.profilePhoto && (
              <img
                src={`http://localhost:8000/uploads/${profile.profilePhoto}`}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border mb-6"
              />
            )}

            <h2 className="text-2xl font-bold mb-4">
              Personal Details
            </h2>

            <div className="space-y-2">
              <p><strong>Name:</strong> {profile.user?.name}</p>
              <p><strong>Email:</strong> {profile.user?.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <p><strong>DOB:</strong> {profile.dob}</p>
              <p><strong>Experience:</strong> {profile.experience} Years</p>

              <p><strong>City:</strong> {profile.location?.city}</p>
              <p><strong>State:</strong> {profile.location?.state}</p>
              <p><strong>Pincode:</strong> {profile.location?.pincode}</p>
              <p><strong>Address:</strong> {profile.location?.address}</p>
            </div>

          </div>

          {/* Right Side */}
          <div>

            <h2 className="text-2xl font-bold mb-4">
              Application Status
            </h2>

            <span
              className={`inline-block px-6 py-2 rounded-lg text-white font-bold ${
                profile.status === "Approved"
                  ? "bg-green-600"
                  : profile.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {profile.status}
            </span>

            {profile.rejectionRemark && (
              <div className="mt-6 bg-red-100 border border-red-300 rounded-lg p-4">
                <h3 className="font-bold text-red-700">
                  Rejection Remark
                </h3>

                <p className="mt-2">
                  {profile.rejectionRemark}
                </p>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-3">
                Service Categories
              </h2>

              <div className="flex flex-wrap gap-2">
                {profile.serviceCategories?.map((item) => (
                  <span
                    key={item}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-3">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((item) => (
                  <span
                    key={item}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/complete-profile"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Edit Profile
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Status;