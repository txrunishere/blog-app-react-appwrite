import { useId } from "react";

const Select = (
  {
    className = "",
    label,
    options, // array of only options
    ...props
  },
  ref
) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={`${id}-${label}`}>{label}</label>}
      <select
        id={`${id}-${label}`}
        ref={ref}
        {...props}
        className={`${className}`}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
