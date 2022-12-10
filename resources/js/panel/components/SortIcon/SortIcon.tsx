import { useSearchParams } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { FC } from "react";

type SortIconProps = {
    field: string;
};

const SortIcon: FC<SortIconProps> = ({ field }) => {
    const [params, _] = useSearchParams();
    return (
        <div className="ml-1 flex flex-col space-y-0 text-sm font-bold">
            <ChevronUpIcon
                className={`-mb-1 h-4 w-3 ${
                    params.get("orderBy") === field &&
                    params.get("orderDirection") === "asc"
                        ? "opacity-100"
                        : "opacity-30"
                }`}
            />
            <ChevronDownIcon
                className={`-mt-1 h-4 w-3 ${
                    params.get("orderBy") === field &&
                    params.get("orderDirection") === "desc"
                        ? "opacity-100"
                        : "opacity-30"
                }`}
            />
        </div>
    );
};

export default SortIcon;
