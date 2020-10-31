<template>
  <div class="detail">
    <div class="topbar">
      <div class="page-title">Detail</div>
    </div>
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
        <div class="pokemon-moves">
          <span>Moves:</span>
          <div class="tags">
            <span class="tag" v-for="(move, idx) in pokemon.moves" :key="`move-${idx}`">{{ move.move.name }}</span>
          </div>
        </div>
      </div>
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

<style>
.pokemon-detail-container {
  padding: 20px;
  background-color: white;
}
.top-detail {
  display: flex;
}
</style>
