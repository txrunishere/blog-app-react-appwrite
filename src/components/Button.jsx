const Button = ({
  children,
  textColor = "text-while",
  bgColor = "bg-zinc-700",
  className = "",
  handler,
  ...props
}) => {

  return <button onClick={handler} className={`px-2 cursor-pointer rounded-lg py-1 ${className} ${textColor} ${bgColor}`} { ...props }>{ children }</button>
}

export default Button