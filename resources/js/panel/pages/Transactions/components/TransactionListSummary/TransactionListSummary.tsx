import useTransactionListSummary from "../../../../hooks/useTransactionListSummary";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useStore } from "../../../../store";
import Loader from "../../../../components/Loader";
import TransactionListItem from "../TransactionListItem/TransactionListItem";
import { useSearchParams } from "react-router-dom";

const TransactionListSummary = () => {
    const { stat, teams } = useStore((state) => ({
        teams: state.profileData.allTeams || [],
        stat: state.drawerContext,
    }));
    const { t } = useTranslation();
    const [params, setParams] = useState(null);
    const { isLoading, transactionList } = useTransactionListSummary(params);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!stat) return;

        setParams({
            month: stat?.month?.split("-")?.[0],
            year: stat?.month?.split("-")?.[1],
            type: stat.type,
            teamId: stat.team_id,
            currency: stat.currency,
            scope: searchParams.get("scope", undefined),
        });
    }, [stat]);

    const getTitle = () => {
        const $type = `${t(stat.type)}s`;
        const team = teams.find((t) => t.id === stat.team_id)?.name ?? "";
        const [month, year] = stat.month.split("-");
        const monthYear = `${t("months")[month - 1].substr(0, 3)} ${year}`;
        return `${$type} ${team}, ${monthYear} (${transactionList.length})`;
    };

    return isLoading ? (
        <Loader />
    ) : (
        stat && (
            <div className="py-4">
                <h1 className="px-8 uppercase text-md ">{getTitle()}</h1>
                <div className="flex flex-col space-y-3 max-h-96 overflow-y-auto">
                    {transactionList.map((tx, index) => (
                        <TransactionListItem
                            key={tx.id}
                            order={index + 1}
                            transaction={tx}
                            showAccount={true}
                            showTeam={true}
                        />
                    ))}
                    {transactionList.length === 0 ? (
                        <p className="pt-4 text-gray-700">
                            {t("noTransactions")}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    );
};

export default TransactionListSummary;
