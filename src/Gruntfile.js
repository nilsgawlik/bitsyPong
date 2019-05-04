module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // build the bitsy hacks
    run: {
      options: {
        cwd: './bitsy-hacks',
      },
      default: {
        exec: 'npm run build',
      }
    },
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
            src: ['src/**', './bitsy-hacks/dist/dungeon-hack.js', './bitsy-hacks/dist/move-sprite.js'],
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
                          '<script src=dungeon-hack.js></script>\n' + 
                          '<script src=move-sprite.js></script>\n' + 
                          '<\/head>',
                    }
                ]
              },
            files: [
                {expand: true, flatten: true, src: ['src/dungeon_adventure.html'], dest: 'build/'}
            ]
        }
    },
    // watch for updates in files and build when a file has changed
    watch: {
      all: {
        files: ['src/**', 'bitsy-hacks/src/**'],
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
  grunt.registerTask('default', ['run', 'clean', 'copy', 'replace']);

};