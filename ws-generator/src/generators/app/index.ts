import { BaseGenerator, BaseOptions } from '../../generator/index.js'

export default class AppGenerator extends BaseGenerator<BaseOptions> {
  initializing () {
    this._compose('project')
    this._compose('finalize')
  }

  async writing () {
    console.log('running app generator')
  }
}
