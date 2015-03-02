module.exports = function(grunt) {

  const DEST = 'lib/expaste.js';
  const DEST_MIN = 'lib/expaste.min.js';

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    meta: {
      banner:
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
        ' * update: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * Author: <%= pkg.author %> [<%= pkg.website %>]\n' +
        ' * Github: <%= pkg.repository.url %>\n' +
        ' * License: Licensed under the <%= pkg.license %> License\n' +
        ' */'
    },
    uglify: {
      dist: {
        options: {
          banner: '<%= meta.banner %>' + '\n' +
          '\n' +
          '',
          report: 'gzip',
          sourceMap: true
        },
        src: [DEST],
        dest: DEST_MIN
      },
    },
    qunit: {
      all: [
        'test/*.html'
      ]
    }
  });

  grunt.registerTask('default', [
    'uglify',
    'qunit'
  ]);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');

};
