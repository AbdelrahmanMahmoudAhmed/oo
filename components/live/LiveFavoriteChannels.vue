<template>
  <RecycleScroller
  
    class="scroller"
    :items="savedFavoriteLiveChannels"
    :item-size="65"
    key-field="id"
    ref="list"
  >
    <template v-slot="{ item, index }">
      <LiveChannelItem
        :item="item"
        :index="index"
        :activeElement="activeElement"
        @keydown-event="$emit('keydown-event')"
      />
    </template>
  </RecycleScroller>
</template>

<script>
export default {
  props: ["activeElement"],
};
</script>

<style>
</style>