import Api from '@/services/Api'

export default {
  addCourse (register) {
    return Api().post('addcourse', register)
  },
  courseList () {
    return Api().get('viewcourse')
  },
  updateCourse (id, courseupdate) {
    return Api().put('viewcourse/' + id, courseupdate)
  }
}
