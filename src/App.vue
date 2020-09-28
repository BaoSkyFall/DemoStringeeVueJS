<template>
  <div id="app">

    <StringeeDemo />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import StringeeDemo from "./components/StringeeDemo";

export default {
  name: "App",
  components: {
    HelloWorld,
    StringeeDemo,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px;s */
}
</style>
