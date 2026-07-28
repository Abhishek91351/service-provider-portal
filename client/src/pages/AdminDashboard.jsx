// import { useEffect, useState } from "react";
// import API from "../api/axios";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//   });

//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProvider, setSelectedProvider] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);

//       const statsRes = await API.get("/admin/stats");
//       setStats(statsRes.data);

//       const providersRes = await API.get("/admin/providers");

//       setProviders(providersRes.data.providers || []);
//     } catch (err) {
//       console.log(err);
//       setProviders([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const viewProvider = async (id) => {
//     try {
//       const res = await API.get(`/admin/provider/${id}`);

//       setSelectedProvider(res.data);
//       setShowModal(true);
//     } catch (err) {
//       console.log(err);
//       alert("Unable to fetch provider details");
//     }
//   };

//   const approveProvider = async (id) => {
//     try {
//       await API.put(`/admin/approve/${id}`);

//       alert("Provider Approved Successfully");

//       fetchDashboard();
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   const rejectProvider = async (id) => {
//     const remark = prompt("Enter rejection remark");

//     if (!remark) return;

//     try {
//       await API.put(`/admin/reject/${id}`, {
//         rejectionRemark: remark,
//       });

//       alert("Provider Rejected Successfully");

//       fetchDashboard();
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   const filteredProviders = providers.filter((provider) => {
//     const name = provider.user?.name?.toLowerCase() || "";
//     const email = provider.user?.email?.toLowerCase() || "";

//     const matchesSearch =
//       name.includes(search.toLowerCase()) ||
//       email.includes(search.toLowerCase());

//     const matchesStatus =
//       statusFilter === "All"
//         ? true
//         : provider.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <h1 className="text-4xl font-bold mb-8 text-center">
//         Admin Dashboard
//       </h1>

//       {/* Statistics */}

//       <div className="grid md:grid-cols-4 gap-6 mb-8">

//         <div className="bg-white rounded-xl shadow p-6">
//           <h2 className="text-gray-500">Total Providers</h2>
//           <p className="text-4xl font-bold mt-3">{stats.total}</p>
//         </div>

//         <div className="bg-yellow-100 rounded-xl shadow p-6">
//           <h2>Pending</h2>
//           <p className="text-4xl font-bold mt-3">{stats.pending}</p>
//         </div>

//         <div className="bg-green-100 rounded-xl shadow p-6">
//           <h2>Approved</h2>
//           <p className="text-4xl font-bold mt-3">{stats.approved}</p>
//         </div>

//         <div className="bg-red-100 rounded-xl shadow p-6">
//           <h2>Rejected</h2>
//           <p className="text-4xl font-bold mt-3">{stats.rejected}</p>
//         </div>

//       </div>

//       {/* Search */}

//       <div className="flex flex-col md:flex-row gap-4 mb-8">

//         <input
//           type="text"
//           placeholder="Search Provider..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 border rounded-lg p-3"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border rounded-lg p-3"
//         >
//           <option>All</option>
//           <option>Pending</option>
//           <option>Approved</option>
//           <option>Rejected</option>
//         </select>

//       </div>

//       {/* Providers Table */}

//       <div className="bg-white rounded-xl shadow overflow-x-auto">

//         <table className="w-full">

//           <thead className="bg-blue-600 text-white">

//             <tr>

//               <th className="p-4">Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Categories</th>
//               <th>Status</th>
//               <th>Actions</th>

//             </tr>

//           </thead>

//           <tbody>

//             {filteredProviders.length === 0 ? (

//               <tr>

//                 <td
//                   colSpan="6"
//                   className="text-center py-10 text-gray-500"
//                 >
//                   No Providers Found
//                 </td>

//               </tr>

//             ) : (

//               filteredProviders.map((provider) => (

//                 <tr
//                   key={provider._id}
//                   className="border-b text-center hover:bg-gray-50"
//                 >

//                   <td className="p-4 font-semibold">
//                     {provider.user?.name}
//                   </td>

//                   <td>{provider.user?.email}</td>

//                   <td>{provider.phone}</td>

//                   <td>
//                     {provider.serviceCategories?.join(", ")}
//                   </td>

//                   <td>

//                     <span
//                       className={`px-3 py-1 rounded-full text-white font-semibold ${provider.status === "Approved"
//                         ? "bg-green-600"
//                         : provider.status === "Rejected"
//                           ? "bg-red-600"
//                           : "bg-yellow-500"
//                         }`}
//                     >
//                       {provider.status}
//                     </span>

//                   </td>

//                   <td className="space-x-2">

//                     <button
//                       onClick={() => viewProvider(provider._id)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded"
//                     >
//                       View
//                     </button>

//                     <button
//                       onClick={() => approveProvider(provider._id)}
//                       className="bg-green-600 text-white px-3 py-1 rounded"
//                     >
//                       Approve
//                     </button>

//                     <button
//                       onClick={() => rejectProvider(provider._id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded"
//                     >
//                       Reject
//                     </button>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>
//       {showModal && selectedProvider && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

//           <div className="bg-white rounded-xl p-8 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">

//             <div className="flex justify-between items-center mb-6">

//               <h2 className="text-3xl font-bold">
//                 Provider Details
//               </h2>

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-red-600 text-2xl"
//               >
//                 ✕
//               </button>

//             </div>

//             <div className="grid md:grid-cols-2 gap-8">

//               <div>

//                 <p><b>Name:</b> {selectedProvider.user?.name}</p>

//                 <p><b>Email:</b> {selectedProvider.user?.email}</p>

//                 <p><b>Phone:</b> {selectedProvider.phone}</p>

//                 <p><b>Gender:</b> {selectedProvider.gender}</p>

//                 <p><b>DOB:</b> {selectedProvider.dob}</p>

//                 <p><b>Experience:</b> {selectedProvider.experience} Years</p>

//                 <p><b>Status:</b> {selectedProvider.status}</p>

//               </div>

//               <div>

//                 <p><b>City:</b> {selectedProvider.location?.city}</p>

//                 <p><b>State:</b> {selectedProvider.location?.state}</p>

//                 <p><b>Pincode:</b> {selectedProvider.location?.pincode}</p>

//                 <p><b>Address:</b> {selectedProvider.location?.address}</p>

//               </div>

//             </div>

//             <div className="mt-8">

//               <h3 className="font-bold text-xl mb-3">
//                 Service Categories
//               </h3>

//               <div className="flex flex-wrap gap-3">

//                 {selectedProvider.serviceCategories?.map((item) => (

//                   <span
//                     key={item}
//                     className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
//                   >
//                     {item}
//                   </span>

//                 ))}

//               </div>

//             </div>

//             <div className="mt-8">

//               <h3 className="font-bold text-xl mb-3">
//                 Skills
//               </h3>

//               <div className="flex flex-wrap gap-3">

//                 {selectedProvider.skills?.map((item) => (

//                   <span
//                     key={item}
//                     className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
//                   >
//                     {item}
//                   </span>

//                 ))}

//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-8 mt-10">

//               <div>

//                 <h3 className="font-bold mb-3">
//                   Profile Photo
//                 </h3>

//                 {selectedProvider.profilePhoto && (

//                   <img
//                     src={`http://localhost:8000/uploads/${selectedProvider.profilePhoto}`}
//                     alt="Profile"
//                     className="w-48 rounded-lg border"
//                   />

//                 )}

//               </div>

//               <div>

//                 <h3 className="font-bold mb-3">
//                   Documents
//                 </h3>

//                 <div className="space-y-3">

//                   {selectedProvider.documents?.aadhaar && (
//                     <a
//                       href={`http://localhost:8000/uploads/${selectedProvider.documents.aadhaar}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 underline block"
//                     >
//                       Aadhaar
//                     </a>
//                   )}

//                   {selectedProvider.documents?.pan && (
//                     <a
//                       href={`http://localhost:8000/uploads/${selectedProvider.documents.pan}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 underline block"
//                     >
//                       PAN Card
//                     </a>
//                   )}

//                   {selectedProvider.documents?.experienceCertificate && (
//                     <a
//                       href={`http://localhost:8000/uploads/${selectedProvider.documents.experienceCertificate}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 underline block"
//                     >
//                       Experience Certificate
//                     </a>
//                   )}

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;





















import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaEye,
} from "react-icons/fa";

const IMAGE_URL = "http://localhost:8000/uploads";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const statsRes = await API.get("/admin/stats");
      setStats(statsRes.data);

      const providersRes = await API.get("/admin/providers");

      setProviders(providersRes.data.providers || []);
    } catch (err) {
      console.log(err);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const viewProvider = async (id) => {
    try {
      const res = await API.get(`/admin/provider/${id}`);
      setSelectedProvider(res.data);
      setShowModal(true);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch provider details");
    }
  };

  const approveProvider = async (id) => {
    if (!window.confirm("Approve this provider?")) return;

    try {
      await API.put(`/admin/approve/${id}`);

      alert("Provider Approved Successfully");

      fetchDashboard();

      if (
        showModal &&
        selectedProvider &&
        selectedProvider._id === id
      ) {
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const rejectProvider = async (id) => {
    const remark = prompt("Enter rejection remark");

    if (!remark) return;

    try {
      await API.put(`/admin/reject/${id}`, {
        rejectionRemark: remark,
      });

      alert("Provider Rejected Successfully");

      fetchDashboard();

      if (
        showModal &&
        selectedProvider &&
        selectedProvider._id === id
      ) {
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const filteredProviders = providers.filter((provider) => {
    const name = provider.user?.name?.toLowerCase() || "";
    const email = provider.user?.email?.toLowerCase() || "";

    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : provider.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Providers</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.total}
            </h2>
          </div>

          <FaUsers className="text-5xl text-blue-600" />
        </div>

        <div className="bg-yellow-100 rounded-xl shadow p-6 flex items-center justify-between">
          <div>
            <p>Pending</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.pending}
            </h2>
          </div>

          <FaClock className="text-5xl text-yellow-600" />
        </div>

        <div className="bg-green-100 rounded-xl shadow p-6 flex items-center justify-between">
          <div>
            <p>Approved</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.approved}
            </h2>
          </div>

          <FaCheckCircle className="text-5xl text-green-600" />
        </div>

        <div className="bg-red-100 rounded-xl shadow p-6 flex items-center justify-between">
          <div>
            <p>Rejected</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.rejected}
            </h2>
          </div>

          <FaTimesCircle className="text-5xl text-red-600" />
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-12 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

      </div>

      {/* Providers Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Categories</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredProviders.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No Providers Found
                </td>
              </tr>

            ) : (

              filteredProviders.map((provider) => (

                <tr
                  key={provider._id}
                  className="border-b text-center hover:bg-blue-50 transition"
                >

                  <td className="p-4 font-semibold">
                    {provider.user?.name}
                  </td>

                  <td>{provider.user?.email}</td>

                  <td>{provider.phone}</td>

                  <td>
                    {provider.serviceCategories?.join(", ")}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        provider.status === "Approved"
                          ? "bg-green-600"
                          : provider.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {provider.status}
                    </span>
                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => viewProvider(provider._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-2"
                      >
                        <FaEye />
                        View
                      </button>

                      <button
                        onClick={() => approveProvider(provider._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectProvider(provider._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                      >
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
            {/* Provider Details Modal */}

      {showModal && selectedProvider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-11/12 max-w-5xl rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Provider Details
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-red-600 text-3xl font-bold"
              >
                ×
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="space-y-3">

                <p><strong>Name:</strong> {selectedProvider.user?.name}</p>

                <p><strong>Email:</strong> {selectedProvider.user?.email}</p>

                <p><strong>Phone:</strong> {selectedProvider.phone}</p>

                <p><strong>Gender:</strong> {selectedProvider.gender}</p>

                <p><strong>DOB:</strong> {selectedProvider.dob}</p>

                <p>
                  <strong>Experience:</strong>{" "}
                  {selectedProvider.experience} Years
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      selectedProvider.status === "Approved"
                        ? "text-green-600"
                        : selectedProvider.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {selectedProvider.status}
                  </span>
                </p>

              </div>

              <div className="space-y-3">

                <p>
                  <strong>City:</strong>{" "}
                  {selectedProvider.location?.city}
                </p>

                <p>
                  <strong>State:</strong>{" "}
                  {selectedProvider.location?.state}
                </p>

                <p>
                  <strong>Pincode:</strong>{" "}
                  {selectedProvider.location?.pincode}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {selectedProvider.location?.address}
                </p>

              </div>

            </div>

            <div className="mt-10">

              <h3 className="text-xl font-bold mb-4">
                Service Categories
              </h3>

              <div className="flex flex-wrap gap-3">

                {selectedProvider.serviceCategories?.map((item) => (
                  <span
                    key={item}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>

            <div className="mt-10">

              <h3 className="text-xl font-bold mb-4">
                Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {selectedProvider.skills?.map((item) => (
                  <span
                    key={item}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-10 mt-10">

              <div>

                <h3 className="font-bold text-lg mb-4">
                  Profile Photo
                </h3>

                {selectedProvider.profilePhoto ? (

                  <img
                    src={`${IMAGE_URL}/${selectedProvider.profilePhoto}`}
                    alt="Profile"
                    className="w-56 h-56 object-cover rounded-xl border shadow"
                  />

                ) : (

                  <p className="text-gray-500">
                    No Profile Photo Uploaded
                  </p>

                )}

              </div>

              <div>

                <h3 className="font-bold text-lg mb-4">
                  Documents
                </h3>

                <div className="space-y-3">

                  {selectedProvider.documents?.aadhaar && (
                    <a
                      href={`${IMAGE_URL}/${selectedProvider.documents.aadhaar}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      Aadhaar Card
                    </a>
                  )}

                  {selectedProvider.documents?.pan && (
                    <a
                      href={`${IMAGE_URL}/${selectedProvider.documents.pan}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      PAN Card
                    </a>
                  )}

                  {selectedProvider.documents?.experienceCertificate && (
                    <a
                      href={`${IMAGE_URL}/${selectedProvider.documents.experienceCertificate}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      Experience Certificate
                    </a>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminDashboard;