import { addMissingKey } from '../../model/Files.js'
import { BaseGenerator, BaseOptions } from '../../generator/index.js'
import { latestDependencies } from '../../generator/helpers.js'

export default class extends BaseGenerator<BaseOptions> {

  initializing() {
    this._compose('finalize')
  }

  async prompting() {
    this.Project.addScripts(this.Project.readTemplateJson('scripts.json'))
  }

  async writing() {

    const myopts = {
      projectType: 'service',
      projectModule: 'esnext',
      projectModuleResolution: 'nodenext',
      tsTarget: 'ES2020',
      languageLib: 'ES2020'
    }

    this.Project.copyTemplateFile('project/tsconfig.json.ejs', 'tsconfigX.json', myopts)
    this.Project.copyTemplateFile('project/test/tsconfig.json.ejs', 'test/tsconfigX.json', myopts)

    this.Project.copyTemplateFile('build/tsconfig.common.json.ejs', 'build/tsconfig.common.json', myopts)
    this.Project.copyTemplateFile('build/tsconfig.project-type.json.ejs', `build/tsconfig.${myopts.projectType}.json`, myopts)

    this._json('packageX.json')
          .merge({
            dependencies: addMissingKey(await latestDependencies(this.Project.readTemplateJson('dependencies.json')))
          })
          .save()

  }

}   
