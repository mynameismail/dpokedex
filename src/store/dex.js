export default {
  namespaced: true,
  state: {
    pokemons: []
  },
  mutations: {
    updatePokemons(state, payload) {
      state.pokemons = payload
    }
  },
  actions: {
    async fetchPokemons(context) {
      let pokemons = JSON.parse(localStorage.getItem('pokedex')) || []
      context.commit('updatePokemons', pokemons)
    },
    async releasePokemon(context, id) {
      let pokemons = JSON.parse(localStorage.getItem('pokedex')) || []
      let idx = pokemons.findIndex(poke => poke.id == id)
      if (idx >= 0) {
        pokemons.splice(idx, 1)
        let strdex = JSON.stringify(pokemons)
        localStorage.setItem('pokedex', strdex)
        context.commit('updatePokemons', pokemons)
      }
    },
    async catchPokemon(context, payload) {
      let pokemons = JSON.parse(localStorage.getItem('pokedex')) || []
      pokemons.push(payload)
      let strdex = JSON.stringify(pokemons)
      localStorage.setItem('pokedex', strdex)
      context.commit('updatePokemons', pokemons)
    }
  }
}
