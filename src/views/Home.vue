<template>
  <div class="home">
    <TopBar title="Pokemon list" />
    <div class="body-content">
      <div class="dex-bar">
        <div><strong>My dex</strong></div>
        <div>
          <router-link to="/dex"><strong>{{ countDex }} pokemon{{ countDex > 1 ? 's' : '' }}</strong></router-link>
        </div>
      </div>
      <div class="loading" v-if="loading">Loading...</div>
      <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
      <div class="pokemon-list-container" v-if="pokemons.length > 0">
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id" @click="$router.push(`/pokemon/${pokemon.id}`)">
          <div class="pokemon-name">{{ pokemon.name }}</div>
          <div><span class="arrow-right"></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'

export default {
  name: 'Home',
  components: {
    TopBar
  },
  data() {
    return {
      errorMsg: '',
      loading: false
    }
  },
  computed: {
    pokemons() {
      return this.$store.state.home.pokemons
    },
    countDex() {
      return this.$store.state.dex.pokemons.length
    }
  },
  mounted() {
    this.loading = true
    this.$store.dispatch('home/fetchPokemons')
    .then(() => {
      this.errorMsg = ''
      this.loading = false
    })
    .catch(err => {
      this.errorMsg = err
      this.loading = false
    })
  }
}
</script>

<style>
.dex-bar {
  padding: 15px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
}
.arrow-right {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
</style>
