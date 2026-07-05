"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { useAuth } from "@/hooks/useAuth";
import { flattenApiErrors } from "@/lib/format";
import { ApiError } from "@/lib/http";

const loginSchema = z.object({
  email: z.string().min(1, "is required").email("must be a valid email"),
  password: z.string().min(1, "is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      router.push("/");
    } catch (error) {
      if (error instanceof ApiError) {
        setError("root", { message: flattenApiErrors(error.errors).join("; ") });
      } else {
        setError("root", { message: "Something went wrong. Please try again." });
      }
    }
  };

  const fieldErrors = [errors.email?.message, errors.password?.message].filter(
    (message): message is string => Boolean(message),
  );
  const apiErrors = errors.root?.message ? [errors.root.message] : [];

  return (
    <div className="mx-auto max-w-md px-4 py-8 text-center">
      <h1 className="font-serif text-3xl font-bold">Sign in</h1>
      <p className="mt-1 text-gray-400">
        <Link href="/register" className="text-green-600 hover:underline">
          Need an account?
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 text-left" noValidate>
        <ErrorMessages errors={[...apiErrors, ...fieldErrors]} />

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border border-gray-300 p-3"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border border-gray-300 p-3"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="float-right rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
