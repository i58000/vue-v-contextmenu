<template>
  <div :class="{dark}" class="contextmenu">
    <div
      class="contextmenu-item"
      v-for="(item, index) in menu"
      :key="index"
      @mouseenter="active = item"
      @mouseleave="active = null"
    >
      <div class="contextmenu-item__slot" @click="$emit('clickMenu',item, $event)">
        <template v-if="content">
          <span>{{typeof content === 'function' ? content(item) : item[content]}}</span>
        </template>
        <template v-else>
          <slot :item="item">{{item}}</slot>
        </template>
      </div>
      <div
        class="contextmenu-item__children"
        v-if="item.children && item.children.length > 0"
        v-show="active === item"
      >
        <Contextmenu :menu="item.children" :content="content" @clickMenu="onClickMenu" :dark="dark">
          <template v-slot="{item}">
            <slot :item="item"></slot>
          </template>
        </Contextmenu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contextmenu",
  props: {
    menu: Array,
    content: Function | String | Number,
    dark: Boolean
  },
  data() {
    return {
      active: null
    };
  },
  methods: {
    onClickMenu(item, $event) {
      this.$emit("clickMenu", item, $event);
    }
  }
};
</script>

<style scoped>
.dark.contextmenu {
  background: #000;
}
.dark.contextmenu .contextmenu-item {
  color: #fff;
}

.contextmenu {
  position: absolute;
  background: #fff;
  /* width: 100px; */
  min-width: 80px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  padding: 4px 0;
  cursor: pointer;
}
.contextmenu-item {
  position: relative;
  padding: 4px 8px;
  color: #000;
  transition: all 0.3s;
}
.contextmenu-item:hover {
  color: #fff;
  background: #1890ff;
}
.contextmenu-item__children {
  position: absolute;
  left: 100%;
  top: -4px;
}
</style>

