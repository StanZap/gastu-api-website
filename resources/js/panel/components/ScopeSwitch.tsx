import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ScopeSwitch = ({ className = "" }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleMineStats = () => {
        searchParams.set("scope", "mine");
        setSearchParams(searchParams);
    };

    const handleAllStats = () => {
        searchParams.delete("scope");
        setSearchParams(searchParams);
    };

    return (
        <div className={className}>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-r-none text-white rounded-md hover:opacity-75 ${
                    searchParams.get("scope") === "mine"
                        ? "bg-blue-500"
                        : "bg-blue-300 text-gray-900"
                }`}
                onClick={handleMineStats}
            >
                {t("myStatsBtn")}
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-l-none text-white rounded-md  hover:opacity-75 ${
                    searchParams.get("scope") === "mine"
                        ? "bg-blue-300 text-gray-900"
                        : "bg-blue-500"
                }`}
                onClick={handleAllStats}
            >
                {t("allStatsBtn")}
            </button>
        </div>
    );
};

export default ScopeSwitch;
