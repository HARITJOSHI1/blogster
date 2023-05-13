import React, { useEffect, useState } from "react";

export interface IError {
  code: string;
  message: string;
  isSubmit?: boolean;
}

export default function Error(e: IError) {
  const [visible, setVisible] = useState<"hidden" | "block">("block");

  useEffect(() => {
    setVisible('block');
    if(e.isSubmit) setVisible('hidden');
    const id = setTimeout(() => setVisible("hidden"), 3200);
    return () => {
      clearTimeout(id);
    };
  }, [e.isSubmit]);

  return (
    <div
      className={`display: alert alert-error w-fit animate-bounce shadow-lg ${visible}`}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! {e.message}.</span>
      </div>
    </div>
  );
}
