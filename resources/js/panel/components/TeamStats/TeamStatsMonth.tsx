import { Amount } from "../Amounts";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { MyStatsMonth } from "../../pages/Stats/StatsItem";
import { FC, useEffect, useState } from "react";
import { StoreState } from "../../store/useStore";
import { EyeIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { AmountUserList } from "./";
import { createSearchParams, useNavigate } from "react-router-dom";

interface AmountItemProps {
    stats: Array<MyStatsMonth>;
    onShowMore: () => void;
}

const AmountSum: FC<AmountItemProps> = ({ stats, onShowMore }) => {
    const { amount: total } = stats.reduce((acc, item) => {
        return {
            amount: +acc.amount + +item.amount,
        } as any;
    });

    return (
        <Amount
            onClick={onShowMore}
            type={stats?.[0]?.type}
            amount={total}
            currency={stats?.[0]?.currency}
        />
    );
};

interface TxItemProps {
    txType: string;
    txTypeStat: { currency: Array<MyStatsMonth> };
    isPersonalTeam: boolean;
}

const TxItem: FC<TxItemProps> = ({ isPersonalTeam, txType, txTypeStat }) => {
    const { t } = useTranslation();
    const { setIsDrawerOpen } = useStore((state) => ({
        setIsDrawerOpen: state.setIsDrawerOpen,
    }));

    const handleShowMoreOfAll = (stat) => {
        const context = { ...stat };
        delete context.account_owner_id;
        setIsDrawerOpen(true, context);
    };

    const handleShowMoreForTeam = (stat) => {
        setIsDrawerOpen(true, stat);
    };

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
                            onShowMore={() => handleShowMoreOfAll(stats?.[0])}
                            stats={stats}
                        />
                        {!isPersonalTeam && (
                            <AmountUserList
                                onShowMore={handleShowMoreForTeam}
                                stats={stats}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const TeamItem = ({ team, teamStat, month }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goToTeamDetails = () => {
        navigate({
            pathname: "/closure",
            search: `?${createSearchParams({
                month,
                teamId: team.id,
            })}`,
        });
    };

    return (
        <div
            className={
                "rounded-lg flex flex-col space-y-2 p-5  " +
                (team.personal_team ? "bg-gray-200" : "")
            }
        >
            {!team.personal_team ? (
                <div className="flex justify-between">
                    <div className="flex space-x-2 items-center">
                        <UserGroupIcon className="w-8 h-8" />
                        <h4 className="text-md uppercase first-letter:text-3xl">
                            {team.name}
                        </h4>
                    </div>
                    <button
                        onClick={goToTeamDetails}
                        className="flex space-x-1 items-center"
                    >
                        <EyeIcon className="w-4 h-4" />
                        <span>{t("viewClosure")}</span>
                    </button>
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

const TeamStatsMonth = ({ monthName, monthStat, month }) => {
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
                                month={month}
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

export default TeamStatsMonth;
