<template>
  <section id="error">
    <div class="text-center">
      <row>
        <column md="12">
          <modal frame removeBackdrop position="top" v-if="showFrameModalTopErr" @close="showFrameModalTopErr = false">
            <modal-body class="text-center">
              <span>{{error}}</span>
              <btn size="sm" outline="danger" rounded @click.native="showFrameModalTopErr = false">Close</btn>
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
  name: 'Error',
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
  props: ['showFrameModalTopErr', 'error']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
