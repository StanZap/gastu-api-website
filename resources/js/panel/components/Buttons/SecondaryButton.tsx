const SecondaryButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick && onClick()}
      className="rounded-md border border-gray-300 py-2 px-6 text-gray-600"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
