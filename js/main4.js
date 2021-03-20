var add = new Vue({
    el: '#create',
    data: {
        notebook: [],
        name: '',
        colorBlock: '#3D7D96',
        check: [],
        id: 0
    },
    mounted() {
        if (localStorage.notebook) {

            this.notebook = JSON.parse(localStorage.notebook);
        }
        if (localStorage.id) {

            this.id = JSON.parse(localStorage.id);
        }
    },
    methods: {
        addNotebook() {

            this.notebook.push({title: this.name, color: this.colorBlock, list: [{id: this.id++,li: 'qwe'}]});

        },
        border(i) {
            return {
                'border-top': '5px solid ' + i.color,
            }
        },
        delLi(item) {
            // console.log(this..list);
            this.notebook.forEach(element => console.log(element))
        }
    },
    watch: {
        notebook(UpNotebook) {
            localStorage.notebook = JSON.stringify(UpNotebook);
        },
        id(ids) {
            localStorage.id = JSON.stringify(ids);
        }
    }
})
