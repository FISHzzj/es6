var gulp = require('gulp');
var sftp = require('gulp-scp2');

gulp.task('default', function () {
  console.log('打包完成，正在上传到服务器')
  return gulp.src('./dist/**/*')
    .pipe(sftp({
      host: '120.25.126.5',
      port:22,
      username: 'root',
      password: 'DFkjs2019BEST###',
      dest:'/www/wwwroot/7280_iiio/dist/',
      watch: function(client) {
        client.on('write', function(o) {
          console.log('write %s', o.destination);
        });
      }
    }))
    .on('error', (err) => {
      console.log(err)
    })
    .on('end', () => {
      console.log('上传完成')
    })
});