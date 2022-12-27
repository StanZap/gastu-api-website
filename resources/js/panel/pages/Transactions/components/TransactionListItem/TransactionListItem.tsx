import { FC } from "react";
import { Transaction } from "../../types";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../utils/methods";
import { useTranslation } from "react-i18next";

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
                " px-8 py-3 even:bg-gray-100 flex flex-col capitalize relative"
            }
        >
            {order ? (
                <div className="absolute text-xs bottom-0 right-0 py-2 px-3 text-gray-400">
                    {order}
                </div>
            ) : (
                <></>
            )}
            <h3>{tx.subject}</h3>
            <div className="space-x-1">
                <span className="text-3xl">{tx.amount}</span>
                <span className="text-xl">{tx.currency}</span>
            </div>
            <span className="text-sm text-gray-700">
                On {formatDate(tx.when)}
            </span>
            <span>{tx.user?.name ? `${t(`by`)} ${tx.user.name}` : <></>}</span>
            {showAccount ? (
                <div className="flex flex-col mt-2">
                    <span className="text-gray-500 uppercase text-xs">
                        {t("fields.account") + ":"}
                    </span>
                    <span>{`${tx.account?.title}, ${tx.account?.provider_name}`}</span>
                </div>
            ) : (
                <></>
            )}
            {showTeam ? (
                <div className="flex flex-col mt-2">
                    <span className="text-gray-500 uppercase text-xs">
                        {t("fields.team") + ":"}
                    </span>
                    <span>{tx.team?.name}</span>
                </div>
            ) : (
                <></>
            )}
        </NavLink>
    );
};

export default TransactionListItem;
