import { Link } from "react-router-dom";
import Pagination from "../../../../components/Pagination";
import { formatDateTime } from "../../../../utils/methods";
import SortIcon from "../../../../components/SortIcon/SortIcon";
import { useTranslation } from "react-i18next";
import { EyeIcon, PlusIcon } from "@heroicons/react/20/solid";
import NoItems from "../../../../components/NoItem";
import Loader from "../../../../components/Loader";
// import { GeneralStats } from "../../../../components/Stats";
import useTransactionListData from "../../../../hooks/useTransactionListData";

export default function TransactionList() {
    const { isLoading, paginatedList, sort, searchParams } =
        useTransactionListData();
    const { t } = useTranslation();

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
                        <p className="mt-2 text-sm text-gray-700">
                            {t("transactionListMessage")}
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to={"./add"}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <PlusIcon className="mr-1 h-4 w-4" />
                            <span className="hidden sm:block">
                                {t("registerTransactionLink")}
                            </span>
                        </Link>
                    </div>
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
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr className="divide-x divide-gray-200">
                                                    <th
                                                        scope="col"
                                                        onClick={() =>
                                                            sort("id")
                                                        }
                                                        className="cursor-pointer truncate py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        <div className="flex items-center">
                                                            ID
                                                            <SortIcon field="id" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        onClick={() =>
                                                            sort("when")
                                                        }
                                                        className="cursor-pointer  py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        <div className="flex items-center">
                                                            {t("fields.when")}
                                                            <SortIcon field="when" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        onClick={() =>
                                                            sort("subject")
                                                        }
                                                        className=" cursor-pointer py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        <div className="flex items-center">
                                                            {t(
                                                                "fields.subject"
                                                            )}
                                                            <SortIcon field="subject" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        onClick={() =>
                                                            sort("type")
                                                        }
                                                        className="cursor-pointer py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        <div className="flex items-center">
                                                            {t(
                                                                "fields.transactionTypeShort"
                                                            )}
                                                            <SortIcon field="type" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            sort("amount")
                                                        }
                                                        scope="col"
                                                        className=" cursor-pointer px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        <div className="flex items-center">
                                                            {t("fields.amount")}
                                                            <SortIcon field="amount" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className=" py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        {t("accounts")}
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            sort("created_at")
                                                        }
                                                        scope="col"
                                                        className=" cursor-pointer px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        <div className="flex items-center">
                                                            {t(
                                                                "fields.createdAt"
                                                            )}
                                                            <SortIcon field="created_at" />
                                                        </div>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {paginatedList?.data?.map(
                                                    (item, i) => (
                                                        <tr
                                                            key={i}
                                                            className="divide-x divide-gray-200"
                                                        >
                                                            <td className="w-1/2 py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                                                                <span className="">
                                                                    {item.id?.substring(
                                                                        0,
                                                                        6
                                                                    )}
                                                                </span>
                                                            </td>
                                                            <td className=" whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                                                                {formatDateTime(
                                                                    item.when
                                                                )}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textOverflow:
                                                                        "ellipsis",
                                                                    overflow:
                                                                        "hidden",
                                                                    whiteSpace:
                                                                        "nowrap",
                                                                    maxWidth:
                                                                        "250px",
                                                                }}
                                                                className=" whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6"
                                                            >
                                                                {item.subject}
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                                                                {t(item.type)}
                                                            </td>
                                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                                                {item.amount}{" "}
                                                                {item.currency}
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                                                                <div className="flex flex-col text-xs">
                                                                    {item.from_account && (
                                                                        <div className="flex flex-col">
                                                                            <span className="text-md text-gray-400">
                                                                                {t(
                                                                                    "source"
                                                                                ) +
                                                                                    ": "}
                                                                            </span>
                                                                            <span>
                                                                                {`${item.from_account.title} / ${item.from_account.owner?.name}`}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {item.to_account &&
                                                                        item.from_account && (
                                                                            <hr className="my-2 w-full border-t border-t-gray-300" />
                                                                        )}
                                                                    {item.to_account && (
                                                                        <div className="flex flex-col">
                                                                            <span className="text-md text-gray-400">
                                                                                {t(
                                                                                    "target"
                                                                                ) +
                                                                                    ": "}
                                                                            </span>
                                                                            <span>
                                                                                {`${item.to_account.title} / ${item.to_account.owner?.name}`}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                                                                {formatDateTime(
                                                                    item.created_at
                                                                )}
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                                                                <Link
                                                                    to={`${item.id}/details`}
                                                                    className="flex items-center space-x-1"
                                                                >
                                                                    <EyeIcon className="h-4 w-4 text-gray-600" />
                                                                    <span>
                                                                        {t(
                                                                            "details"
                                                                        )}
                                                                    </span>
                                                                </Link>
                                                                {/*<EditButton to={"./edit/" + item.id}>*/}
                                                                {/*  {t("edit")}*/}
                                                                {/*</EditButton>*/}
                                                            </td>
                                                            {/*<td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{item.role}</td>*/}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
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
