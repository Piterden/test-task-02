<template>
  <div id="app">
    <div>
      <img width="25%" src="./assets/logo.png" />
    </div>
    <div class="info">Data length: {{ db && db.length || 0 }}</div>
    <button @click="generateData">Generate data</button>
    <div class="progress">Randomized: {{ progress }} %</div>
    <div class="wrapper">
      <input type="text" v-model="query" />
    </div>
    <button @click="count">Count</button>
    <pre>{{ value }}</pre>
  </div>
</template>

<script>
const BYTES_LENGTH = 1000000000
const LINES_LENGTH = 10000000
const MUL = 25
const ADD = 97

export default {
  name: 'App',

  data: () => ({
    progress: 0,
    value: 0,
    query: '',
    db: null,
    message: '',
    letters: [],
  }),

  methods: {
    async generateData () {
      console.time('generate')
      const buffer = new ArrayBuffer(BYTES_LENGTH)

      this.db = new Uint8Array(buffer)

      for (let i = 0; i < BYTES_LENGTH; i += 1) {
        if (i % LINES_LENGTH === 0) {
          this.progress = Math.round(i / LINES_LENGTH)
          await this.sleep(0)
        }
        this.db.set([Math.round(Math.random() * MUL + ADD)], i)
      }

      this.progress = 100
      console.timeEnd('generate')
    },

    sleep (time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time)
      })
    },

    count () {
      const queryArray = this.query.split('')
      const len = queryArray.length

      for (let i = 0; i < len; i += 1) {
        const startIndex = i * LINES_LENGTH
        const endIndex = startIndex + LINES_LENGTH

        if (!this.letters.length) {
          this.letters[i] = new Uint8Array(this.db.buffer, startIndex, endIndex)
            .map((code, idx) => queryArray[i].charCodeAt() === code ? idx : null)
            .filter(Boolean)
        }

      }

      this.value = this.letters[0].length
    },

    updateQuery (query) {
      this.query = query
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
