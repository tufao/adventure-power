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
  private storage!:StorageProxy;

  public beforeMount() {
    this.time = Date.now();

    // Init storage
    this.storage = new StorageProxy(new LocalStorage());

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
    const typesCfg = require(`@static/config/business-types.json`);

    // business types
    const types = [];
    for (const item of typesCfg.list) {
      const type = new BusinessType(item.id, item.icon, item.name, item.cost, item.time, item.capacity);
      types.push(type);
    }

    return types;
  }

  createCatalog(types:Array<BusinessType>) {
    // create catalog
    this.catalog = new Catalog();

    // managers (bots)
    const managersCfg = require(`@static/config/managers.json`);
    let count = 0;
    for (const item of managersCfg.list) {
      const manager = new Manager(types[count], item.name, item.description, item.cost);
      this.catalog.addBusinessType(types[count]);
      this.catalog.addManager(manager);
      count++;
    }
  }

  initWallet() {
    const loadedWallet = this.storage.loadWallet();

    if (loadedWallet) {
      this.wallet = loadedWallet;

      this.showProgress();
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
      this.storage.saveWallet(this.wallet);
      this.storage.saveTime(this.time);
    }, 1000);
  }

  showProgress() {
    const lastTime = this.storage.loadTime();
    const lastBalance = this.wallet.balance(lastTime);
    const currentBalance = this.wallet.balance(Date.now());
    const gain = currentBalance - lastBalance;
    alert(`Since last time you made ${gain}kWh!`);
  }
}
</script>

<style>
body {
  background-color: white;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
