<template>
  <div class="home">
    <div class="topbar">
      <div class="page-title">Pokemon list</div>
    </div>
    <div class="body-content">
      <div class="dex-bar">
        <div><strong>My dex</strong></div>
        <div>
          <router-link to="/dex"><strong>10 pokemons</strong></router-link>
        </div>
      </div>
      <div class="pokemon-list-container" v-if="pokemons.length > 0">
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id">
          <div class="pokemon-name">{{ pokemon.name }}</div>
          <div class="show-button">
            <router-link :to="`/pokemon/${pokemon.id}`">show</router-link>
          </div>
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

<style>
.dex-bar {
  padding: 15px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
}
.pokemon {
  padding: 15px 10px;
  background-color: white;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.pokemon:last-child {
  margin-bottom: 0;
}
.pokemon:hover {
  background-color: #f5f5f5;
}
</style>
