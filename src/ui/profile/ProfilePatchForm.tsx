"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useProfilePatchMutation } from "@/lib/mutation/useProfilePatchMutation";
import { ProfilePatchSchema } from "@/lib/schema/ProfilePatchSchema";
import { tvc } from "@/lib/tvc";

export namespace ProfilePatchForm {
	export interface Props {
		defaultValues: ProfilePatchSchema.Type;
	}
}
export const ProfilePatchForm: FC<ProfilePatchForm.Props> = ({
	defaultValues,
}) => {
	const router = useRouter();

	const profilePatchMutation = useProfilePatchMutation();

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: ProfilePatchSchema,
		},
		async onSubmit({ value }) {
			const result = await profilePatchMutation.mutateAsync(value);

			router.push("/user/profile");

			return result;
		},
	});

	const { Field, Subscribe } = form;

	return (
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
							Name
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
							onChange={(event) => {
								field.handleChange(event.target.value);
							}}
							onBlur={() => field.handleBlur()}
							autoComplete="given-name"
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

			<Field name="surname">
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
							Surname
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
							onChange={(event) => {
								field.handleChange(event.target.value);
							}}
							onBlur={() => field.handleBlur()}
							autoComplete="family-name"
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

			<Field name="birthday">
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
							Birthdate
						</label>
						<input
							id={field.name}
							type="date"
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
							value={field.state.value?.toISOString() ?? ""}
							onChange={(event) => {
								field.handleChange(
									new Date(event.target.value),
								);
							}}
							onBlur={() => field.handleBlur()}
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
					isSubmitting: state.isSubmitting,
					canSubmit: state.canSubmit,
				})}
			>
				{({ isSubmitting, canSubmit }) => (
					<button
						className={tvc([
							"inline-flex",
							"items-center",
							"justify-center",
							"rounded-xl",
							"bg-zinc-900",
							"px-5",
							"py-2.5",
							"text-sm",
							"font-medium",
							"text-white",
							"transition",
							"hover:bg-zinc-800",
							"disabled:cursor-not-allowed",
							"disabled:bg-zinc-400",
						])}
						type="submit"
						disabled={!canSubmit || isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save changes"}
					</button>
				)}
			</Subscribe>

			{profilePatchMutation.error ? (
				<div
					className={tvc([
						"text-sm",
						"text-red-500",
					])}
					role="alert"
				>
					{profilePatchMutation.error.message}
				</div>
			) : null}
		</form>
	);
};
