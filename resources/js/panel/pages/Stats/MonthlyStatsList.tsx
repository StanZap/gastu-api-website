import { AppLayout } from "../Layout";
import { useStore } from "../../store";
import { FC, useEffect, useState } from "react";
import useMonthlyStatsData from "../../hooks/useMonthlyStatsData";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../utils/enums";
import { StatsItem, StoreState } from "../../store/useStore";
import TransactionListSummary from "../Transactions/components/TransactionListSummary/TransactionListSummary";
import Modal from "../../components/Modal";
import { formatCurrency } from "../../utils/methods";
import { UserGroupIcon } from "@heroicons/react/20/solid";
// import ScopeSwitch from "../../components/ScopeSwitch";

const MonthlyStatsList = () => {
    const { t } = useTranslation();
    const { isLoading, monthlyStats } = useMonthlyStatsData();
    const { isDrawerOpen, setIsDrawerOpen } = useStore((state) => ({
        isDrawerOpen: state.isDrawerOpen,
        setIsDrawerOpen: state.setIsDrawerOpen,
    }));

    return (
        <AppLayout>
            <div className="flex justify-between flex-col md:flex-row">
                <h1 className="text-2xl">{t("monthlyStatsCardHeading")}</h1>
                {/*<ScopeSwitch />*/}
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col space-y-2">
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

const AmountUserList: FC<{ stats: StatsItem[] }> = ({ stats }: {}) => {
    return (
        <div className="flex flex-col items-start space-y-1">
            {stats?.map((item: StatsItem, index: number) => (
                <div className="flex flex-col" key={index}>
                    <div className="text-md text-gray-600 capitalize">
                        <span className="mr-2 text-gray-400">&bull;</span>
                        <span className="text-md text-gray-600">
                            {item.user}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                        <span>&nbsp;</span>
                        <span className="text-lg">
                            {formatCurrency(item.amount)}
                        </span>
                        <span className="text-xs text-gray-500">
                            {item.currency}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

interface AmountItemProps {
    stats: Array<StatsItem>;
    onShowMore: () => void;
}

const AmountSum: FC<AmountItemProps> = ({ stats, onShowMore }) => {
    const { amount: total } = stats.reduce((acc, item) => {
        return {
            amount: +acc.amount + +item.amount,
        } as any;
    });

    return (
        <div
            className="flex items-center space-x-1 cursor-pointer hover:opacity-75"
            onClick={onShowMore}
        >
            {stats?.[0]?.type === TransactionType.Income ? (
                <span className="text-green-700 text-2xl font-bold">
                    {formatCurrency(total)}
                </span>
            ) : (
                <span className="text-red-700 text-2xl font-bold">
                    {formatCurrency(total)}
                </span>
            )}
            <span className="text-green-700 text-lg">
                {stats?.[0]?.currency}
            </span>
        </div>
    );
};

interface TxItemProps {
    txType: string;
    txTypeStat: { currency: Array<StatsItem> };
    isPersonalTeam: boolean;
}

const TxItem: FC<TxItemProps> = ({ isPersonalTeam, txType, txTypeStat }) => {
    const { t } = useTranslation();
    const { setIsDrawerOpen } = useStore((state) => ({
        setIsDrawerOpen: state.setIsDrawerOpen,
    }));

    return (
        <div className="flex flex-col space-y-1">
            <h4 className="text-xs uppercase">
                {isPersonalTeam ? t("my" + txType) : t(txType + "s")}
            </h4>
            <div className="flex flex-col bg-100 space-y-1">
                {Object.entries(txTypeStat)?.map(([currency, stats]) => (
                    <div
                        key={currency}
                        className="flex flex-col space-x-1 items-start"
                    >
                        <AmountSum
                            onShowMore={() => setIsDrawerOpen(true, stats?.[0])}
                            stats={stats}
                        />
                        {!isPersonalTeam && <AmountUserList stats={stats} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

const TeamItem = ({ team, teamStat }) => {
    return (
        <div
            className={
                "rounded-lg flex flex-col space-y-2 p-5  " +
                (team.personal_team ? "bg-gray-200" : "")
            }
        >
            {!team.personal_team ? (
                <div className="flex space-x-2 items-center">
                    <UserGroupIcon className="w-8 h-8" />
                    <h4 className="text-md uppercase first-letter:text-3xl">
                        {team.name}
                    </h4>
                </div>
            ) : (
                <></>
            )}
            <div className="flex flex-col md:flex-row space-y-4 md:space-x-10 md:space-y-0 justify-start">
                {Object.entries(teamStat)?.map(([txType, txTypeStat]) => (
                    <TxItem
                        isPersonalTeam={team.personal_team}
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
            map[team.id] = team;
        });
        setTeamMap(map);
    }, [profileData]);

    return (
        <div className="flex flex-col justify-between space-y-3">
            <h2 className="text-md w-full text-center uppercase border-top border-gray-500 border-solid text-gray-500 mt-4 ">
                {monthName}
            </h2>
            <div className="flex flex-col space-y-2 bg-gray-100 rounded-lg">
                {Object.entries(monthStat)?.map(
                    ([teamId, teamStat]) =>
                        teamMap[teamId] && (
                            <TeamItem
                                key={teamId}
                                teamStat={teamStat}
                                team={teamMap?.[teamId]}
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default MonthlyStatsList;
