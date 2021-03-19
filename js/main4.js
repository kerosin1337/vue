var add = new Vue({
    el: '#create',
    data: {
        notebook: [],
        name: '',
        colorBlock: ''
    },
    mounted() {
        if (localStorage.notebook) {

            this.notebook = Array(localStorage.notebook);
            console.log(this.notebook);
        }
    },
    methods: {
        addNotebook() {
            this.notebook.push({title: this.name, color: this.colorBlock})
        }
    },
    watch: {
        name(UpNotebook) {
            localStorage.notebook = UpNotebook;
        }
    }
})
