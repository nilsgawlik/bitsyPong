module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // delete old files in the build directory
    clean: {
      default: {
        src: 'build/'
      },
    },
    // copy src files and bitsy hacks into the build folder
    copy: {
      default: {
        files: [
          {
            expand: true,
            flatten: true,
            // List your hacks here
            src: ['src/**'],
            dest: 'build/',
          }
        ],
      },
    },
    // inject the hacks into the html file
    replace: {
        default: {
            options: {
                patterns: [
                    {
                        match: /<\/head>/,
                        // Also add your hacks here
                        replacement: 
                          '<audio id="music" src="pongTrack.wav" loop></audio>\n' + 
                          '<audio id="sfxBounce" src="pongBounce.wav"></audio>\n' + 
                          '<audio id="sfxEnd" src="pongEnd.wav"></audio>\n' + 
                          '<script src=bitsymuse.js></script>\n' + 
                          '<script src=pong-hack.js></script>\n' + 
                          '<\/head>',
                    }
                ]
              },
            files: [
                {expand: true, flatten: true, src: ['src/bitsypong.html'], dest: 'build/'}
            ]
        }
    },
    // watch for updates in files and build when a file has changed
    watch: {
      all: {
        files: ['src/**'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-run');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'replace']);

};