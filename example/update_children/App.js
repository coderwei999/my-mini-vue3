import { h, ref } from '../../lib/vue3.esm.js'

import TextToText from './TextToText.js'
import TextToArray from './TextToArray&ArrayToText.js'
import ArrayToArray from './ArrayToArray.js'
export default {
  name: 'app',
  setup() {
    return {
    }
  },
  render() {
    return h('div', {}, [
      h("div", {}, '主页'),
      // h(TextToText)
      // h(TextToArray)
      h(ArrayToArray)
    ])
  },
}