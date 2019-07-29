
var methods = {
  login(){

    fetch('http://localhost:3000/api/auth',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })})
            .then(response => {
                response.json().then(result => {
                  console.log(result)
                  if(result.error){
                   window.alert('Invalid or unauthorized credentials') 
                  }
                  else {
                    localStorage.setItem('credentials', JSON.stringify(result))
                    if(result.type == 'Administrator')
                      window.location = '/modules/user'
                    else
                      window.location = '/modules/switch'
                  }
                });
                
            })
  }
}

export default methods