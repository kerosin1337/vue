var app = new Vue({
    el: '.main',
    data: {
        field: '',
        name: '',
        seen: true,
    },
    methods: {
        delInput: function () {
            if (this.field === '') {
                alert('Введите имя') // выведет всплывающее окно при отсутствии текста
            } else {
                this.seen = false; // убирает поле с вводом
                list.seen = true; // включает блок списка
                this.name = this.field
            }
        }
    }
});


var list = new Vue({
    el: '.list',
    data: {
        lists: [], // массив для списка
        li: '',
        seen: false,
        cross: [], // массив для стиля
    },
    methods: {
        add: function () { // функция добавления пункта
            if (this.li === '') {
                alert('Введите пункт') // выведет всплывающее окно при отсутствии текста
            } else {
                this.lists.push({text: this.li}); // добавление пункта
                this.li = ''; // удаление текста внутри поля для ввода
                this.cross.push(''); // создание массива для стиля
            }
        },
        crossOut: function (i) { // функция добавления зачеркивания и убирание зачеркивания
            if (this.cross[i].textDecoration === undefined || this.cross[i].textDecoration === '') { // зачеркивает
                Vue.set(this.cross, i, {textDecoration: 'line-through'});
                console.log(this.cross[i].textDecoration, 1)
            } else if (this.cross[i].textDecoration === "line-through") { // убирает зачеркивание
                Vue.set(this.cross, i, {textDecoration: ''});
                console.log(this.cross[i].textDecoration, 2)
            }

        },
        deleteLi: function (i) { // удаление пункта
            this.lists.splice(i, 1); // удаление в массиве списка
            this.cross.splice(i, 1); // удаление в массиве стиля
             // вызов функции для того, чтобы другой пункт после удаления не поменял стиль
        },

    }
});