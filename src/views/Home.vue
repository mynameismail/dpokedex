<template>
  <div class="home">
    <TopBar title="Pokemon list" />
    <div class="body-content">
      <div class="dex-bar">
        <div><strong>My dex</strong></div>
        <div>
          <router-link to="/dex"><strong>10 pokemons</strong></router-link>
        </div>
      </div>
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
  align-items: center;
  cursor: pointer;
}
.pokemon:last-child {
  margin-bottom: 0;
}
.pokemon:hover {
  background-color: #f5f5f5;
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
