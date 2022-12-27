import { FC } from "react";
import { Transaction } from "../../types";
import TransactionListItem from "../TransactionListItem/TransactionListItem";

interface TransactionListProps {
    transactions: Transaction[];
    className?: string;
    withBorders?: boolean;
}

const TransactionList: FC<TransactionListProps> = (props) => {
    const { transactions, className = "", withBorders = false } = props;

    return (
        <div className={className + ""}>
            {transactions.map((tx, index) => (
                <TransactionListItem
                    classNames={
                        withBorders ? "border border-solid border-gray-100" : ""
                    }
                    key={tx.id}
                    order={index + 1}
                    transaction={tx}
                    showTeam={true}
                    showAccount={true}
                />
            ))}
        </div>
    );
};

export default TransactionList;
