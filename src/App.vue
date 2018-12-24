<template>
  <div id="app">
    <div class="container">
      <img src="1f575.png" />
      <h5>Быстрая проверка по номеру накладной</h5>
      <form class="form-inline">
        <masked-input type="text" style="width:60px;" v-model="prefix" mask="+++" placeholder="___" />&nbsp;
        <masked-input type="text" style="width:100px;" v-model="number" mask="11111111" placeholder="________" />&nbsp;
        <button @click.prevent="check()" class="button outline">Проверить</button>
      </form>
    </div>
    <div v-if="loading">
        <div class="loader">Loading...</div>

    </div>
    <div v-if="result.success" v-html="result.success">
    </div>
    <div v-if="result.error">
      {{result.error}}<br /><img src="1f937-2642.png" />
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import MaskedInput from 'vue-masked-input';

export default {
  name: 'app',

  data() {
    return {
      prefix: '',
      number: '',
      result: {},
      loading: false,
    };
  },

  components: {
    MaskedInput,
  },

  methods: {
    check() {
      this.loading = true;
      this.result = {};
      axios.get('https://q8qkcad7ah.execute-api.us-east-1.amazonaws.com/track', {
        params: {
          prefix: this.prefix,
          number: this.number,
        },
      })
        .then(({ data }) => {
          this.result = data.result;
        })
        .catch((error) => {
          this.result.error = 'sdfsdfsdf';
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
body {
  background: #A1FFCE;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #FAFFD1, #A1FFCE);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #FAFFD1, #A1FFCE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5rem;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input[type=text] {
  background: transparent;
  border-color: #000;
}

button.outline {
  color:#000 !important;
  border-color: #000 !important;
}

.container {
  width: 500px;
  margin: 0 auto;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 5em;
  height: 5em;
}
.loader {
  margin: 60px auto;
  margin-bottom: 1rem;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: .5em solid rgba(0, 0, 0, 0.2);
  border-right: .5em solid rgba(0, 0, 0, 0.2);
  border-bottom: .5em solid rgba(0, 0, 0, 0.2);
  border-left: .5em solid #000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


</style>
