import directive from './directives/v-contextmenu'
import ContextmenuComponent from './components/Contextmenu'

directive.install = (Vue, { component } = { component: true }) => {
  Vue.directive('contextmenu', directive)
  if (component) {
    const name = typeof component === 'string' ? component : 'Contextmenu'
    Vue.component(name, ContextmenuComponent)
  }
}

export default directive
export const Contextmenu = ContextmenuComponent
