<template>
  <div class="wallet">
    <BusinessItem v-for="(item, index) in wallet.getBusiness()" :key="index" :item="item"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BusinessItem from './Business.vue';
// eslint-disable-next-line no-unused-vars
import { Wallet } from '../../model/data/Wallet';

@Component({
  components: {
    BusinessItem,
  },
})
export default class WalletItem extends Vue {
  @Prop() private wallet!: Wallet;

  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
