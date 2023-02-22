const gulp = require('gulp')
const awspublish = require('gulp-awspublish')
const parallelize = require('concurrent-transform')

// https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html

const config = {
  // Required
  params: {
    Bucket: process.env.AWS_BUCKET_NAME
  },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v3'
  },
  // Optional
  deleteOldVersions: true, // NOT FOR PRODUCTION
  region: process.env.AWS_DEFAULT_REGION,
  distDir: 'public',
  indexRootPath: true,
  cacheFileName: '.cache/awspublish',
  concurrentUploads: 10
}

gulp.task('deploy', function () {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  console.log(config)
  const publisher = awspublish.create(config, {cacheFileName: config.cacheFileName})

  let g = gulp.src('./' + config.distDir + '/**')
  // publisher will add Content-Length, Content-Type and headers specified above
  // If not specified it will set x-amz-acl to public-read by default
  g = g.pipe(
    parallelize(publisher.publish(config.headers), config.concurrentUploads)
  )

  // Invalidate CDN

  // Delete removed files
  if (config.deleteOldVersions) {
    g = g.pipe(publisher.sync())
  }
  // create a cache file to speed up consecutive uploads
  g = g.pipe(publisher.cache())
  // print upload updates to console
  g = g.pipe(awspublish.reporter())
  return g
})
