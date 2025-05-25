import { useId } from "react";

const Input = (
  { label, className = "", type = "text", placeHolder = "", ...props },
  ref
) => {
  const id = useId();

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={`${id}-${label}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={`${id}-${label}`}
        type={type}
        placeholder={placeHolder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default Input;
