import { Link } from "react-router-dom";
import { EditButton } from "../../../../components/Buttons";
import Pagination from "../../../../components/Pagination";
import { formatDate } from "../../../../utils/methods";
import SortIcon from "../../../../components/SortIcon/SortIcon";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/20/solid";
import NoItems from "../../../../components/NoItem";
import Loader from "../../../../components/Loader";
import useAccountListData from "../../../../hooks/useAccountListData";

const AccountList = () => {
    const {
        isLoading,
        accountList: paginatedList,
        sort,
        searchParams,
    } = useAccountListData();
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
                            {t("accounts")}
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            {t("accountListMessage")}
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to={"./add"}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <PlusIcon className="mr-1 h-4 w-4" />
                            <span className="hidden sm:block">
                                {t("addAccountLink")}
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
                        addItems={t("addAccounts")}
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
                                                            sort("title")
                                                        }
                                                        className="cursor-pointer py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        <div className="flex items-center">
                                                            {t("fields.title")}
                                                            <SortIcon field="title" />
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
                                                        onClick={() =>
                                                            sort("owner_id")
                                                        }
                                                        scope="col"
                                                        className=" cursor-pointer px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        <div className="flex items-center">
                                                            {t("fields.owner")}
                                                            <SortIcon field="owner_id" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        onClick={() =>
                                                            sort(
                                                                "provider_name"
                                                            )
                                                        }
                                                        scope="col"
                                                        className=" cursor-pointer px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        <div className="flex items-center">
                                                            {t(
                                                                "fields.providerName"
                                                            )}
                                                            <SortIcon field="provider_name" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        onClick={() =>
                                                            sort("createdAt")
                                                        }
                                                        className="w-1/8  cursor-pointer  py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        <div className="flex items-center">
                                                            {t(
                                                                "fields.createdAt"
                                                            )}
                                                            <SortIcon field="createdAt" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        onClick={() =>
                                                            sort("updated_at")
                                                        }
                                                        className="w-1/8  cursor-pointer  py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        <div className="flex items-center">
                                                            {t(
                                                                "fields.updatedAt"
                                                            )}
                                                            <SortIcon field="updated_at" />
                                                        </div>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="w-1/8  cursor-pointer  py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    ></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {paginatedList?.data?.map(
                                                    (item) => (
                                                        <tr
                                                            key={item.id}
                                                            className="divide-x divide-gray-200"
                                                        >
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
                                                                scope="col"
                                                                className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6"
                                                            >
                                                                {item.title}
                                                            </td>
                                                            <td
                                                                scope="col"
                                                                className="whitespace-nowrap p-4 text-sm text-gray-500"
                                                            >
                                                                {item.amount}{" "}
                                                                {item.currency}
                                                            </td>
                                                            <td
                                                                scope="col"
                                                                className="whitespace-nowrap p-4 text-sm text-gray-500"
                                                            >
                                                                {
                                                                    item.owner
                                                                        .name
                                                                }
                                                            </td>
                                                            <td
                                                                scope="col"
                                                                className="whitespace-nowrap p-4 text-sm text-gray-500"
                                                            >
                                                                {
                                                                    item.provider_name
                                                                }
                                                            </td>
                                                            <td
                                                                scope="col"
                                                                className="whitespace-nowrap p-4 text-sm text-gray-500"
                                                            >
                                                                {formatDate(
                                                                    item.updated_at
                                                                )}
                                                            </td>
                                                            <td
                                                                scope="col"
                                                                className="whitespace-nowrap p-4 text-sm text-gray-500"
                                                            >
                                                                {formatDate(
                                                                    item.created_at
                                                                )}
                                                            </td>
                                                            <td scope="col">
                                                                <EditButton
                                                                    to={
                                                                        "./edit/" +
                                                                        item.id
                                                                    }
                                                                >
                                                                    {t("edit")}
                                                                </EditButton>
                                                            </td>
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
};

export default AccountList;
