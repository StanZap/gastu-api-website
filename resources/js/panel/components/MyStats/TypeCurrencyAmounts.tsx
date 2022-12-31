import { StatsItem } from "../../pages/Stats/StatsItem";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { StoreState } from "../../store/useStore";
import { Amount } from "../Amounts";
import CurrencyTeamsSumAmount from "./CurrencyTeamsSumAmount";

interface TypeCurrencyAmountsProps {
    type: string;
    currencyMap: {
        [currency: string]: {
            [teamId: string]: StatsItem[];
        };
    };
}

const TypeCurrencyAmounts: FC<TypeCurrencyAmountsProps> = ({
    type,
    currencyMap,
}) => {
    const { t } = useTranslation();
    const { setIsDrawerOpen } = useStore((state) => ({
        setIsDrawerOpen: state.setIsDrawerOpen,
    }));

    const [teamMap, setTeamMap] = useState({});
    const { profileData } = useStore((state: StoreState) => ({
        profileData: state.profileData,
    }));

    useEffect(() => {
        if (!profileData?.allTeams) {
            return;
        }
        const map = {};
        profileData?.allTeams?.forEach((team) => {
            map[team.id] = team;
        });
        setTeamMap(map);
    }, [profileData]);

    return (
        <div className="flex flex-col space-y-1">
            <h4 className="text-xs uppercase">{t("my" + type)}</h4>
            <div className="flex flex-col bg-100 space-y-1">
                {Object.entries(currencyMap)?.map(([currency, teamTags]) => (
                    <div
                        key={currency}
                        className="flex flex-col space-x-1 items-start"
                    >
                        <CurrencyTeamsSumAmount
                            onShowMore={() => setIsDrawerOpen(true, stats?.[0])}
                            teamsMap={teamTags}
                            type={type}
                            currency={currency}
                        />
                        <div className="flex flex-col space-y-2 pl-2">
                            {/*team tag design*/} {/* amount */}
                            {Object.entries(teamTags).map(([teamId, item]) => (
                                <div key={teamId} className="flex space-x-1">
                                    <div className="bg-blue-500 text-xs py-1 px-2 text-gray-200">
                                        {teamMap[teamId]?.name}
                                    </div>
                                    <Amount
                                        type={type}
                                        amount={item[0].amount}
                                        currency={currency}
                                        amountSizeClass={"text-md"}
                                        currencySizeClass={"text-sm"}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TypeCurrencyAmounts;
