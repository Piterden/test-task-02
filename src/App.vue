<template>
  <div id="app">
    <div>
      <img width="25%" src="./assets/logo.png">
    </div>
    <div class="info">Data length: {{ db && db.length || 0 }}</div>
    <button @click="generateData">Generate data</button>
    <div class="progress">Randomized: {{ progress }} %</div>
    <div class="wrapper">
      <input type="text" v-model="query">
    </div>
    <button @click="count">Count</button>
    <pre>{{ value }}</pre>
  </div>
</template>

<script>
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

  computed: {
  },

  mounted() {
  },

  methods: {
    async generateData () {
      console.time('generate')
      const buffer = new ArrayBuffer(10 ** 9)

      this.db = new Uint8Array(buffer)

      for (let i = 0; i < 1000000000; i += 1) {
        if (i % 10000000 === 0) {
          this.progress = Math.round(i / 10000000)
          await this.sleep(0)
        }
        this.db.set([Math.round(Math.random() * 25 + 97)], i)
      }

      this.progress = 100
      console.timeEnd('generate')
    },

    sleep (time) {
      return new Promise((resolve) => {
        setTimeout(() => { resolve() }, time)
      })
    },

    count () {
      const queryArray = this.query.split('')
      const len = queryArray.length

      for (let i = 0; i < len; i += 1) {
        const startIndex = i * 10000000
        const endIndex = startIndex + 10000000

        this.letters[i] = new Uint8Array(this.db.buffer, startIndex, endIndex)
          .map((code, idx) => queryArray[i].charCodeAt() === code ? idx : null)
          .filter(Boolean)
      }

      this.value = this.letters[0].length
    },

    getString(length) {
      return Array.from({ length }, () => this.getRandomLetter()).join('');
    },

    updateQuery(query) {
      this.query = query;
    },

    getValue(prefix) {
      return this.db.countPrefix(prefix)
    }
  }
};
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
