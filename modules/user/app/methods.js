var methods = {

    // Get list of all users thru API
    loadUsers: function () {

        // imaginary API call
        /*
        fakeapi.getUsers().then(response => {
            this.users = response
        })
        */
       fetch('http://localhost:3000/api/users')
       
            .then(response => {
                
                // this.users = response.json();
                return response.json()
            })
            .then(response => {
                this.users = response
            });

    },

    // Add a user thru API
    addUser: function () {
        // fakeapi.addUser({
        //     name: this.selected_user.name,
        //     photo: this.selected_user.photo,
        //     type: this.selected_user.type,
        //     email: this.selected_user.email,
        //     department: this.selected_user.department,
        //     active: this.selected_user.active,
        //     username: this.selected_user.username,
        //     password: this.selected_user.password
        // }).then(() => {
        //     this.loadUsers()
        // })
        var values = {
                name: this.selected_user.name,
                photo: this.selected_user.photo,
                type: this.selected_user.type,
                email: this.selected_user.email,
                department: this.selected_user.department,
                active: true,
                username: this.selected_user.username,
                password: this.selected_user.password
            }
        console.log(JSON.stringify(values))
        fetch('http://localhost:3000/api/users',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(values)})
            .then(response => {
                    this.loadUsers()
                
            })
    },

    // Return a user based on id
    findUser: function (_id) {
        return this.users.find(user => user._id == _id)
    },

    // Load user info for data binding
    selectUser: function (user) {
        if (user) {
            Object.assign(this.selected_user, {
                _id: user._id,
                name: user.name,
                photo: user.photo,
                type: user.type,
                email: user.email,
                department: user.department,
                active: user.active,
                username: user.username
            })
        }
        else {
            // Error message here
            window.alert('Error, user not found')
        }

    },

    // display user info by calling findUser and selectUser
    viewUser: function (_id) {
        var user = this.findUser(_id)
        this.selectUser(user)
    },

    // Update user details thru API
    updateUser: function (_id, values) {
        // fakeapi.updateUser(_id, values).then(() => {
        //     this.loadUsers()
        // })
        fetch('http://localhost:3000/api/users',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                _id,
                values
            })})
            .then(response => {
                this.loadUsers()
                
            })

    },

    // Declare data to update then calls updateUser
    updateSelectedUser: function () {

        this.updateUser(this.selected_user._id, {
            name: this.selected_user.name,
            photo: this.selectUser.photo,
            type: this.selected_user.type,
            email: this.selected_user.email,
            department: this.selected_user.department,
            active: this.selected_user.active,
        })

    },

    deleteUser (_id) {
        fetch('http://localhost:3000/api/users',
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                _id
            })})
            .then(response => {
                    this.loadUsers()
                
            })


    },

    deleteSelectedUser () {
        this.deleteUser(this.selectUser._id)
    },

    resetSelectedUser () {
        Object.assign(this.selected_user, {
            _id: null,
            name: "",
            photo: "",
            type: "",
            email: "",
            department: "",
            active: false,
            username: "",
            password: ""
        })
    },

    blockUser(_id){
        this.updateUser(_id, {
            active: false
        })
    },

    unblockUser(_id){
        this.updateUser(_id, {
            active: true
        })
    },

    makeUser(_id){
        this.updateUser(_id, {
            type: 'User'
        })
    },

    makeAdmin(_id){
        this.updateUser(_id, {
            type: 'Administrator'
        })
    },

    logout(){
        window.localStorage.clear()
        window.location = '/modules/login'
    },
    showSnackbar(text) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        x.innerText = text
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }





}

export default methods