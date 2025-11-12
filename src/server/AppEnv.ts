import z from "zod";

const ServerS3Schema = z.object({
	SERVER_S3_API: z.string().min(1, "S3 API endpoint is required"),
	SERVER_S3_KEY: z.string().min(1, "S3 key is required"),
	SERVER_S3_SECRET: z.string().min(1, "S3 secret is required"),
	SERVER_S3_BUCKET: z.string().min(1, "S3 bucket is required"),
});

const AppEnvSchema = z.object({
	SERVER_CONTENT_CDN: z.string().min(1, "Content CDN is required"),
	...ServerS3Schema.shape,
});

export const AppEnv = AppEnvSchema.parse(process.env);
