import { addMissingKey } from '../../model/Files.js'
import { BaseGenerator, BaseOptions } from '../../generator/index.js'

export default class extends BaseGenerator<BaseOptions> {
  async writing () {
    this._json('packageX.json')
      .merge({
        scripts: addMissingKey(this.Project.scripts)
      })
      .save()
  }
}
