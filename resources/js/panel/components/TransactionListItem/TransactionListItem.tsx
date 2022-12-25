import { Transaction } from "../../pages/Transactions/types";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../utils/methods";

interface TransactionListItemProps {
    tx: Transaction;
}

const TransactionListItem: RC<TransactionListItemProps> = ({ tx }) => {
    return (
        <NavLink
            to={`../transactions/${tx.id}/details`}
            className="px-8 py-3 even:bg-gray-100 flex flex-col space-y-0"
        >
            <h3>{tx.subject}</h3>
            <div className="space-x-1">
                <span className="text-3xl">{tx.amount}</span>
                <span className="text-xl">{tx.currency}</span>
            </div>
            <div className="flex space-x-1 items-center">
                <span className="text-sm text-gray-700">
                    On {formatDate(tx.when)}
                </span>
                <span>{tx.user?.name ? `By ${tx.user.name}` : ""}</span>
            </div>
        </NavLink>
    );
};

export default TransactionListItem;
