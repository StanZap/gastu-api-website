import { useState } from "react";
import { currencySymbols } from "../../utils/enums";
import ErrorAlert from "./ErrorAlert";

export default function CurrencyField(props) {
  const {
    className,
    onChange,
    value, // currency obj {value, symbol}
    label,
    id,
    invalidNumberError,
    errors,
  } = props;
  const [error, setError] = useState(null);

  let moreClasses = "";
  const noChars = currencySymbols[value.currency]?.length || 1;

  if (noChars === 1) {
    moreClasses = "pl-7";
  } else if (noChars === 2) {
    moreClasses = "pl-10";
  } else if (noChars === 3) {
    moreClasses = "pl-12";
  }

  const handleAmountChange = (e) => {
    const valueString = e.target.value;
    if (isNaN(valueString)) {
      setError(invalidNumberError);
    } else {
      setError(null);
    }

    onChange &&
      onChange({
        amount: +e.target.value,
        currency: value.currency,
      });
  };

  const handleSymbolChange = (e) => {
    onChange &&
      onChange({
        currency: e.target.value,
        amount: value.amount,
      });
  };

  return (
    <div className={`${className || ""} flex max-w-sm flex-col`}>
      <label htmlFor={id} className=" text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">
            {currencySymbols[value.currency] || "$"}
          </span>
        </div>
        <input
          type="text"
          name={id}
          id={id}
          step={0.01}
          min={0}
          className={
            moreClasses +
            " block w-full rounded-md border-gray-800 bg-gray-50 px-1 py-3 pr-12 focus:border-indigo-500  focus:ring-indigo-500 sm:text-sm"
          }
          placeholder="0.00"
          onChange={handleAmountChange}
          value={value.amount}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={value.currency}
            onChange={handleSymbolChange}
          >
            {Object.keys(currencySymbols).map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ErrorAlert errors={error} />
      <ErrorAlert errors={errors} />
    </div>
  );
}
