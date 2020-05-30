<template>
  <div class="wallet">
    <BusinessItem v-for="(item, index) in catalog.getTypes()" :key="index" :item="item" :time="time" v-on:buy="buyBusines" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BusinessItem from './Business.vue';
// eslint-disable-next-line no-unused-vars
import { Catalog } from '../../model/data/Catalog';

@Component({
  components: {
    BusinessItem,
  },
})
export default class CatalogList extends Vue {
  @Prop() private catalog!: Catalog;
  @Prop() private time!: number;

  mounted() {
  }

  buyBusines() {
    // const newBusiness = new Business(business.type, this.time);
    // this.wallet.addBusiness(newBusiness);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
