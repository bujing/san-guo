import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home', () => {
  it('Home', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).to.include('首页')
  })
})
