import ErrorAlert from "./ErrorAlert";

export default function TextField({
  className = "",
  onChange,
  value,
  label,
  id,
  placeholder = "",
  errors,
}) {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };
  return (
    <div className={`${className || ""} max-w-sm`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name={id}
          id={id}
          className="block w-full rounded-md border-gray-800 bg-gray-50 px-3 py-3 focus:border-indigo-500  focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      </div>
      <ErrorAlert errors={errors} />
    </div>
  );
}
