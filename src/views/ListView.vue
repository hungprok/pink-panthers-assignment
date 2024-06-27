<script>
import ItemCard from '@/components/ItemCard.vue'
import { ItemService } from '@/services/ItemService'
const itemService = new ItemService()
import { FileService } from '@/services/FileService'
const fileService = new FileService()

export default {
  props: ['description', 'id', 'title', 'images'],
  components: {
    ItemCard
  },
  data() {
    return {
      count: 0,
      items: [],
      dialog: false,
      valid: false,
      newItem: {
        title: '',
        description: '',
        images: []
      },
      nameRules: [
        (value) => {
          if (value) return true
          return 'Name is required.'
        }
      ],
      descriptionRules: [
        (value) => {
          if (value) return true
          return 'Description is required.'
        }
      ]
    }
  },
  methods: {
    async getAllItems() {
      const { data } = await itemService.getAllItems()
      console.log(data)
      this.items = data
      this.items.forEach((item) => {
        item.images = item.images ? JSON.parse(item.images) : []
      })
    },
    async submit() {
      const valid = await this.validate()
      if (valid) {
        let images = []
        if (this.newItem.images && this.newItem.images.length) {
          const payload = this.constructFormData(this.newItem.images)
          const { data } = await fileService.upload(payload)
          console.log(data)
          images = data.files.map((image) => image.publicUrl)
        }
        const { data } = await itemService.addItem({
          ...this.newItem,
          images: JSON.stringify(images)
        })
        this.getAllItems()
      }
    },
    cancel() {
      this.$refs.form.resetValidation()
      this.dialog = false
    },
    async validate() {
      const { valid } = await this.$refs.form.validate()
      this.dialog = !valid
      return valid
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    constructFormData(files) {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        formData.append('files', files[i])
      }
      return formData
    }
  },
  mounted() {
    this.getAllItems()
  }
}
</script>

<template>
  <v-row>
    <v-col cols="10">
      <h1 class="pr-3">List of items</h1>
    </v-col>
    <v-col cols="2" class="text-right">
      <v-btn @click="dialog = true">Add new</v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="3" v-for="{ id, title, description, images } in this.items" :key="id" class="p-2">
      <ItemCard
        :description="description"
        :title="title"
        :images="images"
        :id="id"
        @getAllItems="getAllItems"
      ></ItemCard>
    </v-col>
  </v-row>

  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card title="Add new item">
        <v-form fast-fail v-model="valid" @submit.prevent ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="this.newItem.title"
                  :rules="nameRules"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="this.newItem.description"
                  :rules="descriptionRules"
                  label="Description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  label="Images"
                  multiple
                  accept="image/*"
                  v-model="this.newItem.images"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel()"> Cancel </v-btn>
          <v-btn @click="submit()" type="submit"> Submit </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
