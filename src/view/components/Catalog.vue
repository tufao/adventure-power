<template>
  <div class="catalog">
    <BusinessItem v-for="(type, index) in catalog.getTypes()" :key="index"
      :count="getCount(type)"
      :item="type"
      :time="time"
      :ready="isReady(type)"
      :buyable="canBuy(type)"
      :hirable="canHire(type)"
      :production="getProduction(type)"
      :progress="getProgress(type)"
      :hireCost="getHireCost(type)"
      @work="start(type)" @buy="buy(type)" @hire="hire(type)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BusinessItem from './Business.vue';
// eslint-disable-next-line no-unused-vars
import { Catalog } from '../../model/data/Catalog';
// eslint-disable-next-line no-unused-vars
import { BusinessType } from '../../model/data/BusinessType';
// eslint-disable-next-line no-unused-vars
import { Wallet } from '../../model/data/Wallet';
import { Business } from '../../model/data/Business';

@Component({
  components: {
    BusinessItem,
  },
})
export default class CatalogList extends Vue {
  @Prop() private catalog!: Catalog;
  @Prop() private wallet!: Wallet;
  @Prop() private time!: number;

  mounted() {
  }

  getCount(type:BusinessType) {
    return this.wallet.getBusinessOf(type).length;
  }

  isReady(type:BusinessType) {
    const businesses = this.wallet.getBusinessOf(type);
    if (businesses.length > 0) {
      return businesses[0].isReady(this.time);
    }
    return false;
  }

  canBuy(type:BusinessType) {
    return type.cost <= this.wallet.balance(Date.now());
  }

  canHire(type:BusinessType) {
    if (this.wallet.hasManager(type)) {
      return false;
    }

    const manager = this.catalog.getManager(type);
    if (manager) {
      return manager.cost <= this.wallet.balance(Date.now());
    }
    return false;
  }

  getProduction(type:BusinessType) {
    const ret = this.wallet.getProductionOf(type, this.time);
    return ret;
  }

  getProgress(type:BusinessType) {
    const business = this.wallet.getBusinessOf(type);
    if (business.length > 0) {
      return business[0].getProgress(this.time);
    }
    return 0;
  }

  getHireCost(type:BusinessType):number {
    const manager = this.catalog.getManager(type);
    if (manager) {
      return manager.cost;
    }
    return -1;
  }

  start(type:BusinessType) {
    this.wallet.workBusinessOf(type, this.time);
  }

  buy(type:BusinessType) {
    if (type.cost > this.wallet.balance(Date.now())) {
      // not enough currency to buy
      return;
    }

    const business = new Business(type, this.time);
    this.wallet.addBusiness(business);
  }

  hire(type:BusinessType) {
    const manager = this.catalog.getManager(type);
    if (!manager) return;

    if (manager.cost > this.wallet.balance(Date.now())) {
      // not enough currency to buy
      return;
    }

    this.wallet.addManager(manager, Date.now());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.catalog {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-content: center;
  height: 750px;
}

</style>
