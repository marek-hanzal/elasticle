"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useProfilePatchMutation } from "@/lib/mutation/useProfilePatchMutation";
import { ProfilePatchSchema } from "@/lib/schema/ProfilePatchSchema";
import { tvc } from "@/lib/tvc";
import { FormField } from "@/ui/form/FormField";

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
					<FormField
						input={(props) => (
							<input
								id={field.name}
								value={field.state.value}
								onChange={(event) => {
									field.handleChange(event.target.value);
								}}
								onBlur={() => field.handleBlur()}
								autoComplete="given-name"
								{...props}
							/>
						)}
						field={field}
					/>
				)}
			</Field>

			<Field name="surname">
				{(field) => (
					<FormField
						input={(props) => (
							<input
								id={field.name}
								value={field.state.value}
								onChange={(event) => {
									field.handleChange(event.target.value);
								}}
								onBlur={() => field.handleBlur()}
								autoComplete="family-name"
								{...props}
							/>
						)}
						field={field}
					/>
				)}
			</Field>

			<Field name="birthday">
				{(field) => (
					<FormField
						input={(props) => (
							<input
								id={field.name}
								type="date"
								value={field.state.value?.toISOString() ?? ""}
								onChange={(event) => {
									field.handleChange(
										new Date(event.target.value),
									);
								}}
								onBlur={() => field.handleBlur()}
								{...props}
							/>
						)}
						field={field}
					/>
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
