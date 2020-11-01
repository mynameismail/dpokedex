<template>
  <div class="dex">
    <div class="topbar">
      <div class="page-title">My pokemon list</div>
    </div>
    <div class="body-content">  
      <div class="pokemon-list-container" v-if="pokemons.length > 0">
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id">
          <div class="pokemon-name">{{ pokemon.nickname }}</div>
          <div class="detail">
            <router-link :to="`/pokemon/${pokemon.id}`">detail</router-link>
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
    }
  },
  mounted() {
    this.fetchPokemons()
  }
}
</script>
