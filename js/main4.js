const Store = {
    set: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
    get: (name) => JSON.parse(localStorage.getItem(name)),
    remove: (name) => localStorage.removeItem(name)
}


var add = new Vue({
    props: ['note'],
    el: '#create',
    data: {
        notebook: [],
        name: '',
        colorBlock: '#3D7D96',
        check: [],
        id: 0,
        newColor: [],
        form: [],
        filter: ''
    },
    mounted() {
        if (localStorage.notebook) {

            this.notebook = JSON.parse(localStorage.notebook);
        }
        if (localStorage.id) {

            this.id = JSON.parse(localStorage.id);
        }
        if (localStorage.form) {
            this.form = JSON.parse(localStorage.form);
        }
        if (localStorage.cross) {
            this.cross = JSON.parse(localStorage.cross);
        }
        if (localStorage.filter) {
            this.filter = JSON.parse(localStorage.filter);
        } else {
            this.filter = 'date'
        }
    },
    computed: {
        // formattedDate() {
        //     console.log('qwe')
        //     // Intl.DateTimeFormat('ru-RU', {dateStyle: 'long'}).format(this.notebook.date)
        //     // + ' ' +
        //     return Intl.DateTimeFormat('ru-RU', {timeStyle: 'short'}).format(this.notebook.date);
        // },
        filteredNotes() {
            const sortRules = {
                'date': (a, b) => b.date - a.date,
                'title': (a, b) => {
                    const titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
                    if (titleA < titleB)
                        return -1
                    if (titleA > titleB)
                        return 1
                    return 0
                },
                'priority': (a, b) => {
                    const priorityA = a.priority, prioritB = b.priority;
                    if (priorityA < prioritB)
                        return -1
                    if (priorityA > prioritB)
                        return 1
                    return 0
                }
            };
            // .filter(item => this.search ? item.title.includes(this.search) : true)
            return this.notebook.sort(sortRules[this.filter]);
        }
    },
    methods: {
        // updateNotebook(i) {
        //     this.$emit('update-note', i);
        //
        // },
        addNotebook() {
            this.form.push({
                title: ''
            });
            this.notebook.push({
                title: this.name,
                color: this.colorBlock,
                date: Intl.DateTimeFormat('ru-RU', {timeStyle: 'short'}).format(Date.now()),
                priority: 0,
                list: []
            });
            this.saveNotes();
        },
        border(i) {
            return {
                'border-top': '5px solid ' + i.color,
            }
        },
        removeNote(note) {
            const idx = this.notebook.indexOf(note);
            if (idx !== -1) this.notebook.splice(idx, 1);
            this.saveNotes()
        },
        changeColor(event, i) {
            console.log(event.target.value, i);
            i.color = event.target.value;
            // this.updateNotebook(i);
            this.saveNotes()
        },
        removeTask(task, item) {
            const idx = this.notebook[item].list.indexOf(task);
            if (idx !== -1) this.notebook[item].list.splice(idx, 1);
            this.saveNotes();
        },
        addTask(i, item) {
            const body = {
                id: this.id++,
                li: this.form[item].title,
                completed: false
            };
            i.list.push(body);
            console.log(this.form[item].title);
            this.form[item].title = '';
            this.saveNotes();
        },
        updateCompleted(i, j, event) {
            console.log(event);
            this.notebook[i].list[j].completed = event;
            this.saveNotes()
        },
        updateLiText(i, j, event) {
            console.log(event);
            this.notebook[i].list[j].li = event;
            this.saveNotes()
        },
        updateNoteName(i, event) {
            console.log(event);
            this.notebook[i].title = event;
            this.saveNotes()
        },
        priorityUpdate(event, i) {
            console.log(event.target.value);
            i.priority = event.target.value;
            this.saveNotes();
        },
        saveNotes() {
            // this.notesFilter();
            Store.set('notebook', this.notebook);
            Store.set('form', this.form);
            Store.set('id', this.id);
            Store.set('cross', this.cross);
        },
    },
    watch: {
        filter(value) {
            Store.set('filter', value);
        }
    }
})
