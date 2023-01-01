import { FC } from "react";
import { StatsItem } from "../../pages/Stats/StatsItem";
import { Amount } from "../Amounts";

interface CurrencyTeamsSumAmountProps {
    type: string;
    currency: string;
    teamsMap: Array<StatsItem>;
    onShowMore: () => void;
}

const CurrencyTeamsSumAmount: FC<CurrencyTeamsSumAmountProps> = (props) => {
    const { type, currency, teamsMap, onShowMore } = props;
    const { amount: total } = Object.values(teamsMap)
        .map((arr) => arr[0])
        .reduce((acc, item) => {
            return { amount: +acc.amount + +item.amount };
        }) as { amount: number };

    return (
        total && (
            <Amount
                onClick={() => onShowMore()}
                amount={total}
                currency={currency}
                type={type}
            />
        )
    );
};

export default CurrencyTeamsSumAmount;
