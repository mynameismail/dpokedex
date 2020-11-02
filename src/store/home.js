var baseApi = 'https://pokeapi.co/api/v2/pokemon'

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
    fetchPokemons(context) {
      return new Promise(async (resolve, reject) => {
        if (context.state.pokemons.length == 0) {
          try {
            let response = await fetch(`${baseApi}?limit=100&offset=0`)
            let resjson = await response.json()
            let results = resjson['results']
            let pokemons = []
            results.forEach(pokemon => {
              // remove last slash from pokemon url
              let pokemonUrl = pokemon['url'].slice(0, -1)
              // get pokemon id
              let pokemonId = pokemonUrl.split('/').pop()
    
              pokemons.push({
                'id': pokemonId,
                'name': pokemon['name']
              })
            })
            context.commit('updatePokemons', pokemons)
          } catch (err) {
            reject('Something error.')
          }
        }
  
        resolve(null)
      })
    }
  }
}
