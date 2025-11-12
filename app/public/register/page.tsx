"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import z from "zod";
import { useRegisterMutation } from "@/lib/mutation/useRegisterMutation";
import { RegisterSchema } from "@/lib/schema/RegisterSchema";
import { tvc } from "@/lib/tvc";

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
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<label
								className={tvc([
									"text-sm",
									"font-medium",
								])}
								htmlFor={field.name}
							>
								Nickname
							</label>
							<input
								id={field.name}
								className={tvc([
									"w-full",
									"rounded-xl",
									"border",
									"border-zinc-200",
									"bg-white",
									"px-4",
									"py-2",
									"text-sm",
									"text-zinc-900",
									"outline-none",
									"transition",
									"focus:border-zinc-400",
									"focus:ring-2",
									"focus:ring-zinc-200",
								])}
								value={field.state.value}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
								onBlur={() => field.handleBlur()}
								placeholder="Jane Doe"
								autoComplete="name"
							/>
							{field.state.meta.errors[0] ? (
								<div
									className={tvc([
										"text-xs",
										"text-red-500",
									])}
								>
									{String(field.state.meta.errors[0].message)}
								</div>
							) : null}
						</div>
					)}
				</Field>

				<Field name="email">
					{(field) => (
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<label
								className={tvc([
									"text-sm",
									"font-medium",
								])}
								htmlFor={field.name}
							>
								Email
							</label>
							<input
								id={field.name}
								type="email"
								className={tvc([
									"w-full",
									"rounded-xl",
									"border",
									"border-zinc-200",
									"bg-white",
									"px-4",
									"py-2",
									"text-sm",
									"text-zinc-900",
									"outline-none",
									"transition",
									"focus:border-zinc-400",
									"focus:ring-2",
									"focus:ring-zinc-200",
								])}
								value={field.state.value}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
								onBlur={() => field.handleBlur()}
								placeholder="jane@example.com"
								autoComplete="email"
							/>
							{field.state.meta.errors[0] ? (
								<div
									className={tvc([
										"text-xs",
										"text-red-500",
									])}
								>
									{String(field.state.meta.errors[0].message)}
								</div>
							) : null}
						</div>
					)}
				</Field>

				<Field name="password">
					{(field) => (
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<label
								className={tvc([
									"text-sm",
									"font-medium",
								])}
								htmlFor={field.name}
							>
								Password
							</label>
							<input
								id={field.name}
								type="password"
								className={tvc([
									"w-full",
									"rounded-xl",
									"border",
									"border-zinc-200",
									"bg-white",
									"px-4",
									"py-2",
									"text-sm",
									"text-zinc-900",
									"outline-none",
									"transition",
									"focus:border-zinc-400",
									"focus:ring-2",
									"focus:ring-zinc-200",
								])}
								value={field.state.value}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
								onBlur={() => field.handleBlur()}
								placeholder="••••••••"
								autoComplete="new-password"
							/>
							{field.state.meta.errors[0] ? (
								<div
									className={tvc([
										"text-xs",
										"text-red-500",
									])}
								>
									{String(field.state.meta.errors[0].message)}
								</div>
							) : null}
						</div>
					)}
				</Field>

				<Field name="password2">
					{(field) => (
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<label
								className={tvc([
									"text-sm",
									"font-medium",
								])}
								htmlFor={field.name}
							>
								Confirm password
							</label>
							<input
								id={field.name}
								type="password"
								className={tvc([
									"w-full",
									"rounded-xl",
									"border",
									"border-zinc-200",
									"bg-white",
									"px-4",
									"py-2",
									"text-sm",
									"text-zinc-900",
									"outline-none",
									"transition",
									"focus:border-zinc-400",
									"focus:ring-2",
									"focus:ring-zinc-200",
								])}
								value={field.state.value}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
								onBlur={() => field.handleBlur()}
								placeholder="••••••••"
								autoComplete="new-password"
							/>
							{field.state.meta.errors[0] ? (
								<div
									className={tvc([
										"text-xs",
										"text-red-500",
									])}
								>
									{String(field.state.meta.errors[0].message)}
								</div>
							) : null}
						</div>
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
