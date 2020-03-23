var app = new Vue({
    el: '#app',
    data: {
        child: '',
        times: [],
        prevDay: '',
        currDay: '',
        history: '',
        index: 1,
    },
    mounted() {
        // we can possibly eliminate currDay and just use new Date()
        localStorage.currDay = moment(new Date()).format('MMM D');
        if (localStorage.times) {
            this.times = JSON.parse(localStorage.times);
        }
        if (localStorage.child) {
            this.child = localStorage.child;
        }
        if (localStorage.index) {
            this.index = parseInt(localStorage.index);
        }
        if (localStorage.currDay && localStorage.prevDay) {
            if (localStorage.currDay != localStorage.prevDay) {
                if (localStorage.history) {
                    let myTimes = JSON.parse(localStorage.history);
                    myTimes.push({day: this.index, events:this.times})
                    localStorage.history = JSON.stringify(myTimes);
                } else {
                    localStorage.history = JSON.stringify([{day:this.index, events:this.times}]);
                }
                this.times = [];
                this.index += 1;
            }
        } 
        if (localStorage.history) {
            this.history = JSON.parse(localStorage.history);
        }
        localStorage.prevDay = localStorage.currDay;
        localStorage.index = this.index;
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
            let now = new Date();
            this.times.push({type:action,time:now});
            console.log(this.times);
            // this.$cookies.set("newKey1", this.times[0]);
        },
        clearAll() {
            this.times = [];
            this.child ='';
        },
        clearEntries() {
            this.times = [];
        },
        clearName() {
            this.child ='';
        }, 
        clearHistory() {
            localStorage.history = JSON.stringify([]);
            this.index = 1;
            localStorage.index = this.index;
            this.history = [];
        },
        viewHistory() {
            let style = document.getElementById("history").style.display;
            if (style != "none") {
                document.getElementById("history").style.display = "none";
            } else {
                document.getElementById("history").style.display = "";
            }
            
        },
    },

    computed: {
        printTimes() {
            return Array.from(this.times, time => {
                if (time.type === 'woke up') {
                    return time.type + ' at ' + moment(time.time).format("h:mm a") + 
                        " (wake him up at " + moment(new Date(time.time)).add(75, "minutes").format('hh:mm a') + ")";
                }
                return time.type + ' at ' + moment(time.time).format("h:mm a");
            });
        },
        printHistory() {
            return Array.from(this.history, day => {
                return "Day " + day.day + " :" + Array.from(day.events, event => {
                    return " " + event.type + " at " + moment(event.time).format('h:mm a');
                });
            });
        },
    }
});
