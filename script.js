var app = new Vue({
    el: '#app',
    data: {
        child: '',
        times: [],
    },
    mounted() {
        if (localStorage.times) {
            this.times = JSON.parse(localStorage.times);
        }
        if (localStorage.child) {
            this.child = localStorage.child;
        }
    },
    watch: {
        times(newNames) {
            localStorage.times = JSON.stringify(newNames);
        },
        child(newName) {
            localStorage.child = newName;
        }
    },
    methods: {
        addTime(action) {
            let now = moment(new Date()).format("h:mm a");
            this.times.push({type:action,time:now});
            console.log(this.times);
            // this.$cookies.set("newKey1", this.times[0]);
        },
        clearData() {
            this.times = [];
            this.child ='';
        }
    },

    computed: {
        printTimes() {
            return Array.from(this.times, time => {
                let pastTense;
                if (time.type === 'eat') {
                    pastTense = 'ate';
                }
                if (time.type === 'sleep') {
                    pastTense = 'slept';
                }
                return pastTense + ' at ' + time.time
            });
        }
    }
});