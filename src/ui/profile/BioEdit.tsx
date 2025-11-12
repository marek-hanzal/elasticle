"use client";

import type { SerializedEditor } from "lexical";
import type { FC } from "react";
import { toast } from "sonner";
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
		const editorState = editor.getEditorState().toJSON();
		const serialized = JSON.stringify({
			editorState,
		});

		const promise = profileBioPatchMutation.mutateAsync({
			bio: serialized,
		});

		toast.promise(promise, {
			loading: "Saving your bio…",
			success: "Your bio has been saved.",
			error: "Unable to save your bio. Please try again.",
		});
	};

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
					"text-zinc-400",
				])}
			>
				Use the toolbar to format your bio. When you are ready, press
				the save icon.
			</div>
		</div>
	);
};
