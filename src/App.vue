<template>
  <div id="app">
    <!-- 固定菜单 -->
    <div class="my-trigger an-pane primary" v-contextmenu.trigger>右键此方块（简单固定菜单）</div>
    <div class="my-menu an-pane" v-contextmenu.dhClick>
      <div class="item">固定菜单项-1</div>
      <div class="item">固定菜单项-2</div>
      <div class="item">固定菜单项-3</div>
    </div>

    <!-- 动态菜单，采用组件 -->
    <div
      class="my-trigger an-pane success"
      v-contextmenu:FOO.trigger="item.menu"
      v-for="(item, index) in list"
      :key="index"
    >右键此方块（动态菜单）- {{item.trigger}}</div>
    <DynamicContextMenu/>

    <!-- 点击 -->
    <div class="my-trigger an-pane error" v-contextmenu:bar.trigger.click>左键点击此方块</div>
    <div class="my-menu an-pane" v-contextmenu:bar>
      <div class="item">固定菜单项-1</div>
    </div>

    <!-- 内置组件 -->
    <div class="my-trigger an-pane warning" v-contextmenu:COM.trigger>右键此方块 - 内置菜单组件</div>
    <Contextmenu v-contextmenu:COM :menu="menu" @clickMenu="onclick">
      <template v-slot="{item}">
        <span :style="{color: item.color}">
          {{item.label}}
          <template v-if="item.star">*</template>
        </span>
      </template>
    </Contextmenu>

    <div class="my-trigger an-pane warning" v-contextmenu:COM-DARK.trigger>右键此方块 - 内置菜单组件 - Dark</div>
    <Contextmenu
      v-contextmenu:COM-DARK
      :content="item=>item.label"
      :menu="menu"
      @clickMenu="onclick"
      dark
    ></Contextmenu>
  </div>
</template>

<script>
// import VContextmenu from "./index";
// import { Contextmenu } from "./index";

import DynamicContextMenu from "./DynamicContextMenu";

export default {
  components: { DynamicContextMenu },
  // directives: {
  //   contextmenu: VContextmenu
  // },
  data() {
    return {
      menu: [
        {
          label: "颜色",
          children: [
            { label: "红色", color: "#f5222d" },
            { label: "蓝色", color: "#1890ff" },
            { label: "绿色", color: "#52c41a" }
          ]
        },
        {
          label: "符号",
          children: [
            { label: "有星星", star: true },
            { label: "没星星", star: false }
          ]
        },
        {
          label: "多级菜单",
          children: [
            {
              label: "AAA",
              children: [
                { label: "AA", children: [{ label: "A" }] },
                { label: "AA", children: [{ label: "A" }] }
              ]
            },
            {
              label: "BBB",
              children: [
                { label: "BB", children: [{ label: "B" }] },
                { label: "BB", children: [{ label: "B" }] }
              ]
            },

            {
              label: "CCC",
              children: [
                { label: "CC", children: [{ label: "C" }] },
                { label: "CC", children: [{ label: "C" }] }
              ]
            }
          ]
        }
      ],
      list: [
        {
          trigger: "Mail",
          menu: ["Hello", "nerfthisan@163.com", ":)"]
        },
        {
          trigger: "Github",
          menu: ["World", "i58000 @ github", ":>"]
        },
        {
          trigger: "NPM",
          menu: ["Welcome", "anjs @ npm", ":]"]
        }
      ]
    };
  },
  methods: {
    onclick(item, event) {
      console.log(item, event);
      // event.stopPropagation();
    }
  }
};
</script>
<style scoped>
#app {
  margin-top: 100px;
  margin-left: 100px;
}
.my-trigger {
  color: #fff;
  width: 300px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 40px;
}

.my-menu {
  background: #fff;
  padding: 4px 0;
}
.my-menu .item {
  color: #333;
  padding: 4px 10px;
}
.my-menu .item:hover {
  color: #fff;
  background: #1890ff;
}

.success {
  color: #fff;
  background: #52c41a;
}
.warning {
  color: #fff;
  background: #faad14;
}
.error {
  color: #fff;
  background: #f5222d;
}
.primary {
  color: #fff;
  background: #1890ff;
}
</style>

<style>
.an-pane {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}
</style>
