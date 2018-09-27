import Api from '@/services/Api'

export default {
  addCourse (register) {
    return Api().post('addcourse', register)
  },
  courseList () {
    return Api().get('viewcourse')
  },
  updateCourse (params) {
    return Api().put('viewcourse/' + params.id, params)
  },
  deleteCourse (id) {
    return Api().delete('viewcourse/' + id)
  }
}
