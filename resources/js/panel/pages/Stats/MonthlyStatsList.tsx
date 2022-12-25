import { AppLayout } from "../Layout";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import useMonthlyStatsData from "../../hooks/useMonthlyStatsData";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../utils/enums";
import ScopeSwitch from "../../components/ScopeSwitch";
import { StoreState } from "../../store/useStore";
import TransactionListSummary from "../Transactions/components/TransactionListSummary/TransactionListSummary";
import Modal from "../../components/Modal";

const MonthlyStatsList = () => {
    const { t } = useTranslation();
    const { isLoading, monthlyStats } = useMonthlyStatsData();
    const { isDrawerOpen, setIsDrawerOpen } = useStore((state) => ({
        isDrawerOpen: state.isDrawerOpen,
        setIsDrawerOpen: state.setIsDrawerOpen,
    }));

    return (
        <AppLayout>
            <div className="mb-5 flex justify-between flex-col md:flex-row">
                <h1 className="text-2xl">{t("monthlyStatsCardHeading")}</h1>
                <ScopeSwitch />
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
            <Modal isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <TransactionListSummary />
            </Modal>
        </AppLayout>
    );
};

const TxItem = ({ txType, txTypeStat }) => {
    const { t } = useTranslation();
    const { setIsDrawerOpen } = useStore((state) => ({
        setIsDrawerOpen: state.setIsDrawerOpen,
    }));

    return (
        <>
            <div className="flex flex-col space-y-1">
                <h4 className="text-xs uppercase">{t(txType)}</h4>
                <div className="flex flex-col bg-100 space-y-1">
                    {Object.entries(txTypeStat)?.map(([currency, valObj]) => (
                        <div
                            key={currency}
                            className="flex space-x-1"
                            onClick={() => setIsDrawerOpen(true, valObj?.[0])}
                        >
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
        </>
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
        <>
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
        </>
    );
};

export default MonthlyStatsList;
