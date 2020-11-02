<template>
  <div class="dex">
    <TopBar title="My pokemon list" />
    <div class="body-content">
      <div class="pokemon-list-container" v-if="pokemons.length > 0">
        <div class="total-catched">
          <strong>{{ pokemons.length }} pokemon{{ pokemons.length > 1 ? 's' : '' }}</strong>
        </div>
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id" @click="$router.push(`/pokemon/${pokemon.id}`)">
          <div class="pokemon-name">{{ pokemon.name }}</div>
          <div>
            <button class="button is-small is-danger is-outlined" @click="releasePokemon(pokemon.id)">Release</button>
          </div>
        </div>
      </div>
      <div class="has-text-centered" v-else>No catched pokemon.</div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'

export default {
  name: 'Dex',
  components: {
    TopBar
  },
  computed: {
    pokemons() {
      return this.$store.state.dex.pokemons
    }
  },
  methods: {
    releasePokemon(id) {
      this.$store.dispatch('dex/releasePokemon', id)
      event.stopPropagation()
    }
  },
  mounted() {
    this.$store.dispatch('dex/fetchPokemons')
  }
}
</script>

<style>
.total-catched {
  margin-bottom: 10px;
}
</style>
