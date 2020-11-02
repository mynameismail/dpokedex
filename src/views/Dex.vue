<template>
  <div class="dex">
    <div class="topbar">
      <div class="page-title">My pokemon list</div>
    </div>
    <div class="body-content">
      <div class="pokemon-list-container" v-if="pokemons.length > 0">
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id" @click="$router.push(`/pokemon/${pokemon.id}`)">
          <div class="pokemon-name">{{ pokemon.name }}</div>
          <div>
            <button class="button is-small is-danger is-outlined" @click="releasePokemon(pokemon.id)">Release</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dex',
  data() {
    return {
      pokemons: []
    }
  },
  methods: {
    async fetchPokemons() {
      this.pokemons = JSON.parse(localStorage.getItem('pokedex')) || []
    },
    releasePokemon(id) {
      let idx = this.pokemons.findIndex(poke => poke.id == id)
      if (idx >= 0) {
        this.pokemons.splice(idx, 1)
        let strdex = JSON.stringify(this.pokemons)
        localStorage.setItem('pokedex', strdex)
      }
      event.stopPropagation()
    }
  },
  mounted() {
    this.fetchPokemons()
  }
}
</script>
