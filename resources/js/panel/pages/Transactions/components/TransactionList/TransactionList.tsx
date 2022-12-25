import { Transaction } from "../../types";
import { FC } from "react";
import TransactionListItem from "../TransactionListItem/TransactionListItem";

interface TransactionListProps {
    transactions: Transaction[];
    className?: string;
    withBorders?: boolean;
}

const TransactionList: FC<TransactionListProps> = (props) => {
    const { transactions, className = "", withBorders = false } = props;

    // flex flex-col
    return (
        <div className={className + ""}>
            {transactions.map((tx) => (
                <TransactionListItem
                    classNames={
                        withBorders ? "border border-solid border-gray-100" : ""
                    }
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
