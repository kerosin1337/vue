Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
});

var app2 = new Vue({
    el: '.app-2',
    data: {
        message: new Date().toLocaleString(),
        massage2: '123',
        seen: true
    },
    methods: {
        reverseText: function () {
            this.massage2 = this.massage2.split('').reverse().join('')
        }
    }
});

var appFor = new Vue({
    el: '.for',
    data: {
        texts: [
            {id: 0, text: '1'},
            {id: 1, text: '2'},
            {id: 2, text: '3'},
        ]
    }
});

var appInput = new Vue({
    el: '.input',
    data: {
        massage: ''
    },

});

