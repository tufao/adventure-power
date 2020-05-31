<template>
  <div class="business">
    <div>
      <div>{{ count }}x</div>
      <div><img :src="icon" width="50" /></div>
      <div>{{ item.name }}</div>
      <div>{{ item.time }}</div>
      <div>{{ item.capacity * count }} kWh</div>
      <div><button type="button" @click="$emit('work', item)" :class="{disabled: !ready}">GO!</button></div>
    </div>
    <div>
      <div><button type="button" @click="$emit('buy', item)" :class="{disabled: !buyable}">1x Buy {{ item.cost }} kW</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { Business } from '../../model/data/Business';

@Component
export default class BusinessItem extends Vue {
  @Prop() private item!: Business;
  @Prop() private time!: number;
  @Prop() private count!: number;
  @Prop() private ready!: boolean;
  @Prop() private buyable!: boolean;
  @Prop() private production!: number;

  get icon() {
    return require(`@static/${this.item.icon}`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.business {
  display: flex;
  width: 500px;
  flex-direction: column;
  border: 1px solid grey;
  margin: 10px;
  padding: 10px;
}

.business > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
