import Signin from '../components/Signin'
import DashboardSidebar from '../components/DashboardSidebar'

function SigninPage() {
  return (

    <div className="bg-gradient-to-r from-gray-600 via-gray-800 to-black flex justify-center items-center h-screen overflow-hidden">

      <div className="grid grid-cols-2 w-11/12 h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-lg">
        {/* Sidebar */}
        <div className="flex justify-center items-center">
          <DashboardSidebar />
        </div>

        {/* Signup form */}
        <div className="flex justify-center items-center bg-white/10 backdrop-blur-xl">
          <Signin />
        </div>
      </div>
    </div>
  )
}

export default SigninPage