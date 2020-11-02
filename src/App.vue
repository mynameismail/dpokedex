<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('dex/fetchPokemons')
  }
}
</script>
