import { AppLayout } from "../Layout";
import { useStore } from "../../store";
import useMonthlyStatsData from "../../hooks/useMonthlyStatsData";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import TransactionListSummary from "../Transactions/components/TransactionListSummary/TransactionListSummary";
import Modal from "../../components/Modal";
import { StatsScopeSwitch } from "../../components/ScopeSwitch";
import { MyStatsMonthItem } from "../../components/MyStats";
import { useSearchParams } from "react-router-dom";
import { TeamStatsMonth } from "../../components/TeamStats";

const MonthlyStatsList = () => {
    const { t } = useTranslation();
    const { isLoading, monthlyStats } = useMonthlyStatsData();
    const { isDrawerOpen, setIsDrawerOpen } = useStore((state) => ({
        isDrawerOpen: state.isDrawerOpen,
        setIsDrawerOpen: state.setIsDrawerOpen,
    }));
    const [searchParams] = useSearchParams();

    return (
        <AppLayout>
            <div className="flex justify-between flex-col md:flex-row">
                <h1 className="text-2xl">{t("monthlyStatsCardHeading")}</h1>
                <StatsScopeSwitch />
            </div>
            {isLoading ? (
                <Loader />
            ) : searchParams?.get("scope") !== "team" ? (
                <div className="flex flex-col space-y-2">
                    {monthlyStats &&
                        monthlyStats.data?.map(([monthYear, monthStat]) => (
                            <MyStatsMonthItem
                                key={monthYear}
                                monthName={
                                    t("months")?.find(
                                        (_, index) =>
                                            index ===
                                            +monthYear.split("-")[1] - 1
                                    ) +
                                    " " +
                                    monthYear.split("-")[0]
                                }
                                monthStat={monthStat}
                            />
                        ))}
                </div>
            ) : (
                <div className="flex flex-col space-y-2">
                    {monthlyStats &&
                        monthlyStats.data?.map(([monthYear, monthStat]) => (
                            <TeamStatsMonth
                                month={monthYear}
                                monthStat={monthStat}
                                monthName={
                                    t("months")?.find(
                                        (_, index) =>
                                            index ===
                                            +monthYear.split("-")[1] - 1
                                    ) +
                                    " " +
                                    monthYear.split("-")[0]
                                }
                                key={monthYear}
                            />
                        ))}
                </div>
            )}
            <Modal isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <TransactionListSummary />
            </Modal>
        </AppLayout>
    );
};

export default MonthlyStatsList;
