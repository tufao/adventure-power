<template>
  <div id="app">
    <h1>Power Adventure</h1>
    <div v-if="show">
      <BusinessItem :item="business"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BusinessItem from './view/components/Business.vue';
import { Business } from './model/data/Business';

@Component({
  components: {
    BusinessItem,
  },
})
export default class App extends Vue {
  private show: boolean = false;
  private business!: Business;

  public mounted() {
    this.business = new Business('pedal', 'pedal.png', 'Pedaling', 4, 0.5, 1, Date.now());
    this.show = true;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
