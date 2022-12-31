import TypeCurrencyAmounts from "./TypeCurrencyAmounts";

const MyStatsMonthItem = ({ monthName, monthStat }) => {
    return (
        <div className="flex flex-col justify-between space-y-3">
            <h2 className="text-md w-full text-center uppercase border-top border-gray-500 border-solid text-gray-500 mt-4 ">
                {monthName}
            </h2>
            <div className="flex flex-col space-y-5 bg-gray-100 rounded-lg p-5">
                {Object.entries(monthStat)?.map(([type, currencyMap]) => (
                    <TypeCurrencyAmounts
                        key={type}
                        type={type}
                        currencyMap={currencyMap}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyStatsMonthItem;
