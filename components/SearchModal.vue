<template>
  <modal name="search" :height="'auto'" width="600px" adaptive scrollable>
    <div class="Modal">
      <div class="Close Modal-Close" @click="$modal.hide('search')" />
      <SearchBlock />
    </div>
  </modal>
</template>

<script>
import SearchBlock from '@/components/SearchBlock';

export default {
  name: 'SearchModal',
  components: {
    SearchBlock,
  },
};
</script>
