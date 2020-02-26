<template>
  <div v-contextmenu:FOO.menu="setData" class="my-menu an-pane">
    <div v-for="(item, index) in data" :key="index" class="item">{{item}}</div>
  </div>
</template>

<script>
// import VContextmenu from "./index";

export default {
  // directives: {
  //   contextmenu: VContextmenu
  // },
  data() {
    return {
      data: null
    };
  },
  methods: {
    setData(data) {
      this.data = data;
    }
  }
};
</script>

<style scoped>
.my-menu {
  background: #333;
  padding: 4px 0;
}
.my-menu .item {
  color: #fff;
  padding: 4px 10px;
}
.my-menu .item:hover {
  background: #1890ff;
}
</style>
