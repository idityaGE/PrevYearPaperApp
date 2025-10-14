
function DashboardSidebar() {
  return (
    <div className="h-screen w-full flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-10 text-center border border-white/30">
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
          📊 Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-white/90 mb-8 leading-relaxed">
          Always use <span className="font-semibold">snake_case lowercase</span> names 
          for your tables and columns (e.g., <code>paper</code>, <code>user</code>, 
          <code>department</code>) to keep your database queries clean, 
          simple, and error-free 🚀.
        </p>

        <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-indigo-50 transition-transform duration-300">
          Explore Best Practices
        </button>
      </div>
    </div>
  );
}

export default DashboardSidebar;
