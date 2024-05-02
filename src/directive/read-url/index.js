import readUrl from './read-url'

export default {
  install (app) {
    app.directive('readUrl', readUrl)
  },
}
