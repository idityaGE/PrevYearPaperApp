import { SigninComponent } from "../components/SigninComponent";
import SigninSidebar from "../components/SignInSIdeBar";

function SigninPageComponent() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen flex items-center justify-center px-4">
      
      <div className="flex flex-col lg:grid lg:grid-cols-2 w-full  max-w-8xl min-h-screen lg:min-h-[80vh]">

        {/* Left Section - Sidebar */}
        <div className="flex justify-center items-center pl-10 sm:pl-30 pt-10 sm:pt-1">
          <SigninSidebar />
        </div>

        {/* Right Section - Auth Form */}
        <div className="flex justify-center items-center p-6">
          <SigninComponent />
        </div>

      </div>

    </div>
  );
}

export default SigninPageComponent;
