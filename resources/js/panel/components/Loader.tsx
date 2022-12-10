import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div className=" mt-6 cursor-not-allowed flex-col justify-center space-y-3 px-4 pt-6 text-center text-sm font-semibold leading-6 text-gray-500 transition duration-150 ease-in-out">
      <svg
        className=" mx-auto mt-2 h-10 w-10 animate-spin text-indigo-300"
        fill=" none"
        viewBox="0 0 24
 24
    "
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        >
          {" "}
        </circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {t("loading")}
      ...
    </div>
  );
};

export default Loader;
