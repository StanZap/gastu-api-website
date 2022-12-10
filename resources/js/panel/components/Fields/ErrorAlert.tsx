const ErrorAlert = ({ className = "", errors }) => {
  return (
    errors && (
      <div
        className={
          className +
          " ml-2 mt-2 flex h-6 flex-col space-y-2 border-r border-gray-500 text-sm"
        }
      >
        {errors.map((err, index) => (
          <span key={index} className="text-red-600">
            {err}
          </span>
        ))}
      </div>
    )
  );
};

export default ErrorAlert;
