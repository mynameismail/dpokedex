<template>
  <div class="owned">
    <div class="topbar">
      <div class="page-title">My pokemon list</div>
    </div>
    <div class="body-content">  
      <div class="pokemon-list-container" v-if="pokemons.length > 0">
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.name">
          <div class="pokemon-name">{{ pokemon.name }}</div>
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
  name: 'Owned',
  data() {
    return {
      pokemons: []
    }
  },
  methods: {
    async fetchPokemons() {
      console.log('my pokemon list')
    }
  },
  mounted() {
    this.fetchPokemons()
  }
}
</script>
