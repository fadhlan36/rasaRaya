type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  errors?: string[];
};

export function Field({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  errors,
}: FieldProps) {
  const id = `field-${name}`;
  const hasError = !!errors?.length;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className="w-full rounded-xl border-2 border-forest/20 bg-white px-4 py-3 outline-none focus:border-ocean"
      />
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-sm text-red-700"
        >
          {errors!.join(" ")}
        </p>
      )}
    </div>
  );
}
