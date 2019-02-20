<template>
  <div id="tracker">
      <form class="form-inline">
        <input
          v-model="prefix"
          v-validate="'required|alpha_num|length:3'"
          v-tooltip.top="{
            content: errors.first('prefix'),
            show: errors.has('prefix'),
            trigger: 'manual',
            }"
          :class="{'error': errors.has('prefix') }"
          data-vv-as="Префикс"
          name="prefix"
          type="text"
          style="width:60px;" />
        <input
          v-model="number"
          v-validate="'required|numeric|length:8'"
          v-tooltip.bottom="{
            content: errors.first('number'),
            show: errors.has('number'),
            trigger: 'manual',
            }"
          :class="{'error': errors.has('number') }"
          data-vv-as="Номер"
          name="number"
          type="text"
          style="width:100px;" />
        <button @click.prevent="validateBeforeSubmit()" class="button outline">Проверить</button>
      </form>
    <div v-if="loading">
        <div class="loader">Loading...</div>
    </div>
    <div v-if="result.success" v-html="result.success">
    </div>
    <div v-if="result.error">
      {{result.error}}
    </div>
  </div>
</template>

<script>

import axios from 'axios';

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

  computed: {
    enabled() {
      return !!((this.$route.query.prefix && this.$route.query.number));
    },
  },

  created() {
    if (this.enabled) {
      this.prefix = this.$route.query.prefix;
      this.number = this.$route.query.number;
    }
  },

  mounted() {
    if (this.enabled) this.validateBeforeSubmit();
  },

  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) this.check();
      });
    },

    check() {
      this.$router.replace({ query: { prefix: this.prefix, number: this.number } });
      this.loading = true;
      this.result = {};
      axios.get(process.env.VUE_APP_API_URL, {
        params: {
          prefix: this.prefix,
          number: this.number,
        },
      })
        .then(({ data }) => {
          this.result = data.result;
        })
        .catch((error) => {
          this.result = { result: { error } };
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">

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

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    font-family: Arial;
    font-size: 11px;
    background: #f44148;
    color: white;
    border-radius: 4px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #f44148;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}


</style>
