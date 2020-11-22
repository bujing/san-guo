<template>
  <layout-container>
    <div
      class="wrap"
      @touchstart="onStart"
      @touchmove.prevent
      @touchend="onEnd"
    >
      <div
        class="box text-center"
        :style="{
          transform: `rotateX(${deg.x}deg) rotateY(${deg.y}deg)`
        }"
      >
        <div
          v-for="([x, y], i) in rotates"
          :key="i"
          class="hero flex main-content-center cross-items-center"
          :class="heroList[i].camp.toLowerCase()"
          :style="{
            transform: `rotateX(${x}deg) rotateY(${y}deg) translateZ(150px)`
          }"
        >
          <span class="first-name">{{heroList[i].firstName}}</span>
        </div>
      </div>
    </div>
  </layout-container>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onBeforeUnmount } from 'vue'
import heros from '@/assets/heros.json'

export default defineComponent({
  name: 'Home',
  setup () {
    const heroList = heros
    // 将领球体排列
    const count = 12
    const xRotate = [0, 30, 60, 90, 120, 150]
    const yRotate = Array(count).fill(1).map((v, i) => 360 / count * i)
    const rotates: [number, number][] = []
    xRotate.forEach((x, i) => {
      yRotate.forEach((y, j) => {
        const cross = [3, 9]
        const side = [2, 4, 8, 10]
        if (
          !i ||
          (cross.indexOf(j) === -1 && (i % 2 === 0 || side.indexOf(j) === -1))
        ) {
          rotates.push([x, y])
        }
      })
    })
    // 补全将领空缺
    if (rotates.length > heroList.length) {
      heroList.push(...heroList.slice(0, rotates.length - heroList.length))
    }

    // 轴转角
    const deg = reactive({ x: 0, y: 0 })
    const step = {
      x: 1,
      y: 1
    }

    // 声明定时器
    let interval = 0
    onMounted(() => {
      interval = window.setInterval(() => {
        deg.x += step.x
        deg.y += step.y
      }, 30)
    })

    // 移除定时器
    onBeforeUnmount(() => {
      window.clearInterval(interval)
    })

    let x = 0
    let y = 0
    function onStart (e: TouchEvent) {
      const touches = e.targetTouches[0]
      x = touches.pageX
      y = touches.pageY
    }
    function onEnd (e: TouchEvent) {
      const touches = e.changedTouches[0]
      x -= touches.pageX
      y -= touches.pageY
      step.x = y === 0 ? 0 : (y < 0 ? -1 : 1)
      step.y = x === 0 ? 0 : (x > 0 ? -1 : 1)
    }

    return {
      deg,
      rotates,
      heroList,
      onStart,
      onEnd
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.wrap {
  // perspective: 300px; // 景深
}
.box {
  height: 50px;
  margin: 200px auto;
  position: relative;
  transform-style: preserve-3d;
  width: 50px;
}
.hero {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px 2px #333;
  height: 42px;
  position: absolute;
  width: 42px;

  @each $camp, $value in $camp-color {
    &.#{$camp} {
      box-shadow: 0 0 5px 2px $value;
    }
  }
}
</style>
