import { cls } from "../libs/client/utils";

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
  secondColor?: boolean;
}

export default function Button({
  large = false,
  onClick,
  text,
  secondColor,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        "mt-2 w-full text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm ",
        secondColor ? `bg-slate-300 hover:bg-slate-400` : "bg-[#1d9bf0] hover:bg-[#2290da]",
      )}
    >
      {text}
    </button>
  );
}
