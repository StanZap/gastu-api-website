import { AppLayout } from "../Layout";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import useMonthlyStatsData from "../../hooks/useMonthlyStatsData";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../utils/enums";
import { useSearchParams } from "react-router-dom";

const MonthlyStatsList = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, monthlyStats } = useMonthlyStatsData();

    const handleMineStats = () => {
        setSearchParams({ mode: "mine" });
    };

    const handleAllStats = () => {
        searchParams.delete("mode");
        setSearchParams(searchParams);
    };

    useEffect(() => {
        if (searchParams.get("mode") === "mine") {
        }
    }, [searchParams]);

    return (
        <AppLayout>
            <div className="flex justify-between">
                <h1 className="mb-5 text-2xl">
                    {t("monthlyStatsCardHeading")}
                </h1>
                <div className="">
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-r-none text-white rounded-md hover:opacity-75 ${
                            searchParams.get("mode") === "mine"
                                ? "bg-blue-500"
                                : "bg-blue-300 text-gray-900"
                        }`}
                        onClick={handleMineStats}
                    >
                        {t("myStatsBtn")}
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-l-none text-white rounded-md  hover:opacity-75 ${
                            searchParams.get("mode") === "mine"
                                ? "bg-blue-300 text-gray-900"
                                : "bg-blue-500"
                        }`}
                        onClick={handleAllStats}
                    >
                        {t("allStatsBtn")}
                    </button>
                </div>
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col space-y-8">
                    {monthlyStats &&
                        Object.entries(monthlyStats)?.map(
                            ([monthYear, monthStat]) => (
                                <MonthItem
                                    key={monthYear}
                                    monthName={
                                        t("months")?.find(
                                            (_, index) =>
                                                index ===
                                                +monthYear.split("-")[0] - 1
                                        ) +
                                        " " +
                                        monthYear.split("-")[1]
                                    }
                                    monthStat={monthStat}
                                />
                            )
                        )}
                </div>
            )}
        </AppLayout>
    );
};

const TxItem = ({ txType, txTypeStat }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col space-y-1">
            <h4 className="text-xs uppercase">{t(txType)}</h4>
            <div className="flex flex-col bg-100 space-y-1">
                {Object.entries(txTypeStat)?.map(([currency, valObj]) => (
                    <div key={currency} className="flex space-x-1">
                        {valObj?.[0].type === TransactionType.Income ? (
                            <span className="text-green-700 text-2xl font-bold">
                                {valObj?.[0]?.amount}
                            </span>
                        ) : (
                            <span className="text-red-700 text-2xl font-bold">
                                {valObj?.[0]?.amount}
                            </span>
                        )}
                        <span className="">{currency}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TeamItem = ({ teamStat, teamName }) => {
    return (
        <div className="flex flex-col space-y-1">
            <h4 className="text-md uppercase first-letter:text-3xl">
                {teamName}
            </h4>
            <div className="flex flex-col md:flex-row space-y-4 md:space-x-10 md:space-y-0 justify-start">
                {Object.entries(teamStat)?.map(([txType, txTypeStat]) => (
                    <TxItem
                        key={txType}
                        txType={txType}
                        txTypeStat={txTypeStat}
                    />
                ))}
            </div>
        </div>
    );
};

const MonthItem = ({ monthName, monthStat }) => {
    const [teamMap, setTeamMap] = useState({});
    const { profileData } = useStore((state: StoreState) => ({
        profileData: state.profileData,
    }));

    useEffect(() => {
        if (!profileData?.allTeams) {
            return;
        }
        const map = {};
        profileData?.allTeams?.forEach((team) => {
            map[team.id] = team.name;
        });
        setTeamMap(map);
    }, [profileData]);

    return (
        <div className="flex flex-col justify-between space-y-3">
            <h2 className="text-xl w-full text-center bg-gray-100 py-2">
                {monthName}
            </h2>
            <div className="flex flex-col space-y-2">
                {Object.entries(monthStat)?.map(([teamId, teamStat]) => (
                    <TeamItem
                        key={teamId}
                        teamStat={teamStat}
                        teamName={teamMap?.[teamId]}
                    />
                ))}
            </div>
        </div>
    );
};

export default MonthlyStatsList;
