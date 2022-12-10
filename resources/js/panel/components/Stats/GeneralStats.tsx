// @ts-nocheck
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { fetchGlobalStats } from "../../services/StatsService";
import { useTranslation } from "react-i18next";
import { currencySymbols, TransactionType } from "../../utils/enums";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import DateTimeField from "../Fields/DateTimeField";
import { useSearchParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type StatsState = {
  [currency: string]: {
    month: string;
    current?: string;
    prev?: string;
    change?: number;
    hasIncreased?: boolean;
  };
};

export default function GeneralStats({
  transactionType,
  className: statsClassName,
}) {
  const [stats, setStats] = useState<StatsState>();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentMonthName, setCurrentMonthName] = useState(
    t("months")[dayjs().month()]
  );
  const [prevMonthName, setPrevMonthName] = useState(
    t("months")[dayjs().subtract(1, "month").month()]
  );
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));

  useEffect(() => {
    loadStats({ month: currentMonth });
    const current = currentMonth.split("-")[1] - 1;
    const currentName = t("months")[current];
    const prevName =
      t("months")[dayjs().month(current).subtract(1, "month").month()];
    setCurrentMonthName(currentName);
    setPrevMonthName(prevName);
  }, [currentMonth]);

  useEffect(() => {
    if (
      searchParams.get("month") &&
      searchParams.get("month") !== currentMonth
    ) {
      setCurrentMonth(searchParams.get("month"));
    }
  }, [searchParams]);

  const handleChangeCurrentMonth = (value) => {
    setCurrentMonth(value);
    setSearchParams({ month: value });
  };

  const loadStats = async ({ month }) => {
    const res = await fetchGlobalStats(month);
    const map = {};
    if (transactionType === TransactionType.Expense) {
      Object.keys(currencySymbols).forEach((currency) => {
        map[currency] = mapper(res.data.expenses, currency);
      });
    } else {
      Object.keys(currencySymbols).forEach((currency) => {
        map[currency] = mapper(res.data.incomes, currency);
      });
    }
    setStats(map);
  };

  const mapper = (data, currency) => {
    const prev = parseFloat(data.prev?.[currency] ?? 0);
    const current = parseFloat(data.current?.[currency] ?? 0);
    const hasIncreased = current > prev;
    const changeRate = hasIncreased ? prev / current : current / prev;
    const changePercentage = changeRate * 100;
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    return {
      prev: formatter.format(prev),
      current: formatter.format(current),
      change: changePercentage ? formatter.format(changePercentage || 0) : null,
      hasIncreased,
    };
  };

  return (
    stats && (
      <div className={statsClassName}>
        <div className="flex justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-400 ">
            {t("monthlyStatsCardHeading")} {currentMonthName} {currentMonth}
          </h3>
          <div>
            <DateTimeField
              type="month"
              onChange={handleChangeCurrentMonth}
              value={currentMonth}
            />
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-slate-100 shadow md:grid-cols-4 md:divide-y-0 md:divide-x">
          {Object.keys(currencySymbols).map((currency) =>
            stats &&
            stats[currency] &&
            stats[currency].current &&
            +stats[currency].current !== 0 ? (
              <StatItem
                key={currency}
                labelKey={currency}
                data={stats}
                currency={currency}
                prevMonth={prevMonthName}
              />
            ) : (
              ""
            )
          )}
        </dl>
      </div>
    )
  );
}

const StatItem = ({ labelKey, currency, data, prevMonth }) => {
  const { t } = useTranslation();

  return (
    <div className="px-4 py-5 sm:p-6">
      <dt className="flex items-center space-x-1 text-base font-normal text-gray-900">
        <span className="text-lg font-light">{t(labelKey)}</span>
        {/*<Badge type="green" className="flex items-center space-x-1">*/}
        {/*  <span aria-hidden={true}>*/}
        {/*    <CalendarIcon className="h-4 w-4 -rotate-90" />*/}
        {/*  </span>*/}
        {/*  <div>*/}
        {/*    <span className="sr-only">{t("Presupuesto de")}</span>*/}
        {/*    {data[currency].budget || "0.00"}*/}
        {/*  </div>*/}
        {/*</Badge>*/}
      </dt>
      <dd className="flex items-baseline justify-between lg:flex ">
        <div className="flex flex-col items-baseline text-2xl font-semibold text-indigo-600">
          {data[currency].current}
          <span className="flex items-center space-x-2 text-sm font-medium text-gray-500">
            <span>
              {prevMonth}: {currencySymbols[currency]} {data[currency].prev}
            </span>
            {data[currency] && <ChangeRate {...data[currency]} />}
          </span>
          {/*<span className="text-sm font-medium text-gray-500">*/}
          {/*  {t("Presupuesto: ")} {currencySymbols[currency]}{" "}*/}
          {/*  {data[currency].prev}*/}
          {/*</span>*/}
        </div>
      </dd>
    </div>
  );
};

const ChangeRate = ({ change, hasIncreased }) => {
  const { t } = useTranslation();
  return (
    change && (
      <Badge type={hasIncreased ? "red" : "green"}>
        {hasIncreased ? (
          <ArrowSmUpIcon
            className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-green-500"
            aria-hidden="true"
          />
        ) : (
          <ArrowSmDownIcon
            className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-red-500"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {hasIncreased ? t("increased") : t("decreased")} {t("by")}
        </span>
        {change}%
      </Badge>
    )
  );
};

const Badge = ({ type, children }) => (
  <div
    className={classNames(
      type === "green"
        ? "bg-green-300 text-green-800"
        : "bg-red-300 text-red-800",
      "inline-flex items-center space-x-1 rounded-full px-2 py-0 text-sm font-medium md:mt-2 lg:mt-0"
    )}
  >
    {children}
  </div>
);

GeneralStats.propTypes = {
  transactionType: PropTypes.oneOf([
    TransactionType.Income,
    TransactionType.Expense,
    TransactionType.Transfer,
  ]),
};
