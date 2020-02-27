# vue-v-contextmenu

[![npm](https://raster.shields.io/badge/npm-vue--v--contextmenu-brightgreen.svg)](https://www.npmjs.com/package/vue-v-contextmenu)

> contextmenu vue directive and component based on Vue 2.0

## Introduction

**指令可分为两部分**

1. target 指令作用于触发菜单的元素上

2. menu 指令可作用于 DOM 元素或自定义 Vue 组件上

**右键 or 左键**

默认为右键菜单，使用`.click` 指令修饰符可切换为左键触发菜单

**多个菜单**

支持多个不同的菜单，可为菜单添加菜单名称参数`:name`

Contact me for any questions: nerfthisan@163.com

## Install

`npm install vue-v-contextmenu --save`

## Example

**固定菜单项**

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example1.PNG" width="300"/>

---

**动态菜单项**

> 根据所点击目标生成动态菜单选项

1. 右键点击 Mail 项

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example2.PNG" width="334"/>

2. 右键点击 Github 项

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example3.PNG" width="310"/>

3. 右键点击 NPM 项

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example4.PNG" width="300"/>

**左键点击**

> 除了右键触发菜单，亦支持左键点击弹出菜单，同样支持固定/动态菜单

<img src="https://raw.githubusercontent.com/i58000/vue-v-contextmenu/master/imgs/example5.PNG" width="310"/>

**全局引用**

```js
import VContextmenu from 'vue-v-contextmenu'
Vue.use(VContextmenu)
```

**组件内引用**

```js
import VContextmenu from 'vue-v-contextmenu'
export default {
  directives: {
    contextmenu: VContextmenu
  },
  ...
}
```

```html
<template>
  <div id="app">
    <!-- 固定菜单 -->
    <div class="my-target an-pane primary" v-contextmenu.target>
      右键此方块（简单固定菜单）
    </div>
    <div class="my-menu an-pane" v-contextmenu.menu>
      <div class="item">固定菜单项-1</div>
      <div class="item">固定菜单项-2</div>
      <div class="item">固定菜单项-3</div>
    </div>

    <!-- 动态菜单，采用组件 -->
    <div
      class="my-target an-pane success"
      v-contextmenu:FOO.target="item.menu"
      v-for="(item, index) in list"
      :key="index"
    >
      右键此方块（动态菜单）- {{item.target}}
    </div>
    <DynamicContextMenu />

    <!-- 左键点击 -->
    <div class="my-target an-pane error" v-contextmenu:bar.target.click>
      左键点击此方块
    </div>
    <div class="my-menu an-pane" v-contextmenu:bar.menu.click>
      <div class="item">固定菜单项-1</div>
    </div>
  </div>
</template>

<script>
  import DynamicContextMenu from './DynamicContextMenu'
  export default {
    components: { DynamicContextMenu },
    data() {
      return {
        list: [
          {
            target: 'Mail',
            menu: ['Hello', 'nerfthisan@163.com', ':)']
          },
          {
            target: 'Github',
            menu: ['World', 'i58000 @ github', ':>']
          },
          {
            target: 'NPM',
            menu: ['Welcome', 'anjs @ npm', ':]']
          }
        ]
      }
    }
  }
</script>
```

_DynamicContextMenu.vue_

```html
<template>
  <div v-contextmenu:FOO.menu="setData" class="my-menu an-pane">
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
