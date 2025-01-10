type SpinnerProps = {
  abs?: boolean;
};

function Spinner({ abs }: SpinnerProps) {
  return (
    <div
      className={`${
        abs === true && "absolute inset-0"
      } flex justify-center items-center`}
    >
      <div className="w-10 h-10 border-4 border-blue-300 border-t-transparent border-solid rounded-full animate-spin m-auto"></div>
    </div>
  );
}

export default Spinner;
