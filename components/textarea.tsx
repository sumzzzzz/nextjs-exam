import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div className="my-5">
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        className="mt-1 p-2 shadow-sm w-full border-2 focus:ring-blue-500 rounded-md border-gray-300 focus:border-blue-500 "
        rows={4}
        {...register}
        {...rest}
      />
    </div>
  );
}
