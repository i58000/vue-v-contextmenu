<template>
  <div id="app">
    <!-- 固定菜单 -->
    <div class="my-target an-pane primary" v-contextmenu.target>右键此方块（简单固定菜单）</div>
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
    >右键此方块（动态菜单）{{item.target}}</div>
    <DynamicContextMenu/>

    <!-- 点击 -->
    <div class="my-target an-pane error" v-contextmenu:bar.target.click>左键点击此方块</div>
    <div class="my-menu an-pane" v-contextmenu:bar.menu.click>
      <div class="item">固定菜单项-1</div>
    </div>
  </div>
</template>

<script>
// import VContextmenu from "./index";
import DynamicContextMenu from "./DynamicContextMenu";

export default {
  components: { DynamicContextMenu },
  // directives: {
  //   contextmenu: VContextmenu
  // },
  data() {
    return {
      list: [
        {
          target: "TARGET A",
          menu: ["MENU-A-1", "MENU-A-2", "MENU-A-3"]
        },
        {
          target: "TARGET B",
          menu: ["MENU-B-1", "MENU-B-2", "MENU-B-3"]
        },
        {
          target: "TARGET C",
          menu: ["MENU-C-1", "MENU-C-2", "MENU-C-3"]
        }
      ]
    };
  },
  created() {}
};
</script>
<style scoped>
#app {
  margin-top: 100px;
  margin-left: 100px;
}
.my-target {
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
