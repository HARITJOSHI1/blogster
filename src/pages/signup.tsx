/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
import Head from "next/head";
import SignUpForm from "~/components/SignUpForm";
import React, { useContext, useState } from "react";
import { api as trpc } from "../utils/api";
import { GlobleContextStore } from "~/components/context/GlobleContext";

export interface ISignUpFormFieldState {
  name: { val: string; err?: string };
  email: { val: string; err?: string };
  password: { val: string; err?: string };
}

export default function SignUp() {
  const [submit, setSubmit] = useState(false);
  const {userState} = useContext(GlobleContextStore);

  const mutation = trpc.entry.siginUp.useMutation({
    onSuccess: ({data}) => {
      setSubmit(false);
      userState.set(data.user);
    },

    onError: (err) => {
      console.log(err.message);
    },
  });

  const [fields, setFields] = useState<ISignUpFormFieldState>({
    name: { val: "" },
    email: { val: "" },
    password: { val: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const id = e.target.id.split("-")[0] as keyof ISignUpFormFieldState;
    setFields({
      ...fields,
      [id]: { val: value },
    });
  };

  const handleSubmit = async <T,>(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    let isError = false;

    Object.keys(fields).forEach((key) => {
      const k = key as keyof ISignUpFormFieldState;
      if (!fields[k].val) {
        isError = true;
        fields[k].err = "empty field not accepted";
      }

      setFields({ ...fields });
    });

    if (isError) return;

    setSubmit(true);
    mutation.mutate({
      name: fields.name.val,
      email: fields.email.val,
      password: fields.password.val,
    });
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <section className="h-screen">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="mb-6 text-4xl font-semibold">
            Sign up to write blogs
          </h1>
          <SignUpForm
            fields={fields}
            loading={submit}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>
    </>
  );
}
