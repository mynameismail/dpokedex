<template>
  <div class="detail">
    <TopBar title="Detail" />
    <div class="body-content">
      <div class="pokemon-detail-container" v-if="pokemon">
        <div class="top-detail">
          <div class="pokemon-picture">
            <img :src="pokemon.picture" :alt="pokemon.name">
          </div>
          <div class="pokemon-attribute">
            <div class="pokemon-name">
              <strong>{{ pokemon.name }}</strong>
            </div>
            <div class="pokemon-types">
              <span>Types:</span>
              <div class="tags">
                <span class="tag" v-for="(type, idx) in pokemon.types" :key="`type-${idx}`">{{ type.type.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <button class="button is-small is-fullwidth" :class="isCatched ? '' : 'is-link'" @click="catchPokemon" :disabled="isCatched">{{ isCatched ? 'Already catched' : 'Catch' }}</button>
        </div>
        <div class="toast" :class="toastType">{{ toast }}</div>
        <div class="pokemon-moves">
          <span>Moves:</span>
          <div class="tags">
            <span class="tag" v-for="(move, idx) in pokemon.moves" :key="`move-${idx}`">{{ move.move.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="modalState ? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <form @submit="savePokemon">
            <div class="field">
              <label class="label">Nickname</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nickname" v-model="nickname">
              </div>
              <p class="help">If blank, it will be the pokemon realname.</p>
            </div>
            <button type="submit" class="button is-link is-fullwidth">Save</button>
          </form>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="modalState = false"></button>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'

export default {
  name: 'Detail',
  components: {
    TopBar
  },
  data() {
    return {
      pokemonId: this.$route.params.id,
      pokemon: null,
      modalState: false,
      nickname: '',
      helptext: '',
      toast: '',
      toastType: 'success',
      isCatched: false
    }
  },
  methods: {
    async fetchPokemon() {
      try {
        let url = `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`
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
    },
    catchPokemon() {
      // set success probability 50%
      let success = Math.round(Math.random())
      if (success == 1) {
        this.modalState = true
      } else {
        this.toast = `Sorry! You're out of luck. Try again.`
        this.toastType = 'error'
      }
    },
    savePokemon() {
      event.preventDefault()
      let name = this.pokemon.name
      if (this.nickname) {
        name = this.nickname
      }
      let newPokemon = {
        'id': this.pokemonId,
        'name': name
      }

      let dex = JSON.parse(localStorage.getItem('pokedex')) || []
      dex.push(newPokemon)
      let strdex = JSON.stringify(dex)
      localStorage.setItem('pokedex', strdex)
      
      this.modalState = false
      this.toast = `Pokemon is catched.`
      this.toastType = 'success'

      this.updateCatchState()
    },
    updateCatchState() {
      let dex = JSON.parse(localStorage.getItem('pokedex')) || []
      let idx = dex.findIndex(d => d.id == this.pokemonId)
      this.isCatched = idx >= 0
    }
  },
  mounted() {
    this.fetchPokemon()
    this.updateCatchState()
  }
}
</script>

<style>
.toast {
  margin: 5px 0;
}
.toast.success {
  color: green;
}
.toast.error {
  color: red;
}
.pokemon-detail-container {
  padding: 20px;
  background-color: white;
}
.top-detail {
  display: flex;
  margin-bottom: 10px;
}
.actions {
  margin-bottom: 10px;
}
</style>
