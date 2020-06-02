<template>
  <div class="business" :class="item.id">
    <div>
      <div>{{ count }}x</div>
      <div><img :src="icon" width="50" /></div>
      <div>{{ item.name }}</div>
      <div>{{ item.capacity * count }} kW</div>
      <div v-if="count > 0">
        <button type="button" @click="$emit('work', item)" :class="[!ready ? 'disabled' : '', item.id]">GO!</button>
      </div>
      <div v-else>
        <button type="button" @click="$emit('buy', item)" :class="{disabled: !buyable}">1x Buy<br />({{ item.cost }} kW)</button>
      </div>
    </div>
    <div class="meter" v-if="count > 0">
      <span :style="{width: progress * 100 + '%'}"></span>
    </div>
    <div v-if="count > 0">
      <div><button type="button" @click="$emit('buy', item)" :class="{disabled: !buyable}">1x Buy ({{ item.cost }} kW)</button></div>
      <div v-if="count > 0"><button type="button" @click="$emit('hire', item)" :class="{disabled: !hirable}">Automate ({{ hireCost }} kW)</button></div>
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
  @Prop() private hirable!: boolean;
  @Prop() private production!: number;
  @Prop() private progress!: number;
  @Prop() private hireCost!: number;

  get icon() {
    return require(`@static/images/${this.item.icon}`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.business.pedal {
  --theme-color: #f6af33;
  --theme-color-rgba: rgba(96, 68, 20, .8)
}
.business.biomass {
  --theme-color: #0cb797;
  --theme-color-rgba: rgba(4, 71, 39, .8)
}
.business.waves {
  --theme-color: #946bad;
  --theme-color-rgba: rgba(58, 42, 67, .8)
}
.business.hydro {
  --theme-color: #fe5c8e;
  --theme-color-rgba: rgba(99, 36, 55, .8)
}
.business.geothermal {
  --theme-color: #b4dd97;
  --theme-color-rgba: rgba(70, 86, 59, .8)
}
.business.wind {
  --theme-color: #8aaad9;
  --theme-color-rgba: rgba(54, 66, 85, .8)
}
.business.solar {
  --theme-color: #f8554c;
  --theme-color-rgba: rgba(97, 33, 29, .8)
}

.business {
  --theme-color: grey;
  display: flex;
  width: 500px;
  flex-direction: column;
  border: 5px solid var(--theme-color);
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
  font-size: 18px;
  font-weight: 800;
  background-color: white;
  color: #0f0f2b;
}

.business > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin: 4px 2px;
  cursor: pointer;
  background: var(--theme-color);
  border-color: var(--theme-color);
  border-radius: 10px;;
}

button.disabled {
  background: var(--theme-color-rgba);
}

.meter {
	height: 20px;  /* Can be anything */
	position: relative;
	background: #555;
	-moz-border-radius: 25px;
	-webkit-border-radius: 25px;
	border-radius: 25px;
	padding: 4px;
	box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
}

.meter > span {
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: var(--theme-color);
  background-image: linear-gradient(
    center bottom,
    rgb(43,194,83) 37%,
    rgb(84,240,84) 69%
  );
  box-shadow:
    inset 0 2px 9px  rgba(255,255,255,0.3),
    inset 0 -2px 6px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
}

</style>
