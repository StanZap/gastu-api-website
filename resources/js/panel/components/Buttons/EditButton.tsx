import { Link } from "react-router-dom";

const EditButton = ({ to, children }) => {
  return (
    <Link className="py-3 px-6" to={to}>
      {children}
    </Link>
  );
};

export default EditButton;
