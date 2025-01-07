import { Link } from "react-router-dom";

const BottomWarning = ({ label, to, buttonText }) => {
  return (
    <div className="flex justify-center mt-[1vw] font-medium">
      <p className="mr-2">{label}</p>
      <Link className="pointer underline cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
