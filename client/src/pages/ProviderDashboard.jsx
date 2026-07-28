import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";

const ProviderDashboard = () => {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          Welcome,
          <span className="text-blue-600">
            {" "}
            {user?.user?.name}
          </span>
          👋
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Complete your onboarding profile to submit your
          application.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <DashboardCard
            title="Profile Completion"
            value="0%"
            color="bg-blue-600"
          />

          <DashboardCard
            title="Application Status"
            value="Pending"
            color="bg-yellow-500"
          />

          <DashboardCard
            title="Documents Uploaded"
            value="0 / 4"
            color="bg-green-600"
          />

        </div>

        <div className="mt-12 flex gap-5">

          <Link
            to="/complete-profile"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Complete Profile
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