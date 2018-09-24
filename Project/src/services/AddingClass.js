import Api from '@/services/Api'

export default {
  addClass (attending) {
    return Api().post('addclass', attending)
  },
  classList () {
    return Api().get('viewclass')
  },
  updateClass (params) {
    return Api().put('viewclass/' + params.id, params)
  },
  deleteClass (id) {
    return Api().delete('viewclass/' + id)
  }
}
