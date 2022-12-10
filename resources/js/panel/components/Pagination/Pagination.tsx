import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import SearchField from "../SearchField";

const Pagination = (props) => {
    const {
        next_page_url: nextPageUrl,
        prev_page_url: prevPageUrl,
        search,
    } = props;
    const navigate = useNavigate();
    const { t } = useTranslation();

    const getRelativeUrl = (linkUrl) => {
        if (!linkUrl) return "#";
        const url = new URL(window.location.toString());

        const page = new URL(linkUrl).searchParams.get("page");
        if (page) url.searchParams.set("page", page);

        const limit = new URL(linkUrl).searchParams.get("limit");
        if (limit) url.searchParams.set("limit", limit);

        const search = new URL(linkUrl).searchParams.get("search");
        if (search) url.searchParams.set("search", search);

        return `?${url.searchParams.toString()}`;
    };

    const handleSearch = (text) => {
        const url = new URL(window.location.toString());
        url.searchParams.set("search", text.trim());
        navigate(url.search);
    };

    return (
        <nav
            className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white py-0 lg:py-8"
            aria-label="Pagination"
        >
            <PaginationText className="hidden lg:block" {...props} />
            <div className="flex flex-1 flex-col justify-between sm:justify-end md:space-x-3 lg:flex-row lg:items-center">
                <SearchField
                    className="relative mb-3 mt-6 rounded-md bg-gray-100 lg:my-0 lg:w-96"
                    placeholder={t("searchPlaceholder")}
                    onSearch={handleSearch}
                    debounceTime={500}
                    value={search}
                />
                <div className="mb-3 flex-row-reverse md:flex md:justify-between lg:mb-0 ">
                    <div className="flex items-center justify-between space-x-3 lg:inline-flex">
                        {prevPageUrl ? (
                            <Link
                                to={getRelativeUrl(prevPageUrl)}
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <ChevronLeftIcon className="h-4 w-4" />
                                {t("pagination.prev")}
                            </Link>
                        ) : (
                            <div className="relative	 inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 opacity-50">
                                <ChevronLeftIcon className="h-4 w-4" />
                                {t("pagination.prev")}
                            </div>
                        )}
                        {nextPageUrl ? (
                            <Link
                                to={getRelativeUrl(nextPageUrl)}
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                {t("pagination.next")}
                                <ChevronRightIcon className="h-4 w-4" />
                            </Link>
                        ) : (
                            <div className="relative	 inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700  opacity-50">
                                {t("pagination.next")}
                                <ChevronRightIcon className="h-4 w-4" />
                            </div>
                        )}
                    </div>
                    <PaginationText
                        className="mb-2 mt-4 text-center lg:hidden"
                        {...props}
                    />
                </div>
            </div>
        </nav>
    );
};

const PaginationText = (props) => {
    const { t } = useTranslation();
    return (
        <div className={props.className + " "}>
            <p className="text-sm text-gray-700">
                {t("pagination.showing")}{" "}
                <span className="font-medium">{props.from}</span>{" "}
                {t("pagination.to")}{" "}
                <span className="font-medium">{props.to}</span>{" "}
                {t("pagination.of")}{" "}
                <span className="font-medium">{props.total}</span>{" "}
                {t("pagination.results")}
            </p>
        </div>
    );
};

export default Pagination;
