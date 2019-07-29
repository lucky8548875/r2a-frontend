export default {

  filtered_users(){
    if(this.search_filter){
      return this.users.filter(user => Object.values(user).toString().toLowerCase().indexOf(this.search_filter.toLowerCase()) >= 0 )
    }
    else
      return this.users
  },
  isAdmin(){
    return JSON.parse(window.localStorage.getItem('credentials')).type == 'Administrator'
  },
  name(){
    return JSON.parse(window.localStorage.getItem('credentials')).name
  }

}