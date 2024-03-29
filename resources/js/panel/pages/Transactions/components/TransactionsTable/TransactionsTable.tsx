import { FC } from "react";
import { useTranslation } from "react-i18next";
import SortIcon from "../../../../components/SortIcon/SortIcon";
import { formatDateTime } from "../../../../utils/methods";
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/20/solid";
import { Transaction } from "../../types";

interface TransactionsTableProps {
    transactions: Transaction[];
    sort: Function;
}
const TransactionsTable: FC<TransactionsTableProps> = (props) => {
    const { transactions, sort } = props;
    const { t } = useTranslation();

    return (
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
                <tr className="divide-x divide-gray-200">
                    <th
                        scope="col"
                        onClick={() => sort("id")}
                        className="cursor-pointer truncate py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                        <div className="flex items-center">
                            ID
                            <SortIcon field="id" />
                        </div>
                    </th>
                    <th
                        scope="col"
                        onClick={() => sort("when")}
                        className="cursor-pointer  py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                        <div className="flex items-center">
                            {t("fields.when")}
                            <SortIcon field="when" />
                        </div>
                    </th>
                    <th
                        scope="col"
                        onClick={() => sort("subject")}
                        className=" cursor-pointer py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                        <div className="flex items-center">
                            {t("fields.subject")}
                            <SortIcon field="subject" />
                        </div>
                    </th>
                    <th
                        scope="col"
                        onClick={() => sort("type")}
                        className="cursor-pointer py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                        <div className="flex items-center">
                            {t("fields.transactionTypeShort")}
                            <SortIcon field="type" />
                        </div>
                    </th>
                    <th
                        onClick={() => sort("amount")}
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
                        scope="col"
                        className=" py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                        {t("fields.team")}
                    </th>
                    <th
                        scope="col"
                        className=" py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                        {t("fields.user")}
                    </th>
                    <th
                        onClick={() => sort("created_at")}
                        scope="col"
                        className=" cursor-pointer px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        <div className="flex items-center">
                            {t("fields.createdAt")}
                            <SortIcon field="created_at" />
                        </div>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {transactions?.map((item, i) => (
                    <tr key={i} className="divide-x divide-gray-200">
                        <td className="w-1/2 py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            <span className="">{item.id?.substring(0, 6)}</span>
                        </td>
                        <td className=" whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            {formatDateTime(item.when)}
                        </td>
                        <td
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: "250px",
                            }}
                            className=" whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6"
                        >
                            {item.subject}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            {t(item.type)}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            {item.amount} {item.currency}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            {`${item.account_title}, ${item.account_provider}`}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            <span>{item?.account_owner_team}</span>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            <span>{item?.user_name}</span>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            {formatDateTime(item.created_at)}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6">
                            <Link
                                to={`${item.id}/details`}
                                className="flex items-center space-x-1"
                            >
                                <EyeIcon className="h-4 w-4 text-gray-600" />
                                <span>{t("details")}</span>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionsTable;
