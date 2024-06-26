<script>
import { ItemService } from '@/services/ItemService'
import { defineComponent } from 'vue'
import router from '../router/index'

const itemService = new ItemService()
export default defineComponent({
  name: 'ItemCard',
  props: ['description', 'id', 'title', 'images'],
  emits: ['getAllItems'],
  data() {
    return {
      count: 0,
      defaultImage:
        'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4='
    }
  },
  methods: {
    async deleteItem() {
      const { data } = await itemService.deleteItem(this.id)
      console.log(data)
      this.$emit('getAllItems')
    },
    navigate(id) {
      router.replace({ path: `/item/${id}` })
    }
  }
})
</script>

<template>
  <div class="card">
    <v-btn @click="deleteItem()">Delete</v-btn>
    <v-carousel v-if="images && images.length">
      <v-carousel-item
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        cover
      ></v-carousel-item>
    </v-carousel>
    <img
      v-else
      class="card-img-top"
      :src="images?.length && images[0] ? images[0] : this.defaultImage"
      alt="Card image cap"
    />
    <div class="card-body" @click="navigate(id)">
      <p class="title">{{ title }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-height: max-content;
  overflow-y: hidden;
  .card-img-top {
    height: 238px;
    background-size: contain;
  }
  .card-body {
    .title {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

:deep(.v-carousel) {
  height: 238px !important;
}
</style>
