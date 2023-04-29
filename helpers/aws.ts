import { S3 } from "aws-sdk";
import axios from "axios";

/**
 * @name uploadToS3
 * @param {S3} s3
 * @param {S3} fileData
 * @returns {Promise<success:boolean; message:string; data:string;>}
 * @description uploading file to aws
 */
export const uploadToS3 = async (fileData: File, folder: string = "banner") => {
	try {
		const s3 = new S3({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION,
			signatureVersion: "v4",
		});
		const params = {
			Bucket: process.env.AWS_S3_BUCKET,
			Key: `${folder}/${Date.now()}.${fileData?.name.split(".").at(-1)}`,
			ContentType: fileData.type,
		};

		console.log("process.env.AWS_S3_BUCKET");
		console.log(process.env.AWS_S3_BUCKET);

		try {
			console.log("before upload");

			const url = await s3.getSignedUrlPromise("putObject", params);
			const res = await axios.put(url, fileData, {
				headers: {
					"Content-Type": String(fileData.type),
				},
			});

			console.log(url?.split("?").at(0));

			return url?.split("?")?.at(0);
		} catch (err) {
			console.log("err");
			console.log(err);

			return {
				success: false,
				message: "Unable to Upload the file",
				data: err,
			};
		}
	} catch (err) {
		console.log("err");
		console.log(String(err));

		return { success: false, message: "Unable to access this file", data: {} };
	}
};

/**
 * @name removeFileFromS3
 * @param {S3} s3
 * @param {S3} fileData
 * @returns {Promise<success:boolean; message:string; data:string;>}
 * @description uploading file to aws
 */
export const removeFileFromS3 = async (filePath: string) => {
	const s3 = new S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
		signatureVersion: "v4",
	});
	let __ = filePath.split("amazonaws.com/").at(-1);
	const command = {
		Bucket: process.env.AWS_S3_BUCKET!,
		Key: __!,
	};
	console.log("delete command");
	console.log(command);
	try {
		const res = await s3.deleteObject(command).promise();
		console.log("File removed from AWS", res);
		return {
			message: "File deleted successfully",
			success: true,
			data: res,
		};
	} catch (err) {
		return {
			success: false,
			message: String(err),
			data: null,
		};
	}
};
