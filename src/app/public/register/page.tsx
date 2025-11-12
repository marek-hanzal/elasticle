"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import z from "zod";
import { useRegisterMutation } from "@/lib/mutation/useRegisterMutation";
import { RegisterSchema } from "@/lib/schema/RegisterSchema";
import { tvc } from "@/lib/tvc";
import { FormField } from "@/ui/form/FormField";

/**
 * This schema is form related, so I'm just extending what I need here.
 *
 * The rest of app does not care about "password2" or other proprietary stuff
 * of login form.
 */
const RegisterSchemaEx = z
	.object({
		...RegisterSchema.shape,
		password2: z.string().min(1, "Please enter your password."),
	})
	.refine((data) => data.password === data.password2, {
		path: [
			"password2",
		],
		message: "Passwords do not match.",
	});

namespace RegisterSchemaEx {
	export type Type = z.infer<typeof RegisterSchemaEx>;
}

export default function RegisterPage() {
	const registerMutation = useRegisterMutation();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password2: "",
		} satisfies RegisterSchemaEx.Type,
		validators: {
			onSubmit: RegisterSchemaEx,
		},
		onSubmit: async ({ value }) => {
			const result = await registerMutation.mutateAsync(value);
			router.push("/user/profile");
			return result;
		},
	});

	const { Field, Subscribe } = form;

	return (
		<div
			className={tvc([
				"space-y-8",
			])}
		>
			<form
				className={tvc([
					"space-y-6",
				])}
				onSubmit={(event) => {
					event.preventDefault();
					void form.handleSubmit();
				}}
			>
				<Field name="name">
					{(field) => (
						<FormField
							label="Nickname"
							field={field}
							input={(props) => (
								<input
									{...props}
									id={field.name}
									value={field.state.value}
									onChange={(event) => {
										field.handleChange(event.target.value);
									}}
									onBlur={() => field.handleBlur()}
									placeholder="Jane Doe"
									autoComplete="name"
								/>
							)}
						/>
					)}
				</Field>

				<Field name="email">
					{(field) => (
						<FormField
							label="Email"
							field={field}
							input={(props) => (
								<input
									{...props}
									id={field.name}
									type="email"
									value={field.state.value}
									onChange={(event) => {
										field.handleChange(event.target.value);
									}}
									onBlur={() => field.handleBlur()}
									placeholder="jane@example.com"
									autoComplete="email"
								/>
							)}
						/>
					)}
				</Field>

				<Field name="password">
					{(field) => (
						<FormField
							label="Password"
							field={field}
							input={(props) => (
								<input
									{...props}
									id={field.name}
									type="password"
									value={field.state.value}
									onChange={(event) => {
										field.handleChange(event.target.value);
									}}
									onBlur={() => field.handleBlur()}
									placeholder="••••••••"
									autoComplete="new-password"
								/>
							)}
						/>
					)}
				</Field>

				<Field name="password2">
					{(field) => (
						<FormField
							label="Confirm password"
							field={field}
							input={(props) => (
								<input
									{...props}
									id={field.name}
									type="password"
									value={field.state.value}
									onChange={(event) => {
										field.handleChange(event.target.value);
									}}
									onBlur={() => field.handleBlur()}
									placeholder="••••••••"
									autoComplete="new-password"
								/>
							)}
						/>
					)}
				</Field>

				<Subscribe
					selector={(state) => ({
						canSubmit: state.canSubmit,
						isSubmitting: state.isSubmitting,
					})}
				>
					{({ canSubmit, isSubmitting }) => (
						<button
							type="submit"
							className={tvc([
								"w-full",
								"rounded-xl",
								"bg-zinc-900",
								"px-4",
								"py-2",
								"text-sm",
								"font-medium",
								"text-white",
								"transition",
								"hover:bg-zinc-700",
								"disabled:cursor-not-allowed",
								"disabled:bg-zinc-400",
							])}
							disabled={!canSubmit || isSubmitting}
						>
							{isSubmitting
								? "Creating account…"
								: "Create account"}
						</button>
					)}
				</Subscribe>
			</form>

			<div
				className={tvc([
					"space-y-4",
					"text-center",
					"text-sm",
					"text-zinc-600",
				])}
			>
				<div>
					Already have an account?{" "}
					<Link
						className={tvc([
							"font-medium",
							"text-zinc-900",
							"underline",
						])}
						href="/public/login"
					>
						Log in
					</Link>
				</div>

				{registerMutation.error ? (
					<div
						className={tvc([
							"rounded-xl",
							"border",
							"border-red-200",
							"bg-red-50",
							"px-4",
							"py-2",
							"text-sm",
							"text-red-700",
						])}
					>
						{registerMutation.error instanceof Error
							? registerMutation.error.message
							: "Something went wrong. Please try again."}
					</div>
				) : null}
			</div>
		</div>
	);
}
