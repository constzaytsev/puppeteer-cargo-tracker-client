module.exports = {
  productionSourceMap: false,
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
};
