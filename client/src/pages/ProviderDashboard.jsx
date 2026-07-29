// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import DashboardCard from "../components/DashboardCard";

// const ProviderDashboard = () => {

//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-100">

//       <div className="max-w-7xl mx-auto p-8">

//         <h1 className="text-4xl font-bold">
//           Welcome,
//           <span className="text-blue-600">
//             {" "}
//             {user?.user?.name}
//           </span>
//           👋
//         </h1>

//         <p className="mt-3 text-gray-600 text-lg">
//           Complete your onboarding profile to submit your
//           application.
//         </p>

//         <div className="grid md:grid-cols-3 gap-6 mt-10">

//           <DashboardCard
//             title="Profile Completion"
//             value="0%"
//             color="bg-blue-600"
//           />

//           <DashboardCard
//             title="Application Status"
//             value="Pending"
//             color="bg-yellow-500"
//           />

//           <DashboardCard
//             title="Documents Uploaded"
//             value="0 / 4"
//             color="bg-green-600"
//           />

//         </div>

//         <div className="mt-12 flex gap-5">

//           <Link
//             to="/complete-profile"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
//           >
//             Complete Profile
//           </Link>

//           <Link
//             to="/status"
//             className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg"
//           >
//             View Status
//           </Link>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProviderDashboard;











import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import { useEffect, useState } from "react";
import API from "../api/axios";

const ProviderDashboard = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/provider/profile");
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  // Status
  const status = profile?.status || "Pending";

  const statusColor =
    status === "Approved"
      ? "bg-green-600"
      : status === "Rejected"
      ? "bg-red-600"
      : "bg-yellow-500";

  // Documents Uploaded
  let uploadedDocs = 0;

  if (profile?.profilePhoto) uploadedDocs++;
  if (profile?.documents?.aadhaar) uploadedDocs++;
  if (profile?.documents?.pan) uploadedDocs++;
  if (profile?.documents?.experienceCertificate) uploadedDocs++;

  // Profile Completion
  const fields = [
    profile?.phone,
    profile?.gender,
    profile?.dob,
    profile?.experience,
    profile?.location?.city,
    profile?.location?.state,
    profile?.location?.pincode,
    profile?.location?.address,
    profile?.profilePhoto,
    profile?.documents?.aadhaar,
    profile?.documents?.pan,
    profile?.documents?.experienceCertificate,
    profile?.serviceCategories?.length,
    profile?.skills?.length,
  ];

  const completedFields = fields.filter(
    (field) => field !== undefined && field !== null && field !== ""
  ).length;

  const completion = Math.round(
    (completedFields / fields.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          Welcome,
          <span className="text-blue-600">
            {" "}
            {user?.user?.name}
          </span>{" "}
          👋
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Track your onboarding progress and application status.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <DashboardCard
            title="Profile Completion"
            value={`${completion}%`}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Application Status"
            value={status}
            color={statusColor}
          />

          <DashboardCard
            title="Documents Uploaded"
            value={`${uploadedDocs} / 4`}
            color="bg-green-600"
          />

        </div>

        <div className="mt-12 flex gap-5">

          <Link
            to="/complete-profile"
            className={`text-white px-8 py-3 rounded-lg ${
              status === "Approved"
                ? "bg-gray-500 cursor-not-allowed pointer-events-none"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {status === "Approved"
              ? "Profile Approved"
              : "Complete / Edit Profile"}
          </Link>

          <Link
            to="/status"
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg"
          >
            View Status
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ProviderDashboard;