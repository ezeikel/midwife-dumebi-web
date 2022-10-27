import { ChangeEvent, InputHTMLAttributes, useEffect, useRef } from "react";
import { ErrorMessage, useField } from "formik";
import clsx from "clsx";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  initialFocus?: boolean;
  name: string;
  handleChange?: (e: ChangeEvent) => void;
  labelClasses?: string;
  inputClasses?: string;
};

const TextInput = ({
  id,
  label,
  name,
  initialFocus = false,
  handleChange,
  labelClasses,
  inputClasses,
  className,
  ...props
}: TextInputProps) => {
  const [field] = useField({ ...props, name });
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFocus) {
      inputEl.current?.focus();
    }
  }, [initialFocus]);

  return (
    <div
      className={clsx("flex flex-col flex-1", {
        [className as string]: !!className,
      })}
    >
      {label ? (
        <label
          className={clsx("flex font-catamaran mb-2", {
            [labelClasses as string]: !!labelClasses,
          })}
          htmlFor="name"
        >
          {label}
        </label>
      ) : null}
      <input
        className={clsx(
          "w-full rounded border font-catamaran border-gray-300 p-4 outline-none active:border-peach focus:border-peach disabled:active:border-gray-300 placeholder:text-gray-300 ",
          {
            [inputClasses as string]: !!inputClasses,
          },
        )}
        ref={inputEl}
        {...field} // eslint-disable-line react/jsx-props-no-spreading
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        onChange={(e) => {
          // custom logic
          if (handleChange) {
            handleChange(e);
          }

          field.onChange(e);
        }}
      />
      <ErrorMessage
        component="div"
        name={name}
        className="mt-2 font-catamaran text-sm text-red-500"
      />
    </div>
  );
};

export default TextInput;
