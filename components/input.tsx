import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
  error?: string;
  [key: string]: any;
}

export default function InputText({
  label,
  name,
  register,
  required,
  type,
  error,
  ...rest
}: InputProps) {
  return (
    <div className="my-5">
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>

      {/* kind : text */}
      <div className="rounded-md relative flex  items-center shadow-sm">
        <input
          id={name}
          {...register}
          type={type}
          required={required}
          {...rest}
          className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

      </div>
        {error && error == "existing email" && (
          <p className="text-gray-500 pt-2">{"이미 존재하는 이메일입니다."}</p>
        )}
    </div>
  );
}
