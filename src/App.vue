<template>
  <div id="app">
    <Welcome v-if="state === 'new' || state === 'progress'" :profit="profit" @close="closeWelcome" />
    <div v-if="state === 'play'">
      <h2>{{ format(wallet.balance(time)) }} kW</h2>
      <CatalogList :catalog="catalog" :wallet="wallet" :time="time" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CatalogList from './view/components/Catalog.vue';
import Welcome from './view/components/Welcome.vue';
// eslint-disable-next-line no-unused-vars
import { Business } from './model/data/Business';
import { BusinessType } from './model/data/BusinessType';
import { Catalog } from './model/data/Catalog';
// eslint-disable-next-line no-unused-vars
import { Wallet } from './model/data/Wallet';
import { Manager } from './model/data/Manager';
import { LocalStorage } from './model/proxies/LocalStorage';
import { StorageProxy } from './model/proxies/StorageProxy';
import { ServerProxy } from './model/proxies/ServerProxy';

@Component({
  components: {
    CatalogList,
    Welcome,
  },
})
export default class App extends Vue {
  private wallet!: Wallet;
  private catalog!: Catalog;
  private time!: number;
  private storage!:StorageProxy;
  private state!: string;
  private profit!: number;
  private nickName!: string;

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

    // auto save loop
    setInterval(() => {
      this.save();
    }, 30000);

    // exit
    window.addEventListener("beforeunload", (e) => {
      this.onClose();
      (e || window.event).returnValue = true;
      return true;
    });
  }

  init() {
    this.state = 'init';
    this.profit = 0;

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
      this.state = 'progress';

      this.wallet = loadedWallet;

      this.showProgress();
    } else {
      this.state = 'new';

      // create wallet
      this.wallet = new Wallet();
      // Add starting business
      const types = this.getTypes();
      const pedal = new Business(types[0], this.time);

      this.wallet.addBusiness(pedal);
    }
    this.wallet.addValue(4);
  }

  showProgress() {
    const lastTime = this.storage.loadTime();
    const lastBalance = this.wallet.balance(lastTime);
    const currentBalance = this.wallet.balance(Date.now());
    this.profit = currentBalance - lastBalance;
  }

  closeWelcome(nick:string) {
    if (nick) {
      this.nickName = nick;
    }
    this.state = 'play';
  }

  format(x:number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  save() {
    this.storage.saveWallet(this.wallet);
    this.storage.saveTime(this.time);
    ServerProxy.save(this.nickName, this.wallet);
  }

  onClose() {
    this.save()
  }
}
</script>

<style>
body {
  background-color: white;
  background-image: url('../public/img/background.jpg');
  background-repeat: no-repeat;
  background-position: top center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
