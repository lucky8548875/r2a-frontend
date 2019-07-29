export default {

  filtered_properties(){
    if(this.search_filter){
      return this.properties.filter(property => Object.values(property).toString().toLowerCase().indexOf(this.search_filter.toLowerCase()) >= 0 )
    }
    else
      return this.properties
  },
  isAdmin(){
    return JSON.parse(window.localStorage.getItem('credentials')).type == 'Administrator'
  },
  name(){
    return JSON.parse(window.localStorage.getItem('credentials')).name
  }

}