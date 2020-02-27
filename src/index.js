import directive from './directives/v-contextmenu'
import component from './components/Contextmenu'

directive.install = Vue => {
  Vue.directive('contextmenu', directive)
  Vue.component('Contextmenu', component)
}

export default directive
export const Contextmenu = component
