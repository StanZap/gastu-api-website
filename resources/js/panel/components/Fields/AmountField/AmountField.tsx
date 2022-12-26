import ErrorAlert from "../ErrorAlert";

const AmountField = ({
    id,
    label,
    value,
    onChange,
    className = "",
    inputClassName = "",
    errors,
}) => {
    const handleChange = (event) => {
        onChange && onChange(event.target.value);
    };

    return (
        <div className={`${className || ""} flex max-w-sm flex-col`}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type="number"
                name={id}
                id={id}
                step={0.01}
                min={0}
                className={
                    inputClassName +
                    " block w-full px-5 rounded-md border-gray-800 bg-gray-50 px-1 py-3 pr-12 focus:border-indigo-500  focus:ring-indigo-500 sm:text-sm"
                }
                placeholder="0.00"
                onChange={handleChange}
                value={value}
            />
            <ErrorAlert errors={errors} />
        </div>
    );
};

export default AmountField;
