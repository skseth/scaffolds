"use strict";

const Generator = require('yeoman-generator');
const scaffold = require('@skseth/scaffolder')
const fs = require('fs')
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
      super(args, opts);
  }

  async prompting() {
    // Replace this with your own prompts
    this.answers = await this.prompt([
      {
        type: "input",
        name: "generator_name",
        message: "generator name"      
      },
      {
        type: "input",
        name: "generator_description",
        message: "generator description"
      }
    ]);

    // {% replace "/generators", "/scaffold/generators" %}
    const srcSliceStr = '/generators/app/templates'
    // {% endreplace %}
    if (this.sourceRoot().endsWith(srcSliceStr)) {
      this.sourceRoot(this.sourceRoot().slice(0,-(srcSliceStr.length)))
    }
  }

  // the same code should work with all generators - you probably don't need to modify
  async writing() {

    // read async from fs
    const reader = async (filepath) => {
      console.log(`read ${filepath}`)
      return fs.promises.readFile(this.templatePath(filepath)).then((b) => b.toString())
    }

    // write sync to memfs
    const writer = (filepath, content) => this.fs.write(this.destinationPath(filepath), content)

    // filter git ignored files
    const gitDir = await scaffold.GitDir.New(this.sourceRoot())
    await scaffold.ScaffoldProcessGeneric(gitDir.walk(), reader, writer, this.answers)  

// {% if false -%}
    const content = this.fs.readJSON(this.destinationPath('package.json'))
    content.name = `generator-${this.answers.generator_name}`
    content.description = this.answers.generator_name
    this.fs.writeJSON(this.destinationPath('package.json'), content, null, 2)
// {% endif -%}
  }
};
