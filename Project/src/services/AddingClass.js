import Api from '@/services/Api'

export default {
  addClass (attending) {
    return Api().post('addclass', attending)
  },
  classList () {
    return Api().get('viewclass')
  },
  updateClass (classupdate) {
    return Api().put(`viewclass/${classupdate._id}`, classupdate)
  }
}
