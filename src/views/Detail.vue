<template>
  <div class="detail">
    <div class="pokemon" v-if="pokemon">
      <div class="pokemon-picture">
        <img :src="pokemon.picture" :alt="pokemon.name">
      </div>
      <div class="pokemon-name">{{ pokemon.name }}</div>
      <div class="pokemon-types">Types</div>
      <div class="pokemon-moves">Moves</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      pokemon: null
    }
  },
  methods: {
    async fetchPokemon() {
      try {
        let url = `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}/`
        console.log(url)
        let response = await fetch(url)
        let resjson = await response.json()
        this.pokemon = {
          'picture': resjson['sprites']['front_default'],
          'name': resjson['name'],
          'types': resjson['types'],
          'moves': resjson['moves']
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.fetchPokemon()
  }
}
</script>
