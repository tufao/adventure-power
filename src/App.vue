<template>
  <div id="app">
    <h1>Power Adventure</h1>
    <h2>{{ wallet.balance(time) }} kWh</h2>
    <div>
      <CatalogList :catalog="catalog" :wallet="wallet" :time="time" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CatalogList from './view/components/Catalog.vue';
import { Business } from './model/data/Business';
import { Catalog } from './model/data/Catalog';
import { Wallet } from './model/data/Wallet';
import { BusinessType } from './model/data/BusinessType';
import { Manager } from './model/data/Manager';

@Component({
  components: {
    CatalogList,
  },
})
export default class App extends Vue {
  private wallet!: Wallet;
  private catalog!: Catalog;
  private time!: number;

  public beforeMount() {
    this.time = Date.now();

    // business types
    const pedalType = new BusinessType('pedal', 'pedal.png', 'Pedaling', 4, 0.5, 1);
    const bioType = new BusinessType('biomass', 'bioenergy.png', 'Bio Energy', 60, 3, 60);
    const wavesType = new BusinessType('waves', 'waves.png', 'Waves Energy', 720, 6, 540);
    const hydroType = new BusinessType('hydro', 'hydro.png', 'Hydro Energy', 8640, 12, 4320);
    const thermalType = new BusinessType('geothermal', 'geothermal.png', 'Geothermal Energy', 103680, 24, 51840);
    const windType = new BusinessType('wind', 'turbine.png', 'Wind Energy', 1244160, 96, 622080);
    const solarType = new BusinessType('solar', 'solar.png', 'Solar Energy', 14929920, 288, 7464960);

    // managers (bots)
    const bot1 = new Manager(pedalType, 'bot1', '', 1000);
    const bot2 = new Manager(bioType, 'bot2', '', 15000);
    const bot3 = new Manager(wavesType, 'bot3', '', 100000);
    const bot4 = new Manager(hydroType, 'bot4', '', 500000);
    const bot5 = new Manager(thermalType, 'bot5', '', 1200000);
    const bot6 = new Manager(windType, 'bot6', '', 10000000);
    const bot7 = new Manager(solarType, 'bot7', '', 111111111);

    // create catalog
    this.catalog = new Catalog();

    // add businesses to catalog
    this.catalog.addBusinessType(pedalType);
    this.catalog.addBusinessType(bioType);
    this.catalog.addBusinessType(wavesType);
    this.catalog.addBusinessType(hydroType);
    this.catalog.addBusinessType(thermalType);
    this.catalog.addBusinessType(windType);
    this.catalog.addBusinessType(solarType);

    // add managers to catalog
    this.catalog.addManager(bot1);
    this.catalog.addManager(bot2);
    this.catalog.addManager(bot3);
    this.catalog.addManager(bot4);
    this.catalog.addManager(bot5);
    this.catalog.addManager(bot6);
    this.catalog.addManager(bot7);

    const pedal = new Business(pedalType, this.time);
    // create wallet
    this.wallet = new Wallet();
    this.wallet.addValue(4);
    this.wallet.addBusiness(pedal);

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
