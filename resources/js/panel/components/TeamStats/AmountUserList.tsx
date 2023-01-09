import { FC } from "react";
import { StatsItem } from "../../pages/Stats/StatsItem";
import { Amount } from "../Amounts";

interface AmountUserListProps {
    stats: StatsItem[];
    onShowMore: (item: StatsItem) => void;
}

const AmountUserList: FC<AmountUserListProps> = ({ stats, onShowMore }) => {
    return (
        <div className="flex flex-col items-start space-y-1">
            {stats?.map((item: StatsItem, index: number) => (
                <div className="flex flex-col" key={index}>
                    <div className="text-md text-gray-600 capitalize">
                        <span className="mr-2 text-gray-400">&bull;</span>
                        <span className="text-sm text-gray-600">
                            {item.user}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                        <span>&nbsp;</span>
                        <Amount
                            onClick={() => onShowMore(item)}
                            type={item.type}
                            amount={item.amount}
                            currency={item.currency}
                            currencySizeClass={"text-sm"}
                            amountSizeClass={"text-sm"}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AmountUserList;
