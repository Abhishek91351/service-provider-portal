import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Status from "./pages/Status";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CompleteProfile from "./pages/CompleteProfile";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Provider Dashboard */}
        <Route
          path="/provider"
          element={
            <ProtectedRoute>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />

        {/* Complete Profile */}
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        {/* Provider Status */}
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;























// import { Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProviderDashboard from "./pages/ProviderDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import CompleteProfile from "./pages/CompleteProfile";

// const CompleteProfile = () => (
//   <h1 className="text-3xl p-10">Complete Profile Page</h1>
// );

// const Status = () => (
//   <h1 className="text-3xl p-10">Application Status Page</h1>
// );

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/provider"
//           element={
//             <ProtectedRoute>
//               <ProviderDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/complete-profile"
//           element={
//             <ProtectedRoute>
//               <CompleteProfile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/complete-profile"
//           element={
//             <ProtectedRoute>
//               <CompleteProfile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/status"
//           element={
//             <ProtectedRoute>
//               <Status />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;