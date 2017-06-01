#! /usr/bin/env node

require('dotenv').config()

var s3 = require('s3')

var client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
  }
})

var uploader = client.uploadDir({
  localDir: './dist',
  deleteRemoved: true, // default false, whether to remove s3 objects
  s3Params: {
    Bucket: process.env.AWS_S3_BUCKET
  }
})
uploader.on('error', function (err) {
  console.error('unable to sync:', err.stack)
})
uploader.on('fileUploadStart', function (localFilePath) {
  console.log('Uploading ' + localFilePath)
})
uploader.on('end', function () {
  console.log('Done!')
})
