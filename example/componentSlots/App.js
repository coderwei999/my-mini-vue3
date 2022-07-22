import { h } from '../../lib/vue3.esm.js'
import Foo from './foo.js'
export default {
  name: 'App',
  render() {
    return h('div', {
      id: 'root',
      class: ['flex', 'container-r'],
    }, [
      h('p', {
        class: 'red'
      }, 'red'),
      h('p', {
        class: 'blue'
      }, this.name),
      h(Foo, {}, [h('p', {}, '我是slot1'), h('p', {}, '我是slot2')])
    ])
  },
  setup() {
    return {
      name: 'hi my vue',
    }
  }
}
