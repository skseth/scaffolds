import { ignoreFile } from '../../model/Files.js'
import { BaseGenerator, BaseOptions } from '../../generator/index.js'

export default class extends BaseGenerator<BaseOptions> {
  async writing () {
    ignoreFile(this.Project, '.gitignore')
      .load()
      .remove(this.Project.readTemplateFile('gitignore_remove'))
      .add(this.Project.readTemplateFile('gitignore'))
      .save()
  }
}
