# vue-v-contextmenu

[![npm](https://img.shields.io/badge/npm-vue--v--contextmenu-brightgreen.svg)](https://www.npmjs.com/package/vue-v-contextmenu)

> contextmenu vue directive and component based on Vue 2.0

## Introduction

为用户右键（或左键）点击目标元素触发相应的上下文菜单，基于 Vue 2.0，核心用法为 Vue 指令，另可选开箱即用的上下文菜单 Vue 组件

## Install

`npm install vue-v-contextmenu --save`

## Example

#### 固定菜单项

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example1.PNG" width="300"/>

```html
<!-- 固定菜单 -->
<div v-contextmenu.trigger>
  右键此方块（简单固定菜单）
</div>
<div v-contextmenu.disableHideOnClick>
  <div>固定菜单项-1</div>
  <div>固定菜单项-2</div>
  <div>固定菜单项-3</div>
</div>
```

#### 动态菜单项

> 根据所点击目标生成动态菜单选项

1. 右键点击 Mail 项

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example2.PNG" width="334"/>

2. 右键点击 Github 项

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example3.PNG" width="310"/>

3. 右键点击 NPM 项

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example4.PNG" width="300"/>

```html
<template>
  <!-- 动态菜单，采用组件 -->
  <div
    v-contextmenu:FOO.trigger="item.menu"
    v-for="(item, index) in list"
    :key="index"
  >
    右键此方块（动态菜单）- {{item.trigger}}
  </div>
  <DynamicContextMenu />
</template>

<script>
  import DynamicContextMenu from './DynamicContextMenu'
  export default {
    components: { DynamicContextMenu },
    data() {
      return {
        list: [
          {
            trigger: 'Mail',
            menu: ['Hello', 'nerfthisan@163.com', ':)']
          },
          {
            trigger: 'Github',
            menu: ['World', 'i58000 @ github', ':>']
          },
          {
            trigger: 'NPM',
            menu: ['Welcome', 'anjs @ npm', ':]']
          }
        ]
      }
    }
  }
</script>

<!-- DynamicContextMenu.vue -->
<template>
  <div
    v-contextmenu:FOO.menu="setData"
    @click="$el.hide()"
  >
    <div v-for="(item, index) in data" :key="index" class="item">{{item}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: null
      }
    },
    methods: {
      setData(data) {
        this.data = data
      }
    }
  }
</script>
```

#### 左键点击

> 除了右键触发菜单，亦支持左键点击弹出菜单，同样支持固定/动态菜单

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example5.PNG" width="310"/>

```html
<!-- 左键点击 -->
<div v-contextmenu:bar.trigger.click>
  左键点击此方块
</div>
<div v-contextmenu:bar.click>
  <div>固定菜单项-1</div>
</div>
```

#### 全局引用

```js
import VContextmenu from 'vue-v-contextmenu'
Vue.use(VContextmenu)
```

#### 组件内引用

```js
import VContextmenu from 'vue-v-contextmenu'
import { Contextmenu } from 'vue-v-contextmenu'
export default {
  directives: {
    contextmenu: VContextmenu
  },
  components:{
    Contextmenu
  },
  ...
}
```

## Document

#### 指令类型

指令可分为两种类型：**触发器(trigger)** 和 **菜单(menu)**

1. 触发器指令：携带修饰符 `.trigger` 指令作用于触发器的元素上

2. 菜单指令：未携带修饰符 `.trigger` 可作用于 DOM 元素或自定义 Vue 组件上

```html
<!-- 基本用法 -->
<div v-contextmenu.trigger.click="data">点我弹出菜单</div>
<div v-contextmenu="setData">我是菜单本体</>
```

#### 动态菜单：指令参数

指令参数值主要是针对动态菜单，只使用固定菜单的话可以忽略本节。

两种类型的指令所传递的参数有所区别：

1. 触发器：传递数据对象`someData: any`
2. 菜单：传递动态渲染/改变菜单数据的方法`someMethod : String | Function`

   > 菜单指令的参数可传入`String`或`Function`，若传入为`String`，将在菜单指令所作用的元素的 Vue 组件实例中调用该方法名

简而言之：用户触发显示菜单时会执行 `someMethod(someData)`以完成动态菜单的渲染。

_参考示例 [动态菜单](####动态菜单项)_

#### 触发方式：右键 or 左键

默认为右键菜单，使用`.click` 指令修饰符可切换为左键单击触发菜单

```html
<!-- 左键点击触发 -->
<div v-contextmenu.trigger.click="data" />
<div v-contextmenu="setData" />
```

#### 菜单名称：多个菜单

支持多个不同的菜单，为添加菜单名称指令参数 `:{name}`，触发器`.trigger`和菜单指令所含的名称参数需匹配，如

```html
<!-- 菜单 with some name -->
<div v-contextmenu:somename.trigger="data" />
<div v-contextmenu:somename="setData" />

<!-- 菜单 with other name-->
<div v-contextmenu:othername.trigger="data" />
<div v-contextmenu:othername="setData" />
```

#### 菜单隐藏

1. 菜单默认会在以下事件产生时隐藏：

   1. 菜单指令 DOM 被点击 `click`
   2. 菜单指令 DOM 失去焦点 `blur`
   3. `document` 的滚动事件 `scroll`

2. 菜单指令提供以下相应的修饰符以取消默认隐藏事件：

   1. 取消菜单指令 DOM 被点击 `click`：`.disableHideOnClick` or `dhClick`
   2. 取消菜单指令 DOM 失去焦点 `blur`：`.disableHideOnBlur` or `dhBlur`
   3. 取消`document` 的滚动事件 `scroll`：`.disableHideOnScroll` or `dhScroll`

   _参考示例 [固定菜单项](####固定菜单项)_

3. 若需对菜单的隐藏做更细致的逻辑处理，可使用 DOM 元素上的`hide`方法，插件默认在菜单指令所作用的 DOM 元素上添加了 `hide` 方法，可直接调用。

   ```html
   <div v-contextmenu.disableHideOnClick="setData" ref="contextmenu">
     <div @click="$refs.contextmenu.hide()">点我才会隐藏</div>
     ...
   </div>
   ```

   _参考示例 [动态菜单项](####动态菜单项)_

## Component

提供了**开箱即用**的 **支持多级菜单** 和 **自定义节点模板**的 Vue 组件：`<Contextmenu/>`

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example6.PNG" width="400"/>

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example7.PNG" style="margin-left: 13px" width="500"/>

```html
<template>
  <div v-contextmenu.trigger>
    右键此方块 - 内置菜单组件
  </div>
  <Contextmenu v-contextmenu :menu="menu" @clickMenu="onclick">
    <template v-slot="{item}">
      <span :style="{color: item.color}">
        {{item.label}}
        <template v-if="item.star"
          >*</template
        >
      </span>
    </template>
  </Contextmenu>

  <div v-contextmenu:DARK.trigger>
    右键此方块 - 内置菜单组件 - Dark
  </div>
  <Contextmenu
    v-contextmenu:DARK
    :content="item=>item.label"
    :menu="menu"
    @clickMenu="onclick"
    dark
  ></Contextmenu>
</template>

<script>
  import VContextmenu from 'vue-v-contextmenu'
  import { Contextmenu } from 'vue-v-contextmenu'
  export default {
    directives: {
      contextmenu: VContextmenu
    },
    components: { Contextmenu },
    data() {
      return {
        menu: [
          {
            label: '颜色',
            children: [
              { label: '红色', color: '#f5222d' },
              { label: '蓝色', color: '#1890ff' },
              { label: '绿色', color: '#52c41a' }
            ]
          },
          {
            label: '符号',
            children: [
              { label: '有星星', star: true },
              { label: '没星星', star: false }
            ]
          },
          {
            label: '多级菜单',
            children: [
              {
                label: 'AAA',
                children: [
                  { label: 'AA', children: [{ label: 'A' }] },
                  { label: 'AA', children: [{ label: 'A' }] }
                ]
              },
              {
                label: 'BBB',
                children: [
                  { label: 'BB', children: [{ label: 'B' }] },
                  { label: 'BB', children: [{ label: 'B' }] }
                ]
              },

              {
                label: 'CCC',
                children: [
                  { label: 'CC', children: [{ label: 'C' }] },
                  { label: 'CC', children: [{ label: 'C' }] }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      onclick(item, event) {
        console.log(item, event)
        // event.stopPropagation();
      }
    }
  }
</script>
```

#### props

- menu _菜单数据_

  > type: Array
  >
  > 必须为数组类型的数据
  >
  > 数组中的元素对象的 `children` 属性为子菜单数组

- dark _深色主题_

  > type: Boolean
  >
  > default: false

- content _菜单中每一项显示的内容_

  > type: Function | String | Number
  >
  > 当传入一个回调函数时，参数为 `menu` 数据中的节点项
  >
  > 当传入非函数类型时，作为数据节点项的索引/属性取值

#### events

- clickMenu

  > 点击菜单中的任一项
  >
  > 参数 1 为 `menu` 数据中的节点项
  >
  > 参数 2 为 `click` 事件，调用 `stopPropagation()` 方法阻止事件冒泡可保持菜单不隐藏

#### slots

- default

> 默认插槽，_参考示例 [内置菜单组件](##Component)_

## Questions

Contact me for any questions: nerfthisan@163.com
