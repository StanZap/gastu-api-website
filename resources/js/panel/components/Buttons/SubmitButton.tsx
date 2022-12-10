import { FC } from "react";

type SubmitButtonProps = {
  label: string;
  onClick: Function;
  disabled?: boolean;
};

const SubmitButton: FC<SubmitButtonProps> = ({ label, onClick, disabled }) => {
  return disabled ? (
    <div className="inline-flex w-auto items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white opacity-30 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      {label}
    </div>
  ) : (
    <div>
      <button
        type="button"
        className="inline-flex w-auto items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={(e) => onClick && onClick(e)}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
