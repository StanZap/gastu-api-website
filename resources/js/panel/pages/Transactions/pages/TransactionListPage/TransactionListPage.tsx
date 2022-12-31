import { Link } from "react-router-dom";
import Pagination from "../../../../components/Pagination";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/20/solid";
import NoItems from "../../../../components/NoItem";
import Loader from "../../../../components/Loader";
import useTransactionListData from "../../../../hooks/useTransactionListData";
import { useStore } from "../../../../store";
import { useEffect } from "react";
import { TxScopeSwitch } from "../../../../components/ScopeSwitch";
import TransactionsTable from "../../components/TransactionsTable";
import TransactionList from "../../components/TransactionList";
import ListViewSwitch, {
    ListViewTypeEnum,
} from "../../../../components/ListViewSwitch";

export default function TransactionListPage() {
    const { isLoading, paginatedList, sort, searchParams } =
        useTransactionListData();
    const { t } = useTranslation();
    const { profileData } = useStore((state) => ({
        profileData: state.profileData,
    }));

    const isTableView = () =>
        searchParams.get("view") === ListViewTypeEnum.TABLE;
    const isGridView = () => searchParams.get("view") === ListViewTypeEnum.GRID;
    const isListView = () => {
        const view = searchParams.get("view");
        return !view || view === ListViewTypeEnum.LIST;
    };

    useEffect(() => {
        if (!profileData?.allTeams) {
            return;
        }
    }, [profileData]);

    return (
        <>
            {/*<GeneralStats*/}
            {/*  transactionType={TransactionType.Expense}*/}
            {/*  className="mb-10"*/}
            {/*/>*/}
            <div className="sm:px-6 lg:px-8">
                <div className="flex justify-between sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            {t("transactions")}
                        </h1>
                        <p className="md:mt-2 text-sm text-gray-700">
                            {t("transactionListMessage")}
                        </p>
                    </div>
                    <div className="hidden lg:flex mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-2 items-center">
                        <Link
                            to={"./add"}
                            className="h-9 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <PlusIcon className="mr-1 h-4 w-4" />
                            <span>{t("registerTransactionLink")}</span>
                        </Link>
                        <ListViewSwitch />
                        <TxScopeSwitch />
                    </div>
                </div>
                <div className="flex lg:hidden mt-4 space-x-1 justify-between">
                    <Link
                        to={"./add"}
                        className="h-9 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        <PlusIcon className="mr-1 h-4 w-4" />
                        <span className="hidden xs:block">
                            {t("registerTransactionLinkShort")}
                        </span>
                    </Link>
                    <TxScopeSwitch className="" />
                </div>
                {searchParams && (
                    <Pagination
                        {...paginatedList}
                        search={searchParams.get("search")}
                    />
                )}
                {isLoading ? (
                    <Loader />
                ) : paginatedList?.data?.length === 0 ? (
                    <NoItems
                        nothingToShow={t("nothingToShow")}
                        addItems={t("addTransactions")}
                    />
                ) : (
                    <>
                        <div className="flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        {isTableView() ? (
                                            <TransactionsTable
                                                transactions={
                                                    paginatedList?.data
                                                }
                                                sort={sort}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        {isGridView() ? (
                                            <TransactionList
                                                className="grid grid-cols-3 grid-flow-row gap-2"
                                                withBorders={true}
                                                transactions={
                                                    paginatedList?.data || []
                                                }
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        {isListView() ? (
                                            <TransactionList
                                                transactions={
                                                    paginatedList?.data || []
                                                }
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
