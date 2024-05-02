import keyFocus from './key-focus'

export default {
  install (app) {
    app.directive('keyFocus', keyFocus)
  },
}
