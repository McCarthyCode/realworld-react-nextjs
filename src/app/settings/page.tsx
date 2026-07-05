"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { flattenApiErrors } from "@/lib/format";
import { ApiError } from "@/lib/http";

const settingsSchema = z.object({
  image: z.union([z.literal(""), z.string().url("must be a valid URL")]),
  username: z.string().min(1, "is required"),
  bio: z.string(),
  email: z.string().min(1, "is required").email("must be a valid email"),
  password: z.union([z.literal(""), z.string().min(8, "must be at least 8 characters")]),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { user, isLoading, logout } = useRequireAuth();
  const { setUser } = useAuth();
  const router = useRouter();
  const updateUser = useUpdateUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    values: user
      ? {
          image: user.image ?? "",
          username: user.username,
          bio: user.bio ?? "",
          email: user.email,
          password: "",
        }
      : undefined,
  });

  if (isLoading || !user) {
    return <Spinner label="Loading settings" />;
  }

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      const updated = await updateUser.mutateAsync({
        email: values.email,
        username: values.username,
        bio: values.bio,
        image: values.image || undefined,
        password: values.password || undefined,
      });
      setUser(updated);
    } catch (error) {
      if (error instanceof ApiError) {
        setError("root", { message: flattenApiErrors(error.errors).join("; ") });
      } else {
        setError("root", { message: "Something went wrong. Please try again." });
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const fieldErrors = Object.values(errors)
    .map((error) => error?.message)
    .filter((message): message is string => Boolean(message));

  return (
    <div className="mx-auto max-w-md px-4 py-8 text-center">
      <h1 className="font-serif text-3xl font-bold">Your Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 text-left" noValidate>
        <ErrorMessages errors={fieldErrors} />

        <input
          {...register("image")}
          placeholder="URL of profile picture"
          className="mb-4 w-full rounded border border-gray-300 p-3"
        />
        <input
          {...register("username")}
          placeholder="Username"
          className="mb-4 w-full rounded border border-gray-300 p-3"
        />
        <textarea
          {...register("bio")}
          placeholder="Short bio about you"
          rows={6}
          className="mb-4 w-full resize-none rounded border border-gray-300 p-3"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border border-gray-300 p-3"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="New Password"
          className="mb-4 w-full rounded border border-gray-300 p-3"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="float-right rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Update Settings
        </button>
      </form>

      <hr className="mt-16 mb-6 border-gray-200" />
      <button
        type="button"
        onClick={handleLogout}
        className="rounded border border-red-500 px-4 py-2 font-medium text-red-500 hover:bg-red-500 hover:text-white"
      >
        Or click here to logout.
      </button>
    </div>
  );
}
