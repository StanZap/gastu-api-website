const NoItems = ({ addItems, nothingToShow }) => {
  return (
    <div className="text-md mt-6  mb-3 flex flex-col pt-6 text-center">
      <span className="text-xl">{nothingToShow}</span>
      <span>{addItems}</span>
    </div>
  );
};

export default NoItems;
