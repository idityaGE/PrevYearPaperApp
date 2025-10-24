import { lazy, Suspense } from "react";

const Signin = lazy(() => import("../components/Signin"));
const DashboardSidebar = lazy(() => import("../components/DashboardSidebar"));

function SigninPage() {
  return (
    <div className="bg-gradient-to-r from-gray-600 via-gray-800 to-black flex justify-center items-center min-h-screen overflow-hidden px-4 py-6">
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

        {/* Signin Form */}
        <div className="flex justify-center items-center bg-white/10 backdrop-blur-xl p-6 md:p-10">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <Signin />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
