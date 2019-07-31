function open () {
    var properties = JSON.parse(localStorage.getItem('properties'))
    return properties ? properties : []
}

function save (value) {
    return localStorage.setItem('properties', JSON.stringify(value))
}

var fakeapi = {

    getProperties: () => {
        return new Promise(resolve => {

                resolve(open())
            

        })
    },

    addProperty: data => new Promise(resolve => {
        var properties = open()
        Object.assign(data, { _id: properties.length, active: true })
        properties.push(data)
        save(properties)

        resolve()
        
    }),

    updateProperty: (_id, data) => new Promise(resolve => {

        var properties = open()
        var property = properties.find(property => property._id == _id)
        Object.assign(property, data)
        save(properties)

        resolve()

    }),
    deleteProperty: _id => new Promise(resolve => {
        var properties = open()
        properties.splice(properties.indexOf(properties.find(property => property._id == _id)), 1)
        save(properties)

        resolve()
    })
}

var methods = {
    

    // Get list of all users thru API
    loadProperties: function () {
        

        // imaginary API call

        // fakeapi.getProperties().then(response => {            
        //     this.properties = response
        // })
        fetch('http://localhost:3000/api/switch')
       
        .then(response => { 
            return response.json()
        })
        .then(response => {
            this.properties = response
            
        });

        fetch('http://localhost:3000/api/logs')
       
        .then(response => { 
            return response.json()
        })
        .then(response => {
            this.logs = response
            
        });


    },

    // Add a user thru API
    addProperty: function () {
        // fakeapi.addProperty({
        //     category: this.selected_property.category,
        //     site_name: this.selected_property.site_name,
        //     row_key: this.selected_property.row_key,
        //     site_url: this.selected_property.site_url,
        //     ads_location: this.selected_property.ads_location,
        //     reason: 'Created',
        //     active: true,
        //     updated: new Date().toLocaleString()
        // }).then(() => {
        //     this.loadProperties()
        // })
        var values = {
            category: this.selected_property.category,
            site_name: this.selected_property.site_name,
            row_key: this.selected_property.row_key,
            site_url: this.selected_property.site_url,
            ads_location: this.selected_property.ads_location,
            reason: 'Created',
            active: true,
            updated: new Date().toLocaleString()
        }
    console.log(JSON.stringify(values))
    fetch('http://localhost:3000/api/switch',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(values)})
        .then(response => {
                
                this.showSnackbar('Added successfully')
                fetch('http://localhost:3000/api/logs',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify({
                        name: JSON.parse(window.localStorage.getItem('credentials')).name,
                        site_name: values.site_name,
                        action: 'Create new property',
                        date: new Date().toLocaleString()

                    })

                }).then(response => {
                    this.loadProperties()
                })
            
        })
    },

    // Return a user based on _id
    findProperty: function (_id) {
        console.log(this.properties)
        return this.properties.find(property => property._id == _id)
    },

    // Load user info for data binding
    selectProperty: function (property) {
        if (property) {
            Object.assign(this.selected_property, {
                _id: property._id,
                category: property.category,
                site_name: property.site_name,
                row_key: property.row_key,
                site_url: property.site_url,
                ads_location: property.ads_location,
                reason: property.reason,
                active: property.active,
                updated: property.updated
            })
        }
        else {
            // Error message here
            window.alert('Error, property not found')
        }

    },

    // display user info by calling findUser and selectUser
    viewProperty: function (_id) {
        var property = this.findProperty(_id)
        this.selectProperty(property)
    },

    // Update user details thru API
    updateProperty: function (_id, values) {
        // fakeapi.updateProperty(_id, values).then(() => {
        //     this.loadProperties()
        // })
        fetch('http://localhost:3000/api/switch',
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
                    this.showSnackbar('Updated successfully')
                    fetch('http://localhost:3000/api/logs',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify({
                        name: JSON.parse(window.localStorage.getItem('credentials')).name,
                        site_name: this.properties.find(property => property._id == _id).site_name,
                        action: values.reason,
                        date: new Date().toLocaleString()

                    })

                }).then(response => {
                    this.loadProperties()
                })
            })

    },

    // Declare data to update then calls updateUser
    updateSelectedProperty: function () {

        var property = this.findProperty(this.selected_property._id)
        var updates = [];
        if (property.category != this.selected_property.category)
            updates.push(' category')
        if (property.site_name != this.selected_property.site_name)
            updates.push(' site name')
        if (property.site_url != this.selected_property.site_url)
            updates.push(' site URL')
        if (property.row_key != this.selected_property.row_key)
            updates.push(' row key')
        if (property.ads_location != this.selected_property.ads_location)
            updates.push(' ads location')

        if (updates.length > 0) {
            this.updateProperty(this.selected_property._id, {
                category: this.selected_property.category,
                site_name: this.selected_property.site_name,
                row_key: this.selected_property.row_key,
                site_url: this.selected_property.site_url,
                ads_location: this.selected_property.ads_location,
                reason: 'Update' + updates.toString(),
                active: this.selected_property.active,
                updated: new Date().toLocaleString()
            })
        }




    },

    deleteProperty (_id) {
        if(confirm('Are you sure to remove this property?')){
        fetch('http://localhost:3000/api/switch',
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                _id
            })})
            .then(response => {
                    
                    this.showSnackbar('Removed successfully')
                    fetch('http://localhost:3000/api/logs',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify({
                        name: JSON.parse(window.localStorage.getItem('credentials')).name,
                        site_name: this.properties.find(property => property._id == _id).site_name,
                        action: 'Delete property',
                        date: new Date().toLocaleString()

                    })

                }).then(response => {
                    this.loadProperties()
                })
                
            })
        }

    },

    deleteSelectedProperty () {
        this.deleteProperty(this.selected_property._id)
    },

    resetSelectedProperty () {
        Object.assign(this.selected_property, {
            category: "",
            site_name: "",
            row_key: "",
            site_url: "",
            ads_location: "",
            reason: "",
            active: true,
            updated: ""
        })
    },

    toggle (_id) {
        this.updateProperty(_id, {
            active: !this.properties.find(property => property._id === _id).active,
            reason: `Switch ${!this.properties.find(property => property._id === _id).active ? 'ON' : 'OFF'}`
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