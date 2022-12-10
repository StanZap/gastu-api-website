import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import { FC, useEffect, useState } from "react";

type SearchFieldProps = {
    debounceTime: number;
    onSearch: Function;
    value: string;
    autocomplete?: "on" | "off";
    placeholder?: string;
    className?: string;
};

const SearchField: FC<SearchFieldProps> = (props) => {
    const {
        debounceTime = 400,
        onSearch,
        value,
        autocomplete = "off",
        placeholder = "",
        className = "",
    } = props;
    const [searchText, setSearchText] = useState(value || "");

    const handleDebouncedSearch = () => {
        onSearch && onSearch(searchText);
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => handleDebouncedSearch(), debounceTime);
        return () => clearTimeout(timer);
    }, [searchText]);

    return (
        <div className={className}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassCircleIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
            </div>
            <input
                placeholder={placeholder}
                autoComplete={autocomplete}
                type="text"
                name="search"
                id="search"
                className="block h-full w-full rounded-md border-gray-300 bg-transparent py-3 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchText}
                onChange={handleSearchTextChange}
            />
        </div>
    );
};

export default SearchField;
