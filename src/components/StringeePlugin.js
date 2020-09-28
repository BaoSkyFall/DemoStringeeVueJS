

const StringeePlugin = {
  install(Vue, options) {
      Vue.mixin({
      
      mounted() {
        console.log('In stringeePlugin Mounted!');
        console.log("stringee",window);
      }
    });
  }
};

export default StringeePlugin;