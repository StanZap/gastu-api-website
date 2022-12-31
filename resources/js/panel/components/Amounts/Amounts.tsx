import { FC } from "react";
import { TransactionType } from "../../utils/enums";
import { formatCurrency } from "../../utils/methods";

interface AmountProps {
    type: string;
    amount: number;
    currency: string;
    amountSizeClass?: string;
    currencySizeClass?: string;
    onClick?: () => void;
}

export const Amount: FC<AmountProps> = ({
    type,
    amount,
    currency,
    amountSizeClass,
    currencySizeClass,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center space-x-1 cursor-pointer hover:opacity-75"
        >
            {type === TransactionType.Income ? (
                <span
                    className={
                        (amountSizeClass || "text-2xl") +
                        " text-green-700  font-bold"
                    }
                >
                    {formatCurrency(amount)}
                </span>
            ) : (
                <span
                    className={
                        (amountSizeClass || "text-2xl") +
                        " text-red-700 font-bold"
                    }
                >
                    {formatCurrency(amount)}
                </span>
            )}
            <span
                className={
                    (currencySizeClass || "text-lg") + " text-green-700 "
                }
            >
                {currency}
            </span>
        </div>
    );
};
