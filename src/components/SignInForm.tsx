import { type ISignInFormFieldState } from "../pages/signin";
import { type IForm } from "~/utils/forms/types";
import { formatLabel } from "~/utils/forms/helper";
import Form from "~/utils/forms/form";

interface ISignInFormProps extends IForm {
  fields: ISignInFormFieldState;
}

export default function SignInForm(props: ISignInFormProps) {
  const { handleChange, handleSubmit, fields, loadState, btnText } = props;

  const getTypes = (l: keyof ISignInFormFieldState) => {
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
      const label = key as keyof ISignInFormFieldState;
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
    <Form
      handleSubmit={handleSubmit}
      loadState={loadState}
      btnText={btnText}
      generateFields={generateFields}
    />
  );
}
