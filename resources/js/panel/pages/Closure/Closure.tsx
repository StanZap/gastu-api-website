import { AppLayout } from "../Layout";
import { useTranslation } from "react-i18next";
import { Amount } from "../../components/Amounts";
import { DEFAULT_CURRENCY } from "../../utils/methods";
import { TransactionType } from "../../utils/enums";
import { Disclosure } from "@headlessui/react";
import {
    CheckBadgeIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from "@heroicons/react/20/solid";
import AmountUserList from "../../components/TeamStats/AmountUserList";
import { SubmitButton } from "../../components/Buttons";
import { useEffect, useState } from "react";
import { fetchMonthClosureStats } from "../../services/StatsService";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";

const Closure = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState(null);
    const [pendingItems, setPendingItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const month = 12;
    const currency = DEFAULT_CURRENCY;
    const navigate = useNavigate();

    const handlePendingAction = () => {
        navigate("/transactions/add");
    };

    const load = async () => {
        setIsLoading(true);
        const month = searchParams.get("month");
        const teamId = searchParams.get("teamId");
        const resp = await fetchMonthClosureStats({ month, teamId });
        setData(resp.data);
        setIsLoading(false);
    };

    const findPendingItems = (data) => {
        const pendingItems = [];
        data.actual.forEach((actualItem) => {
            const expectedItem = data.expected.find(
                (item) => item.team_id === actualItem.team_id
            );
            if (!expectedItem) return;
            const actual = +actualItem.amount;
            const expected = +expectedItem.amount;

            if (actual === expected) return;

            let pendingType: "deficit" | "surplus";
            pendingType = actual < expected ? "deficit" : "surplus";

            const pendingItem = {
                type: pendingType,
                user: actualItem.user,
                amount:
                    pendingType === "deficit"
                        ? expected - actual
                        : actual - expected,
                currency: actualItem.currency,
            };
            pendingItems.push(pendingItem);
        });

        setPendingItems(pendingItems);
    };

    useEffect(() => {
        load();
    }, [searchParams]);

    useEffect(() => {
        data && findPendingItems(data);
    }, [data]);

    const getPendingText = (item) => {
        const text = t(item.type).replace("{user}", item.user);
        return (
            <p>
                {text}
                <Amount
                    type={TransactionType.Income}
                    amount={item.amount}
                    currency={item.currency}
                    amountSizeClass="text-lg"
                    currencySizeClass="text-md"
                />
            </p>
        );
    };

    return (
        <AppLayout>
            <div className="flex justify-between flex-col md:flex-row">
                <h1 className="text-2xl mb-2">
                    {t("closure")} {t("months")[month - 1]}
                </h1>
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-bold">Ingresos</h3>
                        <div className="flex flex-col space-y-2">
                            <Disclosure>
                                {({ open }) => (
                                    <div>
                                        <Disclosure.Button className="flex items-start">
                                            {open ? (
                                                <ChevronDownIcon className="w-4 h-4 mr-2 text-gray-400" />
                                            ) : (
                                                <ChevronRightIcon className="w-4 h-4 mr-2 text-gray-400" />
                                            )}
                                            <div className="text-left">
                                                <div className="uppercase text-gray-400 text-sm -mt-[1px]">
                                                    {t("expectedIncomeHeading")}
                                                </div>
                                                <div>
                                                    <Amount
                                                        type={
                                                            TransactionType.Income
                                                        }
                                                        amount={
                                                            data.totalExpected
                                                        }
                                                        currency={currency}
                                                    />
                                                </div>
                                            </div>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="text-gray-500 ml-6">
                                            <div>
                                                <AmountUserList
                                                    onShowMore={() =>
                                                        ({} as any)
                                                    }
                                                    stats={data.expected}
                                                />
                                            </div>
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                            <Disclosure>
                                {({ open }) => (
                                    <div>
                                        <Disclosure.Button className="py-2 flex items-start">
                                            {open ? (
                                                <ChevronDownIcon className="w-4 h-4 mr-2 text-gray-400" />
                                            ) : (
                                                <ChevronRightIcon className="w-4 h-4 mr-2 text-gray-400" />
                                            )}
                                            <div className="text-left">
                                                <div className="uppercase text-gray-400 text-sm -mt-[1px]">
                                                    {t("actualIncomeHeading")}
                                                </div>
                                                <div>
                                                    <Amount
                                                        type={
                                                            TransactionType.Income
                                                        }
                                                        amount={
                                                            data.totalActual
                                                        }
                                                        currency={currency}
                                                    />
                                                </div>
                                            </div>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="text-gray-500 ml-6">
                                            <div>
                                                <AmountUserList
                                                    onShowMore={() =>
                                                        ({} as any)
                                                    }
                                                    stats={data.actual}
                                                />
                                            </div>
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-bold">Estado</h3>
                        <div className="flex flex-col space-y-3">
                            {pendingItems.length > 0 ? (
                                pendingItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col space-y-1"
                                    >
                                        <span>{getPendingText(item)}</span>
                                        <div>
                                            <SubmitButton
                                                onClick={() =>
                                                    handlePendingAction(item)
                                                }
                                                label={t("resolvePendingBtn")}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex align-start">
                                    <div className="py-2 px-3 bg-gray-200 rounded-full flex space-x-1 items-center ">
                                        <span>{t("closureComplete")}</span>
                                        <CheckBadgeIcon className="w-4 h-4" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default Closure;
