import vue3PhotoPreview from 'vue3-photo-preview'
import 'vue3-photo-preview/dist/index.css'

export default {
  install (app) {
    app.use(vue3PhotoPreview)
  },
}
