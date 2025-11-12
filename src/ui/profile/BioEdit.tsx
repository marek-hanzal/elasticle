"use client";

import type { SerializedEditor } from "lexical";
import type { FC } from "react";
import { useProfileBioPatchMutation } from "@/lib/mutation/useProfileBioPatchMutation";
import { tvc } from "@/lib/tvc";
import { Editor } from "@/ui/editor/Editor";
import type { ToolbarPlugin } from "@/ui/editor/ToolbarPlugin";

export namespace BioEdit {
	export interface Props {
		content?: SerializedEditor;
	}
}

export const BioEdit: FC<BioEdit.Props> = ({ content }) => {
	const profileBioPatchMutation = useProfileBioPatchMutation();

	const handleSave: ToolbarPlugin.onSave.Callback = ({ editor }) => {
		profileBioPatchMutation.reset();

		const editorState = editor.getEditorState().toJSON();
		const serialized = JSON.stringify({
			editorState,
		});

		profileBioPatchMutation.mutate({
			bio: serialized,
		});
	};

	let feedbackMessage: string | null = null;
	if (profileBioPatchMutation.isPending) {
		feedbackMessage = "Saving your bio…";
	} else if (profileBioPatchMutation.isSuccess) {
		feedbackMessage = "Your bio has been saved.";
	} else if (profileBioPatchMutation.isError) {
		feedbackMessage =
			profileBioPatchMutation.error instanceof Error
				? profileBioPatchMutation.error.message
				: "Unable to save your bio. Please try again.";
	}

	return (
		<div
			className={tvc([
				"space-y-4",
			])}
		>
			<Editor
				namespace="user.bio"
				placeholder="Share a short introduction, your interests, or anything you'd like others to know."
				content={content}
				onSave={handleSave}
			/>

			<div
				className={tvc([
					"text-sm",
					"text-zinc-600",
				])}
			>
				Use the toolbar to format your bio. When you are ready, press
				the save icon.
			</div>

			{feedbackMessage ? (
				<div
					aria-live="polite"
					className={tvc([
						"text-sm",
						profileBioPatchMutation.isError
							? "text-red-600"
							: "text-zinc-500",
					])}
				>
					{feedbackMessage}
				</div>
			) : null}
		</div>
	);
};
