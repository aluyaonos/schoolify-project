<template>
  <section id="saved">
    <div class="text-center">
      <row>
        <column md="12">
          <modal frame removeBackdrop position="top" v-if="showFrameModalTop" @close="showFrameModalTop = false">
            <modal-body class="text-center">
              <span>saved successfully</span>
            </modal-body>
          </modal>
        </column>
      </row>
    </div>
  </section>
</template>

<script>
import { Row, Column, Btn, Fa, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'mdbvue'

export default {
  name: 'Saved',
  components: {
    Row,
    Column,
    Btn,
    Fa,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter
  },
  /* methods: {
    setTimeout(() => {
     this.submitStatus = 'OK'
    }, 500)
  }, */
  props: ['showFrameModalTop']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
