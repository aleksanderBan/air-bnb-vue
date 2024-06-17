const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

    css: {
      // requireModuleExtension: false,
      loaderOptions:{
        sass:{
          additionalData: `@import "@/assets/scss/style.scss";`,
        }
      }
  }
})
