import { FC, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { SelectableOption } from "../../utils/types";
import ErrorAlert from "../Fields/ErrorAlert";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

interface MyComboBoxProps {
    label: string;
    options: SelectableOption[];
    value: string;
    onChange: (value: string) => void;
    errors?: string[];
}

const ComboBox: FC<MyComboBoxProps> = (props) => {
    const {
        label,
        options: filtrableOptions = [],
        value,
        errors = [],
        onChange,
    } = props;
    const [query, setQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState();
    const [options, setOptions] = useState<SelectableOption[]>([]);

    useEffect(() => {
        const _options =
            query === ""
                ? filtrableOptions
                : filtrableOptions.filter((opt) => {
                      return opt.label
                          .toLowerCase()
                          .includes(query.toLowerCase());
                  });
        setOptions(_options);
    }, [filtrableOptions, query]);

    useEffect(() => {
        setSelectedOption(options.find((opt) => opt.id === value));
    }, [value, options]);

    useEffect(() => {}, [selectedOption]);

    const handleChange = (opt) => {
        onChange(opt.id);
    };

    return (
        <div className="flex flex-col space-y-1">
            <Combobox as="div" value={selectedOption} onChange={handleChange}>
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                    {label}
                </Combobox.Label>
                <div className="relative mt-1">
                    <Combobox.Input
                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(opt) => opt?.label}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>

                    {options.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((opt) => (
                                <Combobox.Option
                                    key={opt.id}
                                    value={opt}
                                    className={({ active }) =>
                                        classNames(
                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                            active
                                                ? "bg-indigo-600 text-white"
                                                : "text-gray-900"
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <span
                                                className={classNames(
                                                    "block truncate",
                                                    selected && "font-semibold"
                                                )}
                                            >
                                                {opt.label}
                                            </span>
                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                        active
                                                            ? "text-white"
                                                            : "text-indigo-600"
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
            <ErrorAlert errors={errors} />
        </div>
    );
};

export default ComboBox;
