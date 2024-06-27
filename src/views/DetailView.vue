<script>
import { ItemService } from '@/services/ItemService'
const itemService = new ItemService()
import { FileService } from '@/services/FileService'
const fileService = new FileService()
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      item: {
        id: '',
        title: '',
        description: '',
        images: []
      },
      originalItem: {},
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
    async submit() {
      const valid = await this.validate()
      if (valid) {
        let images = []
        if (this.item.images && this.item.images.length) {
          const payload = this.constructFormData(this.item.images)
          const { data } = await fileService.upload(payload)
          console.log(data)
          images = data.files.map((image) => image.publicUrl)
          console.log(images)
        }
        const { data } = await itemService.updateItem({
          ...this.item,
          images: JSON.stringify(images.length ? images : [])
        })
        const { id } = this.$route.params
        this.getItemById(id)
        console.log(data)
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

    async getItemById(id) {
      const { data } = await itemService.getItemById(id)
      this.item = { ...data[0] }
      this.item.images = this.item.images ? JSON.parse(this.item.images) : []
      console.log(data)
      this.originalItem = { ...this.item }
    },
    constructFormData(files) {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
      return formData
    }
  },
  async mounted() {
    const { id } = this.$route.params
    this.getItemById(id)
  }
}
</script>

<template>
  <v-row class="d-flex">
    <v-col cols="10">
      <h1>Detail of item {{ this.originalItem.title }}</h1>
    </v-col>
    <v-col cols="2" class="text-right"><v-btn @click="dialog = true">Edit</v-btn></v-col>
  </v-row>
  <p v-html="this.originalItem.description"></p>

  <v-row v-if="this.originalItem.images && this.originalItem.images.length">
    <v-col cols="6" v-for="(image, index) in item.images" :key="index" :src="image" cover>
      <img :src="image" />
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
                  v-model="this.item.title"
                  :rules="nameRules"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="this.item.description"
                  :rules="descriptionRules"
                  label="Description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="this.item.images"
                  label="Images"
                  multiple
                  accept="image/*"
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
