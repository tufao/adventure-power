<template>
  <div class="wallet">
    <BusinessItem v-for="(item, index) in wallet.getBusiness()" :key="index" :item="item" :time="time" v-on:buy="buyBusines" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BusinessItem from './Business.vue';
// eslint-disable-next-line no-unused-vars
import { Wallet } from '../../model/data/Wallet';
import { Business } from '../../model/data/Business';

@Component({
  components: {
    BusinessItem,
  },
})
export default class WalletItem extends Vue {
  @Prop() private wallet!: Wallet;
  @Prop() private time!: number;

  mounted() {
  }

  buyBusines(business: Business) {
    const newBusiness = new Business(business.type, business.icon, business.name, business.cost, business.time, business.capacity, this.time);
    this.wallet.addBusiness(newBusiness);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
