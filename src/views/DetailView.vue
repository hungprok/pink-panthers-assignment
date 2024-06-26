<script>
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jnvimtcxfazgaqnnagwt.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudmltdGN4ZmF6Z2Fxbm5hZ3d0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTA0OTgyOSwiZXhwIjoyMDM0NjI1ODI5fQ.Fy0r8ZMiIMzXVAvOs3IbxYuSwHlBjlp8bZFyoLaIe5w'
const supabase = createClient(supabaseUrl, supabaseKey)
import { ItemService } from '@/services/ItemService'
const itemService = new ItemService()
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
      const valid = this.validate()
      const bucketName = 'pink-panthers-assignment'
      let images = []
      if (this.item.images && this.item.images.length) {
        images = await Promise.all(
          this.item.images.map(async (file) => {
            const filePath = `${Date.now()}_${file.name}`
            const { data: uploadRes } = await supabase.storage
              .from(bucketName)
              .upload(filePath, file)
            const { path } = uploadRes
            const { data } = await supabase.storage.from(bucketName).getPublicUrl(path)
            return data.publicUrl
          })
        )
        console.log(images)
      }
      if (valid) {
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
      this.dialog = false
      this.resetValidation()
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
    }
  },
  async mounted() {
    const { id } = this.$route.params
    this.getItemById(id)
  }
}
</script>

<template>
  <div class="d-flex">
    <h1>Detail of item {{ this.originalItem.title }}</h1>
    <v-btn @click="dialog = true">Edit</v-btn>
  </div>
  <v-row>
    <v-col cols="6">
      <v-carousel v-if="this.originalItem.images && this.originalItem.images.length">
        <v-carousel-item
          v-for="(image, index) in item.images"
          :key="index"
          :src="image"
          cover
        ></v-carousel-item>
      </v-carousel>
      <p v-html="this.originalItem.description"></p></v-col
  ></v-row>

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
