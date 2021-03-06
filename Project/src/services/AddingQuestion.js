import Api from '@/services/Api'

export default {
  addQuestion (prepare) {
    return Api().post('addquestion', prepare)
  },
  questionList () {
    return Api().get('viewquestion')
  },
  uniqueQuestion (course) {
    return Api().get('generatepaper/' + course)
  }
}
