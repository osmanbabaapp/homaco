import { S3 } from 'aws-sdk'
import axios from 'axios'

/**
 *
 * @name uploadToS3
 * @param {S3} s3
 * @param {S3} fileData
 * @returns {Promise<success:boolean; message:string; data:string;>}
 * @description uploading file to aws
 */
export const uploadToS3 = async (fileData: File, slug?: string) => {
  try {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    })
    const params = {
      // ACL: 'public-read',
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `banner/${Date.now()}.${fileData?.name.split('.').at(-1)}`,
      ContentType: fileData.type,
    }

    console.log('process.env.AWS_S3_BUCKET')
    console.log(process.env.AWS_S3_BUCKET)

    try {
      console.log('before upload')

      const url = await s3.getSignedUrlPromise('putObject', params)
      const res = await axios.put(url, fileData, {
        headers: {
          'Content-Type': String(fileData.type),
        },
      })

      console.log(url?.split('?').at(0))

      //   const res = await s3.upload(params).promise()
      //   console.log('File uploaded successfully', res.Location)
      //   return {
      //     message: 'File uploaded successfully',
      //     success: true,
      //     data: res.Location as string,
      //   }

      return url?.split('?')?.at(0)
    } catch (err) {
      console.log('err')
      console.log(err)

      return {
        success: false,
        message: 'Unable to Upload the file',
        data: err,
      }
    }
  } catch (err) {
    console.log('err')
    console.log(String(err))

    return { success: false, message: 'Unable to access this file', data: {} }
  }
}
