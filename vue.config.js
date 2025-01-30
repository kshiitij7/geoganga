const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },

  devServer: {
    host: '0.0.0.0',  // Allow external access to the app
    port: 8081,        // Ensure the app runs on port 8081
    disableHostCheck: true, // Disable host check for localhost/hostname access
    public: 'geoganga.iirs.gov.in:8081',  // Access app via hostname
  }
})
