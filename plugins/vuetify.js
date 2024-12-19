import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
    },
    icons: {
      defaultSet: 'mdi', // Sử dụng bộ icons MDI mặc định
    },
  })
  nuxtApp.vueApp.use(vuetify)
})