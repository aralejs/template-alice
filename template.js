 'use strict';

exports.description = 'Create Alice module.';

exports.notes = '';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  grunt.util._.extend(init.prompts, {
    family: {
      message: 'your CMD family',
      default: 'alice',
      warning: ''
    }
  });

  init.process({type: 'alice'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('family'),
    init.prompt('version', '1.0.0'),
    init.prompt('description', ''),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs')
  ], function(err, props) {
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      'family': props.family,
      'name': props.name,
      'version': props.version,
      'description': props.description ,
      'homepage': props.homepage,
      'author': props.author,
      'repository': props.repository,
      'bugs': props.bugs,
      'spm': {
        'alias': {},
        'output': [props.name+'.css']
      }
    }, function(pkg, props) {
      ['family', 'root', 'tests', 'author', 'spm'].forEach(function(prop) {
        if (prop in props) { pkg[prop] = props[prop]; }
      });
      return pkg;
    });

    // All done!
    done();
  });
};
