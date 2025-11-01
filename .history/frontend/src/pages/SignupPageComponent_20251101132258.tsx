import SigninSidebar from "@/components/SignInSIdeBar";
import { SigninComponent } from "@/components/SigninComponent";
import { SignupComponent } from "../components/SignupComponent";


function SignupPageComponent() {
return (
  <div className="bg-[#09090b] text-foreground  min-h-screen overflow-hidden ">
    <div className="grid grid-cols-2  text-white h-screen w-full">
      <div className="flex justify-center items-center p-4">
        <SigninSidebar />
       
      </div>

      <div className="flex justify-center items-center p-4">
        <SignupComponent />
      </div>
    </div>
  </div>
);

}

export default SignupPageComponent;