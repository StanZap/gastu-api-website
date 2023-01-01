import { FC } from "react";
import { Transaction } from "../../types";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../utils/methods";
import { useTranslation } from "react-i18next";
import { CalendarDaysIcon, UserIcon } from "@heroicons/react/20/solid";
import { Amount } from "../../../../components/Amounts";

interface TransactionListItemProps {
    order?: number;
    transaction: Transaction;
    showTeam?: boolean;
    showAccount?: boolean;

    classNames?: string;
}

const TransactionListItem: FC<TransactionListItemProps> = (props) => {
    const {
        order,
        transaction: tx,
        showTeam = false,
        showAccount = false,
        classNames = "",
    } = props;
    const { t } = useTranslation();

    return (
        <NavLink
            to={`/transactions/${tx.id}/details`}
            className={
                classNames +
                " px-8 py-3 even:bg-gray-100 flex flex-col relative"
            }
        >
            {order ? (
                <div className="absolute text-xs bottom-0 right-0 py-2 px-3 text-gray-400">
                    {order}
                </div>
            ) : (
                <></>
            )}
            <div className="text-gray-700 text-md flex items-center space-x-1 text-gray-700 ">
                <span>{tx.subject}</span>
            </div>
            <Amount type={tx.type} amount={tx.amount} currency={tx.currency} />
            <div className="text-sm flex items-center space-x-1 text-gray-600 ">
                <UserIcon className="w-4 h-4" />
                <span>{tx.user_name ? `${tx.user_name}` : <></>}</span>
            </div>
            <div className="text-sm flex items-center space-x-1 text-gray-600 ">
                <CalendarDaysIcon className="w-4 h-4" />
                <span className="">{formatDate(tx.when)}</span>
            </div>
            <div className="flex md:space-x-1 flex-col md:flex-row">
                {showAccount ? (
                    <div className="flex-1 flex flex-col mt-2">
                        <span className="text-gray-500 uppercase text-xs">
                            {t("fields.account") + ":"}
                        </span>
                        <span className="text-sm">{`${tx.account_title}, ${tx.account_provider} (${tx.account_owner_team})`}</span>
                    </div>
                ) : (
                    <></>
                )}
                {showTeam ? (
                    <div className="flex-1 flex flex-col mt-2">
                        <span className="text-gray-500 uppercase text-xs">
                            {t("fields.team") + ":"}
                        </span>
                        <span className="text-sm">{tx.team_name}</span>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </NavLink>
    );
};

export default TransactionListItem;
