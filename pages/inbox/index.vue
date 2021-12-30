<template>
  <div>
  <v-list v-for="item in this.goalItems" :key="item.id" flat subheader three-line>
    <Goals :id="item.id" :title="item.title" :link="item.link"></Goals>
  </v-list>
</div>
</template>
<script>
export default {
  data (){
    return{
goalItems: [
  {
    id:"1",
    title: 'Goal1',
    link: "/goals"

}]
}
}
}
  </script>
