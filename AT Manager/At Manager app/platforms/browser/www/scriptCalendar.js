//making a connection
// var socket = io.connect('192.168.0.63:4001');
var socket = io.connect('172.25.41.97:4001');

var //custName = new Array(),
    appointmentArray = new Array(),
    //appointmentTime = [],
    dateArray = [],
    countDate = 0,
    custName,
    appointmentTime,
    countAppointment = 0;
// countTime = 0,
// countName = 0;
var isNewAppointment = false,
    newDate,
    currentDate,
    retrieveAppointments,
    // btnSchedule = document.getElementById("scheduleBtn"),
    modal = document.getElementById('myevent'),
    close = document.getElementById('close');
// divTime = document.createElement('div');

var myCalendar = {
    month: document.querySelectorAll('[data-calendar-area="month"]')[0],
    next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
    previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
    label: document.querySelectorAll('[data-calendar-label="month"]')[0],
    activeDates: null,
    date: new Date(),
    todaysDate: new Date(),

    init: function (options) {
        this.options = options;
        this.date.setDate(1);
        this.createMonth();
        this.createListeners();
    },

    createListeners: function () {
        var _this = this;
        this.next.addEventListener('click', function () {
            _this.clearCalendar();
            var nextMonth = _this.date.getMonth() + 1;
            _this.date.setMonth(nextMonth);
            _this.createMonth();
        });
        // Clears the calendar and shows the previous month
        this.previous.addEventListener('click', function () {
            _this.clearCalendar();
            var prevMonth = _this.date.getMonth() - 1;
            _this.date.setMonth(prevMonth);
            _this.createMonth();
        });
    },

    createDay: function (num, day, year) {
        var newDay = document.createElement('div');
        var dateEl = document.createElement('span');
        dateEl.innerHTML = num;
        newDay.className = 'vcal-date';
        newDay.setAttribute('data-calendar-date', this.date);

        // if it's the first day of the month
        if (num === 1) {
            if (day === 0) {
                newDay.style.marginLeft = (6 * 14.28) + '%';
            } else {
                newDay.style.marginLeft = ((day - 1) * 14.28) + '%';
            }
        }

        if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
            newDay.classList.add('vcal-date--disabled');
        } else {
            newDay.classList.add('vcal-date--active');
            newDay.setAttribute('data-calendar-status', 'active');
        }

        if (this.date.toString() === this.todaysDate.toString()) {
            newDay.classList.add('vcal-date--today');
        }
        newDay.appendChild(dateEl);
        this.month.appendChild(newDay);
    },

    dateClicked: function () {
        var _this = this;
        this.activeDates = document.querySelectorAll(
            '[data-calendar-status="active"]'
        );
        // var custName;
        // var appointmentTime;
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].addEventListener('click', function (event) {
                var div=document.getElementById('schedule');
                var picked = document.querySelectorAll(
                    '[data-calendar-label="picked"]'
                )[0];
                // var newDate = this.dataset.calendarDate;
                newDate = this.dataset.calendarDate;
                newDate = newDate.split(' ').slice(0, 4).join(' ');
                currentDate = newDate;
                //var custName
                //var appointmentTime
                //for each loop comes here. Each date has a number of schedules. for each time on that date, add name,time & date below the calendar
                socket.emit('scheduleLoad',{
                    date: newDate,
                });
                socket.on('shedulePopulate',function (data) {
                    for(i = 0; i < data.result.length; i++){
                        console.log(data.result[i]['calID']);
                        console.log(data.result[i]['custName']);
                        console.log(data.result[i]['setDate']);
                        console.log(data.result[i]['time']);
                        div.innerHTML="<p style='background-color:#e7e9ed' >"+
                            data.result[i]['custName']+":<br>"+data.result[i]['setDate']+" "+data.result[i]['time']+"<i class='icon ion-md-information-circle-outline'></i>"+
                            "</p>";
                    }
                });
                div.innerHTML="<p style='background-color:#e7e9ed' >"+
                    custName+":<br>"+newDate+" "+appointmentTime+"<i class='icon ion-md-information-circle-outline'></i>"+
                    "</p>";
                //  div.appendChild(content)
                _this.removeActiveClass();
                this.classList.add('vcal-date--selected');
            });
            this.activeDates[i].addEventListener('dblclick',function (event){
                // alert("Add Event");
                modal.style.display = "block";
                close.onclick = function () {
                    modal.style.display = "none";
                };
            });
        }
    },

    createMonth: function () {
        var currentMonth = this.date.getMonth();
        socket.emit('requestDays',{
        });

        socket.on('dayPopulate',function (data) {
            for(i = 0; i < data.result.length; i++){
                console.log(data.result[i]['calID']);
                console.log(data.result[i]['custName']);
                console.log(data.result[i]['setDate']);
                console.log(data.result[i]['time']);
            }
        });
        while (this.date.getMonth() === currentMonth) {
            this.createDay(
                this.date.getDate(),
                this.date.getDay(),
                this.date.getFullYear()
            );
            this.date.setDate(this.date.getDate() + 1);
        }
        // while loop trips over and day is at 30/31, bring it back
        this.date.setDate(1);
        this.date.setMonth(this.date.getMonth() - 1);

        this.label.innerHTML =
            this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
        this.dateClicked();
    },

    monthsAsString: function (monthIndex) {
        return [
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ][monthIndex];
    },

    clearCalendar: function () {
        myCalendar.month.innerHTML = '';
    },

    removeActiveClass: function () {
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].classList.remove('vcal-date--selected');
        }
    }
};

// function setSchedule()

function setSchedule()
{
    custName = document.getElementById("setName").value;
    appointmentTime = document.getElementById("setTime").value;

    // countAppointment++;
    // countDate++;
    modal.style.display = "none";

    // alert(dateArray.length);// Place data to test in the alert e.g. newDate or currentDate etc..
    // if(isNewAppointment)
    // {
    //     isNewAppointment = false;
    //     alert("Date has " + appointmentArray.count() + " appointments stored");
    // }
    // else
    // {
        alert("Date has no appointments stored!");
        isNewAppointment = true;

        // appointmentArray[countAppointment] = newDate;
        socket.emit('insertCal',{
            name: custName,
            date: currentDate,
            time: appointmentTime,
        });
        socket.on('dayPopulate',function (data) {
            for(i = 0; i < data.result.length; i++){
                console.log(data.result[i]['calID']);
                console.log(data.result[i]['custName']);
                console.log(data.result[i]['setDate']);
                console.log(data.result[i]['time']);
            }
        });
        // dateArray[countDate] = currentDate;
        // appointmentArray[countAppointment] = {name: custName, date: currentDate, time: appointmentTime};//Stores appointment data in an array that increments when set schedule is clicked
    // }
    // localStorage.setItem("appointments", JSON.stringify(appointmentArray));
}
