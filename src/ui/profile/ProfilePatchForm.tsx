"use client";

import { useForm } from "@tanstack/react-form";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { toast } from "sonner";
import z from "zod";
import { useProfilePatchMutation } from "@/lib/mutation/useProfilePatchMutation";
import { ProfilePatchSchema } from "@/lib/schema/ProfilePatchSchema";
import { tvc } from "@/lib/tvc";
import { FormField } from "@/ui/form/FormField";

export namespace ProfilePatchForm {
	export interface Props {
		defaultValues: ProfilePatchSchema.Type;
	}
}

const ProfilePatchFormSchema = ProfilePatchSchema.extend({
	photoFile: z
		.instanceof(File, {
			message: "Please select an image file.",
		})
		.or(z.null())
		.optional(),
});

export namespace ProfilePatchFormSchema {
	export type Type = z.infer<typeof ProfilePatchFormSchema>;
}

export const ProfilePatchForm: FC<ProfilePatchForm.Props> = ({
	defaultValues,
}) => {
	const router = useRouter();

	const profilePatchMutation = useProfilePatchMutation();

	const form = useForm({
		defaultValues: {
			...defaultValues,
			photoFile: null,
			birthday: DateTime.fromISO(defaultValues.birthday).toFormat(
				"yyyy-MM-dd",
			),
		} satisfies ProfilePatchFormSchema.Type as ProfilePatchFormSchema.Type,
		validators: {
			onSubmit: ProfilePatchFormSchema,
		},
		async onSubmit({ value }) {
			const result = profilePatchMutation.mutateAsync(value);

			toast.promise(result, {
				loading: "Saving your profile…",
				success: "Your profile has been saved.",
				error: "Unable to save your profile. Please try again.",
			});

			await result;

			router.push("/user/profile");
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
						label="Name"
						input={(props) => (
							<input
								{...props}
								id={field.name}
								value={field.state.value}
								onChange={(event) => {
									field.handleChange(event.target.value);
								}}
								onBlur={() => field.handleBlur()}
								autoComplete="given-name"
							/>
						)}
						field={field}
					/>
				)}
			</Field>

			<Field name="surname">
				{(field) => (
					<FormField
						label="Surname"
						input={(props) => (
							<input
								{...props}
								id={field.name}
								value={field.state.value}
								onChange={(event) => {
									field.handleChange(event.target.value);
								}}
								onBlur={() => field.handleBlur()}
								autoComplete="family-name"
							/>
						)}
						field={field}
					/>
				)}
			</Field>

			<Field name="photoFile">
				{(field) => (
					<FormField
						label="Profile photo"
						input={(props) => (
							<div
								className={tvc([
									"space-y-2",
								])}
							>
								<input
									{...props}
									id={field.name}
									type="file"
									accept="image/jpeg,image/png,image/webp"
									onChange={(event) => {
										field.handleChange(
											event.target.files?.[0] ?? null,
										);
									}}
									onBlur={() => field.handleBlur()}
								/>
							</div>
						)}
						field={field}
					/>
				)}
			</Field>

			<Field name="birthday">
				{(field) => (
					<FormField
						label="Birthday"
						input={(props) => (
							<input
								{...props}
								id={field.name}
								type="date"
								value={field.state.value ?? ""}
								onChange={(event) => {
									field.handleChange(event.target.value);
								}}
								onBlur={() => field.handleBlur()}
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
