import { Transaction } from "../../types";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../utils/methods";
import { useTranslation } from "react-i18next";

interface TransactionListItemProps {
    transaction: Transaction;
    showTeam: boolean;
    showAccount: boolean;

    classNames?: string;
}

const TransactionListItem: RC<TransactionListItemProps> = (props) => {
    const { transaction: tx, showTeam, showAccount, classNames = "" } = props;
    const { t } = useTranslation();

    return (
        <NavLink
            to={`/transactions/${tx.id}/details`}
            className={
                classNames +
                " px-8 py-3 even:bg-gray-100 flex flex-col space-y-0 capitalize"
            }
        >
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
                <span>{`${t("fields.account")}: ${tx.account?.title}, ${
                    tx.account?.provider_name
                }`}</span>
            ) : (
                <></>
            )}
            {showTeam ? (
                <span>{`${t("fields.team")}: ${tx.team?.name}`}</span>
            ) : (
                <></>
            )}
        </NavLink>
    );
};

export default TransactionListItem;
