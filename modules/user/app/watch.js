export default {
  addModalSync(shown){
    if(!shown){
      this.resetSelectedUser()
    }
  },
  editModalSync(shown){
    if(!shown){
      this.resetSelectedUser()
    }
  },
  isAdmin(value){
    if(false){
      window.location = '/modules/switch'
    }
  }
}