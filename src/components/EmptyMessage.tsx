import { Link } from "react-router-dom";

function EmptyMessage({
  type,
  filters = null,
}: {
  type: "Orders" | "Low stocks" | "User sales.";
  filters?: string | null;
}) {
  return (
    <div className="text-center w-full mt-[20%]">
      <p className="font-semibold text-xl">There are currently no {type}.</p>
      {filters !== null}
      <Link to="/" className="text-gray-400">
        Return to dashboard
      </Link>
    </div>
  );
}

export default EmptyMessage;
