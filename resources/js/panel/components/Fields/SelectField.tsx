import ErrorAlert from "./ErrorAlert";

function SelectField(props) {
    const {
        options,
        onChange,
        value,
        defaultValue,
        label,
        id = "select-field",
        errors,
        withDefault = undefined,
        withDefaultBg = true,
        className,
    } = props;
    const handleChange = (e) => {
        onChange && onChange(e.target.value);
    };

    return (
        <div className={className + " flex max-w-sm flex-col items-start"}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <div className={"relative mt-1 w-full rounded-md shadow-sm"}>
                <select
                    id={id}
                    name={id}
                    className={`${
                        withDefaultBg
                            ? "bg-gray-50 text-gray-600"
                            : "bg-transparent text-gray-50"
                    } x-3 block w-full rounded-md border-gray-800 py-3 px-2 focus:border-indigo-500  focus:ring-indigo-500 sm:text-sm`}
                    onChange={handleChange}
                    defaultValue={defaultValue}
                    value={value}
                >
                    {withDefault && <option value="">{withDefault}</option>}
                    {options.map((o) => (
                        <option key={o.id} value={o.id}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <ErrorAlert errors={errors} />
            </div>
        </div>
    );
}

export default SelectField;
