<template>
  <slot name="navBar">
    <div class="nav-bar flex cross-items-center">
      <div class="nav-bar__left">
        <i v-if="!$route.meta.top" class="nav-bar__left-icon text-center sgicon sgicon-larr" @click="$router.go(-1)"></i>
      </div>
      <div class="nav-bar__title text-lg text-center">{{title || $route.query.title || $route.meta.title}}</div>
      <div class="nav-bar__right"></div>
    </div>
  </slot>

  <slot/>

  <!-- v-slot:tabbar -->
  <div v-if="$slots.tabbar || $route.meta.top" class="tabbar-placeholder"/>
  <slot name="tabbar">
    <div v-if="$route.meta.top" class="tabbar flex main-content-evenly text-xs text-center">
      <router-link v-for="(v, i) in tabbarList" :key="i" :to="v.url" class="tabbar-item flex flex-column main-content-evenly">
        <i class="tabbar-item__icon sgicon" :class="`sgicon-${v.icon}`"></i>
        <div class="tabbar-item__text">{{v.name}}</div>
      </router-link>
    </div>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutContainer',
  props: {
    title: String
  },
  setup () {
    const tabbarList = [
      { name: '首页', icon: 'home', url: '/' },
      { name: '列表', icon: 'list', url: '/list' }
    ]

    return {
      tabbarList
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
