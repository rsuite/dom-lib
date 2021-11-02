/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const util = require('util');
const del = require('del');
const path = require('path');
const babel = require('gulp-babel');
const gulp = require('gulp');
const babelrc = require('../babel.config');
const { default: proxyDirectories } = require('./proxyDirectories');
const pkg = require('../package.json');

const writeFile = util.promisify(fs.writeFile);
const srcRoot = path.join(__dirname, '../src');
const libRoot = path.join(__dirname, '../lib');

const esmRoot = path.join(libRoot, 'esm');
const cjsRoot = path.join(libRoot, 'cjs');
const tsSources = [`${srcRoot}/**/*.ts`];

function clean(done) {
  del.sync([libRoot], { force: true });
  done();
}

function buildCjs() {
  return gulp.src(tsSources).pipe(babel(babelrc())).pipe(gulp.dest(cjsRoot));
}

function buildEsm() {
  return gulp
    .src(tsSources)
    .pipe(
      babel(
        babelrc(null, {
          NODE_ENV: 'esm'
        })
      )
    )
    .pipe(gulp.dest(esmRoot));
}

function buildDirectories(done) {
  proxyDirectories().then(() => {
    done();
  });
}

function copyDocs() {
  return gulp.src(['../README.md', '../CHANGELOG.md', '../LICENSE']).pipe(gulp.dest(libRoot));
}

function createPkgFile(done) {
  delete pkg.devDependencies;
  delete pkg.files;

  pkg.main = 'cjs/index.js';
  pkg.module = 'esm/index.js';
  pkg.typings = 'esm/index.d.ts';
  pkg.scripts = {
    //prepublishOnly: '../node_modules/mocha/bin/mocha ../test/validateBuilds.js'
  };

  writeFile(`${libRoot}/package.json`, JSON.stringify(pkg, null, 2) + '\n')
    .then(() => {
      done();
    })
    .catch(err => {
      if (err) console.error(err.toString());
    });
}

exports.build = gulp.series(
  clean,
  gulp.parallel(buildCjs, buildEsm),
  gulp.parallel(copyDocs, createPkgFile),
  buildDirectories
);
