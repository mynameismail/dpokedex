<template>
  <div class="topbar">
    <div @click="goBack" v-if="backbtn"><span class="back-button"></span></div>
    <div class="page-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: String,
    backbtn: Boolean
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.topbar {
  padding: 15px 10px;
  background-color: darkred;
  display: flex;
  align-items: center;
}
.back-button {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  cursor: pointer;
}
.page-title {
  font-weight: 700;
  color: white;
  margin-left: 10px;
}
</style>
