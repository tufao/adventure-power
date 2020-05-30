<template>
  <div id="app">
    <h1>Power Adventure</h1>
    <div v-if="show">
      <WalletItem :wallet="wallet"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WalletItem from './view/components/Wallet.vue';
import { Business } from './model/data/Business';
import { Wallet } from './model/data/Wallet';

@Component({
  components: {
    WalletItem,
  },
})
export default class App extends Vue {
  private show: boolean = false;
  private wallet!: Wallet;

  public mounted() {
    this.wallet = new Wallet();
    const pedal = new Business('pedal', 'pedal.png', 'Pedaling', 4, 0.5, 1, Date.now());
    const bio = new Business('biomass', 'bioenergy.png', 'Bio Energy', 60, 3, 60, Date.now());
    this.wallet.addBusiness(pedal);
    this.wallet.addBusiness(bio);

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
