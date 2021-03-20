var add = new Vue({
    el: '#create',
    data: {
        notebook: [],
        name: '',
        colorBlock: '#3D7D96'
    },
    mounted() {
        if (localStorage.notebook) {

            this.notebook = JSON.parse(localStorage.notebook);
        }
    },
    methods: {
        addNotebook() {
            this.notebook.push({title: this.name, color: this.colorBlock, list: []});

        },
        border(i) {
            return {
                'border-top': '5px solid ' + i.color,
            }
        }
    },
    watch: {
        notebook(UpNotebook) {
            localStorage.notebook = JSON.stringify(UpNotebook);
        }
    }
})