<template>
  <div id="app">
    <h1>Power Adventure</h1>
    <div v-if="show">
      <WalletItem :wallet="wallet" :time="time" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WalletItem from './view/components/Wallet.vue';
import { Business } from './model/data/Business';
import { Wallet } from './model/data/Wallet';
import { BusinessType } from './model/data/BusinessType';

@Component({
  components: {
    WalletItem,
  },
})
export default class App extends Vue {
  private show: boolean = false;
  private wallet!: Wallet;
  private time!: number;

  public mounted() {
    this.time = Date.now();

    this.wallet = new Wallet();
    const pedalType = new BusinessType('pedal', 'pedal.png', 'Pedaling', 4, 0.5, 1);
    const pedal = new Business(pedalType, this.time);

    const bioType = new BusinessType('biomass', 'bioenergy.png', 'Bio Energy', 60, 3, 60);
    const bio = new Business(bioType, this.time);
    this.wallet.addBusiness(pedal);
    this.wallet.addBusiness(bio);

    this.show = true;

    // render update
    setInterval(() => {
      this.time = Date.now();
      this.$forceUpdate();
    }, 100);
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
