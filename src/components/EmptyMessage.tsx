import { Link } from "react-router-dom";

function EmptyMessage({
  type,
}: {
  type: "Orders" | "Low stocks" | "User sales.";
}) {
  return (
    <div className="text-center w-full mt-[20%]">
      <p className="font-semibold text-xl">There are currently no {type}.</p>
      <Link to="/" className="text-gray-400">
        Return to dashboard
      </Link>
    </div>
  );
}

export default EmptyMessage;
