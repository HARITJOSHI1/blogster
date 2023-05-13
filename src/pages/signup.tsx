/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */

import Head from "next/head";
import SignUpForm from "~/components/SignUpForm";
import React, { useState } from "react";
import { api as trpc } from "../utils/api";
import { useGlobalContext } from "~/components/context/GlobalContext";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Error, { type IError } from "~/components/Error";
import { useQueryClient } from "@tanstack/react-query";

export interface ISignUpFormFieldState {
  name: { val: string; err?: string };
  email: { val: string; err?: string };
  password: { val: string; err?: string };
}

export default function SignUp() {
  const [submit, setSubmit] = useState(false);
  const { userState } = useGlobalContext();
  const [error, setError] = useState<IError>();
  const utils = trpc.useContext();
  const { data: session } = useSession();
  const router = useRouter();
  if (session && session.user) void router.push("/");

  const mutation = trpc.entry.siginUp.useMutation({
    onSuccess: async ({ data }) => {
      setError(undefined);
      await signIn("credentials", {
        existingUser: true,
        email: data.user.email,
        name: data.user.name,
        id: data.user.id,
        redirect: true,
        callbackUrl: "/",
      });

      setSubmit(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      userState.set(data.user);
    },

    onError: (err) => {
      setSubmit(false);
      console.log("Here is the error: ", err.data, err.message);
      setError({
        code: err.data?.code || "Internal Server Error",
        message: 'User already exists',
      });

      void utils.entry.invalidate();
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

  const handleSubmit = async (
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

          {error && (
            <Error
              isSubmit={submit}
              code={error.code}
              message={error.message}
            />
          )}
          <SignUpForm
            fields={fields}
            loadState={{
              loading: submit,
              text: "Hang tight...",
            }}
            btnText="Join"
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>
    </>
  );
}
