<template>
  <layout-container>
    <div class="filter flex cross-items-center">
      <label v-for="(v, i) in Object.keys(CAMPS_CN)" :key="i" class="filter-item text-sm text-center" :class="{ [v.toLowerCase()]: camps.indexOf(v) > -1 }">
        <input v-model="camps" type="checkbox" :value="v"/>{{CAMPS_CN[v]}}
      </label>
      <!-- <i class="sgicon sgicon-filter"/> -->
    </div>

    <div class="hero">
      <div class="hero-grid sticky">
        <span>姓名</span>
        <span v-for="(v, i) in abilities" :key="i" @click="onChange(i)">
          {{v.text}}<svg class="sgicon-svg" aria-hidden="true"><use :xlink:href="`#sgicon-${['sort', 'desc', 'asc'][v.value % 3]}`"></use></svg>
        </span>
      </div>
      <div v-for="(v, i) in heroList" :key="i" class="hero-grid">
        <div class="flex cross-items-center">
          <span v-if="camps.length > 1" class="hero-camp text-center" :class="v.camp.toLowerCase()">{{CAMPS_CN[v.camp]}}</span>
          <span>{{v.lastName}}{{v.firstName}}</span>
        </div>
        <span>{{v.command}}</span>
        <span>{{v.led}}</span>
        <span>{{v.valor}}</span>
        <span>{{v.force}}</span>
        <span>{{v.tactic}}</span>
        <span>{{v.strategy}}</span>
      </div>
      <div v-if="heroList.length === 0" class="hero-empty text-sm text-center">空空如也</div>
    </div>
  </layout-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import heros from '@/assets/heros.json'

export default defineComponent({
  name: 'List',
  setup () {
    // 将领阵营
    const CAMPS_CN = {
      WEI: '魏',
      SHU: '蜀',
      WU: '吴',
      QUN: '群'
    }

    // 将领能力值
    const abilities = reactive([
      { text: '统', code: 'command', value: 0 },
      { text: '率', code: 'led', value: 0 },
      { text: '勇', code: 'valor', value: 0 },
      { text: '武', code: 'force', value: 0 },
      { text: '谋', code: 'tactic', value: 0 },
      { text: '略', code: 'strategy', value: 0 }
    ])
    // 更新排序条件-将领能力值
    function onChange (i: number) {
      abilities.forEach((v, j) => {
        if (j === i) {
          abilities[j].value++
        } else {
          abilities[j].value = 0
        }
      })
    }
    // 计算值-排序能力值索引
    const sort = computed(() => abilities.findIndex(v => v.value % 3 !== 0))

    // 将领阵营，当前选中的阵营
    const camps = ref(Object.keys(CAMPS_CN))

    // 将领列表，按阵营筛选，按能力值排序
    const heroList = ref([] as HeroType[])
    function onSort () {
      heroList.value = heros.filter(v => camps.value.indexOf(v.camp) > -1)
      if (sort.value !== -1) {
        const { code, value } = abilities[sort.value]
        heroList.value.sort((a, b) => {
          const diff = Math.abs(a[code]) - Math.abs(b[code])
          return value % 3 === 1 ? -diff : diff
        })
      }
    }

    // 观察阵营、排序条件的改变，更新显示的将领列表
    watch([camps, sort], onSort, { immediate: true })

    return {
      CAMPS_CN,
      abilities,
      camps,
      heroList,
      onChange,
      onSort
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.filter {
  height: 32px;
  padding: 16px 16px 0;

  &-item {
    border-radius: 50%;
    box-shadow: inset 0 0 5px 2px #ccc;
    color: #999;
    line-height: 32px;
    margin-right: 16px;
    width: 32px;

    @each $camp, $value in $camp-color {
      &.#{$camp} {
        box-shadow: inset 0 0 5px 2px $value;
        color: $value;
        font-weight: 500;
      }
    }
  }

  input[type=checkbox] {
    display: none;
  }
}

.sgicon-svg {
  height: 16px;
  vertical-align: -0.15em;
  width: 16px;
}

.hero {
  border-radius: 4px;
  box-shadow: 0 0 3px 1px #ccc;
  margin: 16px;

  &-grid {
    border-bottom: 1px solid #f2f2f2;
    display: grid;
    grid-template-columns: 2fr repeat(6, 1fr);
    padding: 8px 0 8px 16px;

    &:first-child { border-radius: 4px 4px 0 0; }
    &:last-child { border-radius: 0 0 4px 4px; }

    &.sticky {
      background-color: #fff;
      font-weight: 500;
      position: sticky;
      top: 0;
    }
  }

  &-camp {
    border-radius: 50%;
    color: #fff;
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    margin-right: 2px;
    width: 16px;

    @each $camp, $value in $camp-color {
      &.#{$camp} {
        background-color: $value;
      }
    }
  }

  &-empty {
    color: #666;
    padding: 8px 0;
  }
}
</style>
