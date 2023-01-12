import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StatsScopeSwitch = ({ className = "" }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleMineStats = () => {
        searchParams.set("scope", "mine");
        setSearchParams(searchParams);
    };

    const handleAllStats = () => {
        searchParams.set("scope", "team");
        setSearchParams(searchParams);
    };

    return (
        <div className={className}>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-r-none text-white rounded-md hover:opacity-75 ${
                    searchParams.get("scope") !== "team"
                        ? "bg-blue-500"
                        : "bg-blue-300 text-gray-900"
                }`}
                onClick={handleMineStats}
            >
                {t("myStatsBtn")}
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-l-none text-white rounded-md  hover:opacity-75 ${
                    searchParams.get("scope") === "team"
                        ? "bg-blue-500"
                        : "bg-blue-300 text-gray-900"
                }`}
                onClick={handleAllStats}
            >
                {t("allStatsBtn")}
            </button>
        </div>
    );
};

export default StatsScopeSwitch;
