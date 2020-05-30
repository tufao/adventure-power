<template>
  <div class="business">
    <div>{{ item.name }}</div>
    <div>{{ item.icon }}</div>
    <div>{{ item.capacity }}</div>
    <div>{{ item.time / 1000 }}</div>
    <div>{{ production }}</div>
    <div><button type="button" @click="start" :style="{disabled:!item.ready}">GO!</button></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { Business } from '../../model/data/Business';

@Component
export default class BusinessItem extends Vue {
  @Prop() private item!: Business;

  private production: number = 0;

  mounted() {
    this.production = this.item.getProduction(Date.now());
  }

  start() {
    if (!this.item.isReady(Date.now())) {
      return;
    }

    this.item.work(Date.now());

    setTimeout(() => {
      this.production = this.item.getProduction(Date.now());
    }, this.item.time);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.business {
  display: flex;
  width: 500px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  padding: 10px;
}

button {
  border: blue;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  background: green;
}

button.disabled {
  background: grey;
}
</style>
