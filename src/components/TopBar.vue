<template>
  <div class="topbar">
    <div class="page-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: String
  }
}
</script>
