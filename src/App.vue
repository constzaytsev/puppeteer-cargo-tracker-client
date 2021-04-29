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
        :class="{ error: errors.has('prefix') }"
        data-vv-as="Префикс"
        name="prefix"
        type="text"
        style="width: 60px"
      />
      <input
        v-model="number"
        v-validate="'required|numeric|length:8'"
        v-tooltip.bottom="{
          content: errors.first('number'),
          show: errors.has('number'),
          trigger: 'manual',
        }"
        :class="{ error: errors.has('number') }"
        data-vv-as="Номер"
        name="number"
        type="text"
        style="width: 100px"
      />
      <button @click.prevent="validateBeforeSubmit()" class="button outline">
        Проверить
      </button>
    </form>
    <div v-if="loading">
      <div class="loader">Loading...</div>
    </div>
    <div v-if="result.success" v-html="result.success"></div>
    <div v-if="result.error">
      {{ result.error }}
    </div>
  </div>
</template>

<script>

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
      return !!(this.$route.query.prefix && this.$route.query.number);
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

      fetch(`${process.env.VUE_APP_API_URL}/track?prefix=${this.prefix}&number=${this.number}`)
        .then((response) => response.json())
        .then((data) => {
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
