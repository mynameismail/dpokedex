<template>
  <div class="home">
    <div class="topbar">
      <div class="page-title">Pokemon list</div>
    </div>
    <div class="owned">
      <router-link to="/mine">My pokemon list</router-link>
    </div>
    <div class="pokemon-list" v-if="pokemons.length > 0">
      <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.name">
        <div class="pokemon-name">{{ pokemon.name }}</div>
        <div class="detail">
          <router-link :to="`/pokemon/${pokemon.id}`">detail</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      pokemons: [],
      nexturl: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
      prevurl: ''
    }
  },
  methods: {
    async fetchPokemons() {
      try {
        let response = await fetch(this.nexturl)
        let resjson = await response.json()
        this.nexturl = resjson['next']
        this.prevurl = resjson['previous']
        let results = resjson['results']
        results.forEach(pokemon => {
          // remove last slash from pokemon url
          let pokemonUrl = pokemon['url'].slice(0, -1)
          // get pokemon id
          let pokemonId = pokemonUrl.split('/').pop()

          this.pokemons.push({
            'id': pokemonId,
            'name': pokemon['name']
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.fetchPokemons()
  }
}
</script>
