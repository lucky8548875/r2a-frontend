var data = {

    // Debugging
    message: 'Hello, world!',

    // List of user(s)
    users: [],

    // Selected user (for two-way binding)
    selected_user: {
        _id: null,
        name: "",
        photo: "",
        type: "",
        email: "",
        department: "",
        active: false,
        username: "",
        password: ""
    },

    addModalSync: false,
    editModalSync: false,
    sidebarSync: false,

    search_filter: ""

}

export default data