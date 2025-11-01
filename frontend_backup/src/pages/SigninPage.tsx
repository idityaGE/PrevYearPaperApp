import { SigninComponent } from "../components/SigninComponent";
import SigninSidebar from "../components/SignInSIdeBar";
import { lazy, Suspense } from "react";

const DashboardSidebar = lazy(() => import("../components/DashboardSidebar"));

function SigninPageComponent() {
return (
  <div className="bg-[#09090b] text-foreground  min-h-screen overflow-hidden ">
    <div className="grid grid-cols-2  text-white h-screen w-full">
      <div className="flex justify-center items-center p-4">
        <SigninSidebar />
       
      </div>

      <div className="flex justify-center items-center p-4">
        <SigninComponent />
      </div>
    </div>
  </div>
);

}

export default SigninPageComponent;

// <div className="bg-[#09090b] text-white  flex justify-center items-center min-h-screen overflow-hidden px-4 py-6">
//   <div
//     className="
//       w-full max-w-6xl 
//       rounded-3xl overflow-hidden shadow-2xl border border-white/20 
//       backdrop-blur-lg bg-white/5
//       grid grid-cols-1 md:grid-cols-2
//       transition-all duration-500
//     "
//   >
//     {/* Sidebar */}
//     <div className="flex justify-center items-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10">
//       <Suspense fallback={<div className="text-white">Loading...</div>}>
//         <DashboardSidebar />
//       </Suspense>
//     </div>

//     {/* Signin Form */}
//     <div className="bg-zinc-900 text-white flex justify-center items-center backdrop-blur-xl p-6 md:p-10">
//       <Suspense fallback={<div className="text-white">Loading...</div>}>
//         {/* <Signin /> */}
//          <SigninComponent/>
//       </Suspense>
//     </div>
//   </div>
// </div>