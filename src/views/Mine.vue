<template>
  <div class="mine">
    <div class="topbar">
      <div class="page-title">My pokemon list</div>
    </div>
    <div class="pokemon-list" v-if="pokemons.length > 0">
      <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.name">
        <div class="pokemon-name">{{ pokemon.name }}</div>
        <div class="detail">
          <router-link :to="`/pokemon/${pokemon.id}/detail`">detail</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
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
