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
// eslint-disable-next-line no-unused-vars
import { Business } from './model/data/Business';
import { BusinessType } from './model/data/BusinessType';
import { Catalog } from './model/data/Catalog';
// eslint-disable-next-line no-unused-vars
import { Wallet } from './model/data/Wallet';
import { Manager } from './model/data/Manager';
import { LocalStorage } from './model/proxies/LocalStorage';
import { StorageProxy } from './model/proxies/StorageProxy';

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

    this.init();

    // render update
    setInterval(() => {
      this.time = Date.now();
      this.$forceUpdate();
    }, 100);
  }

  init() {
    this.initCatalog();
    this.initWallet();
  }

  initCatalog() {
    const types = this.getTypes();
    this.createCatalog(types);
  }

  getTypes():Array<BusinessType> {
    // business types
    const pedalType = new BusinessType('pedal', 'pedal.png', 'Pedaling', 4, 0.5, 1);
    const bioType = new BusinessType('biomass', 'bioenergy.png', 'Bio Energy', 60, 3, 60);
    const wavesType = new BusinessType('waves', 'waves.png', 'Waves Energy', 720, 6, 540);
    const hydroType = new BusinessType('hydro', 'hydro.png', 'Hydro Energy', 8640, 12, 4320);
    const thermalType = new BusinessType('geothermal', 'geothermal.png', 'Geothermal Energy', 103680, 24, 51840);
    const windType = new BusinessType('wind', 'turbine.png', 'Wind Energy', 1244160, 96, 622080);
    const solarType = new BusinessType('solar', 'solar.png', 'Solar Energy', 14929920, 288, 7464960);

    const types = [];
    types.push(pedalType);
    types.push(bioType);
    types.push(wavesType);
    types.push(hydroType);
    types.push(thermalType);
    types.push(windType);
    types.push(solarType);

    return types;
  }

  createCatalog(types:Array<BusinessType>) {
    // managers (bots)
    const bot1 = new Manager(types[0], 'bot1', '', 1000);
    const bot2 = new Manager(types[1], 'bot2', '', 15000);
    const bot3 = new Manager(types[2], 'bot3', '', 100000);
    const bot4 = new Manager(types[3], 'bot4', '', 500000);
    const bot5 = new Manager(types[4], 'bot5', '', 1200000);
    const bot6 = new Manager(types[5], 'bot6', '', 10000000);
    const bot7 = new Manager(types[6], 'bot7', '', 111111111);

    // create catalog
    this.catalog = new Catalog();

    // add businesses to catalog
    this.catalog.addBusinessType(types[0]);
    this.catalog.addBusinessType(types[1]);
    this.catalog.addBusinessType(types[2]);
    this.catalog.addBusinessType(types[3]);
    this.catalog.addBusinessType(types[4]);
    this.catalog.addBusinessType(types[5]);
    this.catalog.addBusinessType(types[6]);

    // add managers to catalog
    this.catalog.addManager(bot1);
    this.catalog.addManager(bot2);
    this.catalog.addManager(bot3);
    this.catalog.addManager(bot4);
    this.catalog.addManager(bot5);
    this.catalog.addManager(bot6);
    this.catalog.addManager(bot7);
  }

  initWallet() {
    // Init storage
    const storage = new StorageProxy(new LocalStorage());
    const loadedWallet = storage.loadWallet();

    if (loadedWallet) {
      this.wallet = loadedWallet;
    } else {
      // create wallet
      this.wallet = new Wallet();
      // Add starting business
      const types = this.getTypes();
      const pedal = new Business(types[0], this.time);

      this.wallet.addBusiness(pedal);
    }
    this.wallet.addValue(4);

    // auto save loop
    setInterval(() => {
      storage.saveWallet(this.wallet);
      storage.saveTime(this.time);
    }, 1000);
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
