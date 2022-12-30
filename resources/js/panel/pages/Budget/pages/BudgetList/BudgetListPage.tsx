import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import useBudgetData from "../../../../hooks/useBudgetData";
import { useState } from "react";
import { formatCurrency } from "../../../../utils/methods";
import Modal from "../../../../components/Modal";
import { NavLink } from "react-router-dom";

const BudgetListPage = () => {
    const { budgets, isLoading } = useBudgetData();
    const { t } = useTranslation();
    const [isBudgetListOpen, setIsBudgetListOpen] = useState("");

    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-gray-900 font-bold text-3xl mb-4">
                    {t("myBudgets")}
                </h1>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-col space-y-5">
                        {budgets?.map((budget) => (
                            <BudgetSummary
                                isBudgetListOpen={isBudgetListOpen}
                                setIsBudgetListOpen={setIsBudgetListOpen}
                                key={budget.id}
                                budget={budget}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Modal
                isOpen={isBudgetListOpen !== ""}
                setIsOpen={setIsBudgetListOpen}
            >
                <BudgetList budget={isBudgetListOpen} />
            </Modal>
        </>
    );
};

const BudgetSummary = ({ budget }) => {
    const { t } = useTranslation();

    const getMonth = () => {
        return t("months")?.[dayjs(budget.startdate).month()];
    };

    const byType = {};
    budget.items.forEach((item) => {
        if (!byType[item.type]) {
            byType[item.type] = {};
        }
        if (!byType[item.type][item.currency]) {
            byType[item.type][item.currency] = 0;
        }
        byType[item.type][item.currency] += +item.amount;
        return byType;
    });

    return (
        <div className="flex flex-col space-y-1 cursor-pointer">
            <div className="flex w-full justify-between">
                <h1 className="text-xl text-gray-700 font-bold">
                    {budget.team?.name} {getMonth()}
                </h1>
                <NavLink className="text-md" to={"/budgets/" + budget.id}>
                    {t("viewMore")}
                </NavLink>
            </div>
            <div className="flex py-1 px-4 flex-col space-y-8">
                {Object.entries(byType).map(([type, currencyMap]) => (
                    <div key={type} className="flex flex-col space-y-2">
                        <h2 className="text-lg text-gray-600">
                            {t("my" + type)}
                        </h2>
                        <div className="grid lg:grid-cols-3 gap-4">
                            {Object.entries(currencyMap).map(
                                ([currency, amount]) => (
                                    <CurrencyAmount
                                        key={currency}
                                        currency={currency}
                                        amount={amount}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CurrencyAmount = ({ currency, amount }) => {
    return (
        <div className="flex rounded-lg space-x-1 bg-gray-300 hover:bg-gray-200 px-5 py-5">
            <span className="text-3xl">{formatCurrency(amount)}</span>
            <span className="text-lg">{currency}</span>
        </div>
    );
};

const BudgetList = ({ budget }) => {
    return (
        <div className="flex flex-col space-y-5">
            <h1 className="text-2xl font-bold text-gray-900">{budget?.name}</h1>
            <div className="flex flex-col space-y-5">
                {budget?.items.map((item) => (
                    <BudgetItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

const BudgetItem = ({ item }) => {
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-bold text-gray-900">{item.subject}</h1>
            <span>{item.description}</span>
            <span>{item.type}</span>
            <div className="flex space-x-1">
                <span className="text-xl">{item.amount}</span>
                <span>{item.currency}</span>
            </div>
        </div>
    );
};
export default BudgetListPage;
