var select = new Vue({
    el: '#selectEnemy',
    data: {
        who: '',
        seen: true,
    },
    methods: {
        whos: function () {
            if (this.who === 1) {
                this.seen = false;
                inputNick.seen = true;
                inputNick.seen_1 = true;
                inputNick.seen_2 = true;
            } else if (this.who === 0) {
                this.seen = false;
                inputNick.seen = true;
                inputNick.seen_1 = true;
            } else {
                alert('Сделайте выбор!')
            }
        }
    }
});

var inputNick = new Vue({
    el: '#inputNick',
    data: {
        seen: false,
        seen_1: false,
        seen_2: false,
        name: generateName(),
        name2: generateName(),
    },
    methods: {
        ready: function () {
            if (this.name && this.name2) {
                this.seen = false;
                sizeField.seen = true;
                nicks.name1 = this.name;
                nicks.name2 = this.name2;
            } else {
                alert("Введите ники!")
            }
        }
    }
});


var sizeField = new Vue({
    el: '#sizeField',
    data: {
        seen: false,
        size: [3, 4],
        selectSize: '',
    },
    methods: {
        finalEdit: function () {
            this.selectSize = Number(this.selectSize);
            if (this.selectSize === 3) {
                nicks.seen = true;
                game.seen = true;
                clean.seen = true;
                this.seen = false;
            } else if (this.selectSize === 4) {
                nicks.seen = true;
                game2.seen = true;
                clean.seen = true;
                this.seen = false
            } else {
                alert('Выберите размер!')
            }
        }
    }
});

var nicks = new Vue({
    el: '#nicks',
    data: {
        seen: false,
        name1: '',
        name2: '',
    }
});

var game = new Vue({
    el: '#field',
    data: {
        msgEnd: "Игра окончена",
        seen: false,
        isEnd: false,
        field: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        queue: true,
        isWinner: false,
        congrulMsg: "Победитель: ",
        win: "",
        sum: 0
    },
    methods: {
        random() {
            if (sizeField.selectSize === 3) {
                while (true) {
                    for (let i = 0; i < 9; i++) {
                        oPC = Math.floor(Math.random() * Math.floor(9));
                        if ((this.field[i] !== "O" && this.field[i] !== "X" && oPC === i)) {
                            // console.log(this.field[i], oPC, this.sum)
                            return oPC;
                        }
                    }
                    console.log(1);
                }
            }
            if (sizeField.selectSize === 4) {
                while (true) {
                    for (let i = 0; i < 16; i++) {
                        oPC = Math.floor(Math.random() * Math.floor(16));
                        if ((game2.field[i] !== "O" && game2.field[i] !== "X" && oPC === i)) {

                            return oPC;
                        }
                    }
                }
            }
        },
        touch: function (i) {
            if (this.isWinner)
                return;
            if (this.field[i] === 0) {
                if (this.queue && select.who === 1) {
                    Vue.set(this.field, i, "X");
                } else if (!this.queue && select.who === 1) {
                    Vue.set(this.field, i, "O");
                } else if (this.queue && select.who === 0) {
                    Vue.set(this.field, i, "X");
                    if (this.sum !== 1) {
                        Vue.set(this.field, this.random(), "O");
                    }
                    this.queue = !this.queue;
                }
                this.queue = !this.queue;
            }

            this.isOver();
            this.win = this.winner();
        },
        isOver: function () {
            this.sum = 0;
            for (let i = 0; i < 9; ++i) {
                if (this.field[i] === 0)
                    ++this.sum;
            }
            console.log(this.sum);
            this.isEnd = this.sum <= 0;
            console.log(this.isEnd);
        },
        newGame: function () {
            this.isEnd = false;
            this.isWinner = false;
            this.win = "";
            for (let i = 0; i < 9; ++i) {
                Vue.set(this.field, i, 0);
            }
        },
        winner: function () {

            for (let i = 0; i < 9; i += 3)
                if (this.field[i] === this.field[i + 1] && this.field[i] === this.field[i + 2] && this.field[i] !== 0) {
                    this.isWinner = true;
                    this.isEnd = true
                    return this.winnerWho(this.field[i]);
                }

            for (let i = 0; i < 9; ++i)
                if (this.field[i] === this.field[i + 3] && this.field[i] === this.field[i + 6] && this.field[i] !== 0) {
                    this.isWinner = true;
                    this.isEnd = true
                    return this.winnerWho(this.field[i]);
                }

            if (this.field[0] === this.field[4] && this.field[0] === this.field[8] && this.field[0] !== 0) {
                this.isWinner = true;
                this.isEnd = true
                return this.winnerWho(this.field[4]);
            }
            if (this.field[2] === this.field[4] && this.field[2] === this.field[6] && this.field[2] !== 0) {
                this.isWinner = true;
                this.isEnd = true
                return this.winnerWho(this.field[4]);
            }
        },
        winnerWho: function (arg) {
            console.log(arg);
            if (arg === "X") {
                return nicks.name1
            } else {
                return nicks.name2
            }
        }
    }
});


var game2 = new Vue({
    el: '#field2',
    data: {
        msgEnd: "Игра окончена",
        seen: false,
        isEnd: false,
        field: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        queue: true,
        isWinner: false,
        congrulMsg: "Победитель: ",
        win: "",
        sum: 0
    },
    methods: {

        touch: function (i) {
            if (this.isWinner)
                return;
            if (this.field[i] === 0) {
                if (this.queue && select.who === 1) {
                    Vue.set(this.field, i, "X");
                } else if (!this.queue && select.who === 1) {
                    Vue.set(this.field, i, "O");
                } else if (this.queue && select.who === 0) {
                    Vue.set(this.field, i, "X");
                    if (this.sum !== 1) {
                        Vue.set(this.field, game.random(), "O");
                    }
                    this.queue = !this.queue;
                }
                this.queue = !this.queue;
            }

            this.isOver();
            this.win = this.winner();
        },
        isOver: function () {
            this.sum = 0;
            for (let i = 0; i < 16; ++i) {
                if (this.field[i] === 0)
                    ++this.sum;
            }
            this.isEnd = this.sum <= 0;
        },
        newGame: function () {
            this.isEnd = false;
            this.isWinner = false;
            this.win = "";
            for (let i = 0; i < 16; ++i) {
                Vue.set(this.field, i, 0);
            }
        },
        winner: function () {

            for (let i = 0; i < 16; i += 4)
                if (this.field[i] === this.field[i + 1] && this.field[i] === this.field[i + 2] && this.field[i] === this.field[i + 3] && this.field[i] !== 0) {
                    this.isWinner = true;
                    this.isEnd = true
                    return game.winnerWho(this.field[i]);
                }

            for (let i = 0; i < 16; ++i)
                if (this.field[i] === this.field[i + 4] && this.field[i] === this.field[i + 8] && this.field[i] === this.field[i + 12] && this.field[i] !== 0) {
                    this.isWinner = true;
                    this.isEnd = true
                    return game.winnerWho(this.field[i]);
                }

            if (this.field[0] === this.field[5] && this.field[0] === this.field[10] && this.field[0] === this.field[15] && this.field[0] !== 0) {
                this.isWinner = true;
                this.isEnd = true
                return game.winnerWho(this.field[5]);
            }
            if (this.field[3] === this.field[6] && this.field[3] === this.field[9] && this.field[3] === this.field[12] && this.field[3] !== 0) {
                this.isWinner = true;
                this.isEnd = true
                return game.winnerWho(this.field[6]);
            }
        },
    }
});


var clean = new Vue({
    el: '#clean',
    data: {
        seen: false
    },
    methods: {
        clean: function () {
            if (sizeField.selectSize === 3) {
                game.newGame();
                game.seen = false;
            } else {
                game2.newGame();
                game2.seen = false;
            }
            select.seen = true;
            nicks.seen = false;
            this.seen = false
        }
    }
});