import Generator from 'yeoman-generator'
import { Project } from '../model/Project.js'
import { json } from '../model/Files.js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export interface BaseOptions {
    project: Project
}

export class BaseGenerator<T extends BaseOptions> extends Generator<T> {
  appproject: Project
  constructor (args: any, opts: T) {
    super(args, opts)
    this.appproject = new Project(this, opts.project)
  }

  _json (filepath: string, useWorkspace: boolean = false) {
    return json(this.appproject, filepath)
      .load()
  }

  _compose (genpath: string, options: BaseOptions = { project: this.appproject }) {
    this.composeWith(require.resolve(`../generators/${genpath}`), options)
  }

  get Project (): Project {
    return this.appproject
  }
}
