import { FC } from "react";
import { Transaction } from "../../types";
import { NavLink } from "react-router-dom";
import { formatCurrency, formatDate } from "../../../../utils/methods";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../../../utils/enums";
import {
    CalendarDaysIcon,
    PencilSquareIcon,
    UserIcon,
} from "@heroicons/react/20/solid";

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
            <div className="space-x-1">
                {tx.type === TransactionType.Income ? (
                    <span className="text-green-700 text-3xl font-bold">
                        {formatCurrency(tx.amount)}
                    </span>
                ) : (
                    <span className="text-red-700 text-3xl font-bold">
                        {formatCurrency(tx.amount)}
                    </span>
                )}
                <span className="text-xl">{tx.currency}</span>
            </div>
            <div className="flex text-sm items-center space-x-1 text-gray-700 ">
                <UserIcon className="w-4 h-4" />
                <span>{tx.user?.name ? `${tx.user.name}` : <></>}</span>
            </div>
            <div className="text-gray-700 text-sm flex items-center space-x-1 text-gray-700 ">
                <CalendarDaysIcon className="w-4 h-4" />
                <span className="">{formatDate(tx.when)}</span>
            </div>
            <div className="text-gray-700 text-sm flex items-center space-x-1 text-gray-700 ">
                <PencilSquareIcon className="w-4 h-4" />
                <span>{tx.subject}</span>
            </div>
            <div className="flex space-x-1">
                {showAccount ? (
                    <div className="flex-1 flex flex-col mt-2">
                        <span className="text-gray-500 uppercase text-xs">
                            {t("fields.account") + ":"}
                        </span>
                        <span>{`${tx.account?.title}, ${tx.account?.provider_name}`}</span>
                    </div>
                ) : (
                    <></>
                )}
                {showTeam ? (
                    <div className="flex-1 flex flex-col mt-2">
                        <span className="text-gray-500 uppercase text-xs">
                            {t("fields.team") + ":"}
                        </span>
                        <span>{tx.team?.name}</span>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </NavLink>
    );
};

export default TransactionListItem;
