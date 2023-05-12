import { type ISignUpFormFieldState } from "../pages/signup";
import { type IForm } from "~/utils/form";

interface ISignUpFormProps extends IForm {
  fields: ISignUpFormFieldState;
}

export default function SignUpForm(props: ISignUpFormProps) {
  const { handleChange, handleSubmit, fields, loading } = props;

  const formatLabel = (l: keyof ISignUpFormFieldState) => {
    const strs = l.split("");
    strs[0] = strs[0]?.toUpperCase() as string;
    return strs.join("");
  };

  const getTypes = (l: keyof ISignUpFormFieldState) => {
    switch (l) {
      case "email":
        return "email";
      case "password":
        return "password";
      default:
        return "text";
    }
  };

  const generateFields = () => {
    return Object.keys(fields).map((key, idx) => {
      const label = key as keyof ISignUpFormFieldState;
      return (
        <div key={idx}>
          <label className="label">
            <span className="label-text">{formatLabel(label)}</span>
          </label>

          <input
            type={getTypes(label)}
            id={label}
            placeholder={`enter your ${label}`}
            className="input-bordered input w-full max-w-xs"
            onChange={handleChange}
          />

          {fields[label].err && (
            <label className="label">
              <span className="label-text-alt font-medium text-error">
                *{fields[label].err}
              </span>
            </label>
          )}
        </div>
      );
    });
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
      className="form-control w-full max-w-xs"
    >
      {generateFields()}
      <button className="btn-info btn-wide btn mt-10 w-full bg-blue-600 text-white hover:bg-blue-500">
        {loading ? (
          <span className="text-white">Hang tight...</span>
        ) : (
          <span>Join</span>
        )}
      </button>
    </form>
  );
}
