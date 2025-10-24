import { lazy,Suspense } from 'react'
// import Signup from '../components/Signup'
const Signup = lazy(() => import('../components/Signup'))
// import DashboardSidebar from '../components/DashboardSidebar'
const DashboardSidebar = lazy(() => import('../components/DashboardSidebar'))

function SignupPage() {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-gray-600 to-black via-gray-800 flex justify-center items-center">
      <div className="grid grid-cols-2 w-11/12 h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-lg">
        {/* Sidebar */}
        <div className="flex justify-center items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardSidebar />
          </Suspense>
          {/* <DashboardSidebar /> */}
        </div>

        {/* Signup form */}
        <div className="flex justify-center items-center bg-white/10 backdrop-blur-xl">
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
          {/* <Signup /> */}
        </div>
      </div>
    </div>
  )
}

export default SignupPage
