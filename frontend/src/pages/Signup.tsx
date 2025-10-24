import { lazy, Suspense } from "react";

const Signup = lazy(() => import("../components/Signup"));
const DashboardSidebar = lazy(() => import("../components/DashboardSidebar"));

function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-600 via-gray-800 to-black flex justify-center items-center px-4 py-6">
      <div
        className="
          w-full max-w-6xl 
          rounded-3xl overflow-hidden shadow-2xl border border-white/20 
          backdrop-blur-lg bg-white/5
          grid grid-cols-1 md:grid-cols-2
          transition-all duration-500
        "
      >
        {/* Sidebar */}
        <div className="flex justify-center items-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <DashboardSidebar />
          </Suspense>
        </div>

        {/* Signup form */}
        <div className="flex justify-center items-center bg-white/10 backdrop-blur-xl p-6 md:p-10">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <Signup />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
