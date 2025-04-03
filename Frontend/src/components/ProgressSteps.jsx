const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className={`${step1 ? "text-green-500" : "text-black"}`}>
        <span className="ml-2">Login</span>
        {step1 ? (
          <div className="mt-2 text-lg text-center">✅</div>
        ) : (
          <div className="mt-2 text-lg animate-spin text-center">🔃</div>
        )}
      </div>

      {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
      <div className={`${step2 ? "text-green-500" : "text-black"}`}>
        <span>Shipping</span>
        {step2 ? (
          <div className="mt-2 text-lg text-center">✅</div>
        ) : (
          <div className="mt-2 text-lg animate-spin text-center">🔃</div>
        )}
      </div>

      {step1 && step2 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}

      <div className={`${step3 ? "text-green-500" : "text-gray-600"}`}>
        <span>Summary</span>
        {step1 && step2 && step3 ? (
          <div className="mt-2 text-lg text-center">✅</div>
        ) : (
          <div className="mt-2 text-lg animate-spin text-center">🔃</div>
        )}
      </div>
    </div>
  );
};

export default ProgressSteps;
