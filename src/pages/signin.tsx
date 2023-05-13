/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
import Head from "next/head";
import SignInForm from "~/components/SignInForm";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Error, { IError } from "../components/Error";

export interface ISignInFormFieldState {
  email: { val: string; err?: string };
  password: { val: string; err?: string };
}

export default function SignIn() {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState<IError>();
  const { data: session } = useSession();
  const router = useRouter();
  if (session && session.user) void router.push("/");

  const [fields, setFields] = useState<ISignInFormFieldState>({
    email: { val: "" },
    password: { val: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const id = e.target.id.split("-")[0] as keyof ISignInFormFieldState;
    setFields({
      ...fields,
      [id]: { val: value },
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    let isError = false;

    Object.keys(fields).forEach((key) => {
      const k = key as keyof ISignInFormFieldState;
      if (!fields[k].val) {
        isError = true;
        fields[k].err = "empty field not accepted";
      }

      setFields({ ...fields });
    });

    if (isError) return;
    setSubmit(true);

    const res = await signIn("credentials", {
      email: fields.email.val,
      password: fields.password.val,
      redirect: true,
      callbackUrl: "/",
    });

    if (res?.error)
      setError({ code: "Internal Server Error", message: res.error });
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <section className="h-screen">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="mb-6 text-4xl font-semibold">
            Sign In to write blogs
          </h1>

          {error && (
            <Error
              isSubmit={submit}
              code={error.code}
              message={error.message}
            />
          )}

          <SignInForm
            fields={fields}
            loadState={{
              loading: submit,
              text: "Hang tight...",
            }}
            btnText="Login"
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>
    </>
  );
}
