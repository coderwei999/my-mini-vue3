// 定义关于浏览器的渲染器
import { isOn } from '@coderwei-mini-vue3/shared'
import { createRenderer } from '@coderwei-mini-vue3/runtime-core'

function createElement(type) {
  // console.log('create el 操作', type)
  const element = document.createElement(type)
  return element
}

function createText(text) {
  return document.createTextNode(text)
}

function setText(node: HTMLElement, text) {
  // console.log('调用到这里了', node, text)

  node.nodeValue = text
}

function setElementText(el, text) {
  // console.log('SetElementText', el, text)
  el.textContent = text
}

// 处理浏览器端 元素style样式
function patchStyle(el, value) {
  console.log(value)
  const { style } = el
  for (const key in value) {
    style[key] = value[key]
  }
}

function patchProp(el, key, preValue, nextValue) {
  // preValue 之前的值
  // 为了之后 update 做准备的值
  // nextValue 当前的值
  // console.log(`PatchProp 设置属性:${key} 值:${nextValue}`)
  // console.log(`key: ${key} 之前的值是:${preValue}`)

  if (isOn(key)) {
    // 添加事件处理函数的时候需要注意一下
    // 1. 添加的和删除的必须是一个函数，不然的话 删除不掉
    //    那么就需要把之前 add 的函数给存起来，后面删除的时候需要用到
    // 2. nextValue 有可能是匿名函数，当对比发现不一样的时候也可以通过缓存的机制来避免注册多次
    // 存储所有的事件函数
    const invokers = el._vei || (el._vei = {})
    const existingInvoker = invokers[key]
    if (nextValue && existingInvoker) {
      // patch
      // 直接修改函数的值即可
      existingInvoker.value = nextValue
    } else {
      const eventName = key.slice(2).toLowerCase()
      if (nextValue) {
        const invoker = (invokers[key] = nextValue)
        el.addEventListener(eventName, invoker)
      } else {
        el.removeEventListener(eventName, existingInvoker)
        invokers[key] = undefined
      }
    }
  } else if (key === 'style') {
    patchStyle(el, nextValue)
  } else {
    if (nextValue === null || nextValue === undefined) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextValue)
    }
  }
}

function insert(child, parent, anchor = null) {
  // console.log('Insert操作')
  parent.insertBefore(child, anchor)
}

function remove(child) {
  const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}

function querySelect(note) {
  return document.querySelector(note)
}

let renderer

function ensureRenderer() {
  // 如果 renderer 有值的话，那么以后都不会初始化了
  return (
    renderer ||
    (renderer = createRenderer({
      createElement,
      createText,
      setText,
      setElementText,
      patchProp,
      insert,
      remove,
      querySelect
    }))
  )
}

export const createApp = (...args) => {
  return ensureRenderer().createApp(...args)
}

export * from '@coderwei-mini-vue3/runtime-core'
