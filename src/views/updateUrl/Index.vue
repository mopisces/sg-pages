<template>
  <div>
    <van-button type="primary" @click="updateBaseUrl">更新 Base URL</van-button>
    <p>当前 Base URL: {{ currentBaseUrl }}</p>
    <van-button type="info" @click="testGet">测试 GET 请求</van-button>
  </div>
</template>

<script>
import { get, updateDomain } from '@/request/request.js'

export default {
  name: 'UpdateBaseUrl',
  data() {
    return {
      http: null,
      currentBaseUrl: ''
    }
  },
  async created() {
    this.http = await get() // 调用 get 方法会初始化 http 实例
    console.log(this.http)
    this.currentBaseUrl = this.http.defaults.baseURL
  },
  methods: {
    async updateBaseUrl() {
      await updateBaseUrl()
      this.currentBaseUrl = this.http.defaults.baseURL
    },
    async testGet() {
      try {
        const response = await fetchData({ id: 1 })
        console.log('GET 请求结果:', response.data)
      } catch (error) {
        console.error('GET 请求失败:', error)
      }
    }
  }
}
</script>

<style>
.van-button {
  margin: 10px;
}
</style>