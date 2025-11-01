export default function InputForProfile(props: any) {
  return (
    <div className="flex items-center">
      {/* Icon for social links or other inputs */}
      <i className={`fab text-blue-700 mr-2`}></i>
      <input
        type="text"
        className="text-white  w-full  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border p-4"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}