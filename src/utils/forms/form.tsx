import React from "react";
import { type IForm } from "./types";

export default function form({
  handleSubmit,
  loadState,
  generateFields,
  btnText,
}: IForm) {
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
      className="form-control w-full max-w-xs"
    >
      {generateFields ? generateFields() : null}
      <button className="btn-info btn-wide btn mt-10 w-full bg-blue-600 text-white hover:bg-blue-500">
        {loadState.loading ? (
          <span className="text-white">{loadState.text}</span>
        ) : (
          <span>{btnText}</span>
        )}
      </button>
    </form>
  );
}
