<template>
  <div class="my-ckeditor-container">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {dashboardNotification} from '/src/views/system/systemConfig/data'
export default {
  name: "MyCkeditor",
  props: {},
  components: {},
  data() {
    return {
      editor: ClassicEditor,
      editorData: dashboardNotification,
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "Ckeditor";
</style>
