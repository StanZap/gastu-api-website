import { Transaction } from "../../types";
import { FC } from "react";
import TransactionListItem from "../TransactionListItem/TransactionListItem";

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: FC<TransactionListProps> = (props) => {
    const { transactions } = props;

    return (
        <div className="flex flex-col">
            {transactions.map((tx) => (
                <TransactionListItem
                    key={tx.id}
                    transaction={tx}
                    showTeam={true}
                    showAccount={true}
                />
            ))}
        </div>
    );
};

export default TransactionList;
