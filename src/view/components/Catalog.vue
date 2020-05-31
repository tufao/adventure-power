<template>
  <div class="catalog">
    <BusinessItem v-for="(type, index) in catalog.getTypes()" :key="index"
      :item="type" :time="time" :ready="isReady(type)" :production="getProduction(type)"
      v-on:work="start(type)" v-on:buy="buy(type)" />
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

  isReady(type:BusinessType) {
    const businesses = this.wallet.getBusinessOf(type);
    if (businesses.length > 0) {
      return businesses[0].isReady(this.time);
    }
    return false;
  }

  getProduction(type:BusinessType) {
    const ret = this.wallet.getProductionOf(type, this.time);
    return ret;
  }

  start(type:BusinessType) {
    this.wallet.workBusinessOf(type, this.time);
  }

  buy(type:BusinessType) {
    const business = new Business(type, this.time);
    this.wallet.addBusiness(business);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
