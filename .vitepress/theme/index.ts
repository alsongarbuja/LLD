import DefaultTheme from 'vitepress/theme'
import Tooltip from '../components/Tooltip.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register the component globally
    app.component('Tooltip', Tooltip)
  }
}