//making a connection
// var socket = io.connect('192.168.8.2:4001');
var socket = io.connect('192.168.8.2:4001');



var custName,//customer name
    appointmentTime;
var newDay;
var dateEl;//number to appear on each date element
var dateArray = ["Sat Nov 24 2018", "Sun Nov 25 2018"];
var datesArr = {};
var newDate,
    currentDate,
    // btnSchedule = document.getElementById("scheduleBtn"),
    modal = document.getElementById('myevent'),
    close = document.getElementById('close'),//;
    btnSetSchedule = document.getElementById('btnSchedule'),
    divSchedule = document.getElementById('schedule');
//This variable holds all the essential functions for creating and loading the calendar.
var myCalendar = {

    month: document.querySelectorAll('[data-calendar-area="month"]')[0],        //the month
    next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],        //for the arrow for going to the next month
    previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],//for the arrow for going to a previous month
    label: document.querySelectorAll('[data-calendar-label="month"]')[0],       //the label for month
    activeDates: null,
    date: new Date(),
    todaysDate: new Date(),
//Init function for creating calendar
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
        // This is to clear the calendar and show the previous month
        this.previous.addEventListener('click', function () {
            _this.clearCalendar();
            var prevMonth = _this.date.getMonth() - 1;
            _this.date.setMonth(prevMonth);
            _this.createMonth();
        });
    },

    createDay: function (num, day, year) {
        newDay = document.createElement('div');
        dateEl = document.createElement('span');
        dateEl.innerHTML = num;
        newDay.className = 'vcal-date';
        newDay.setAttribute('data-calendar-date', this.date);

        if (num === 1) {
            if (day === 0) {
                newDay.style.marginLeft = (6 * 14.28) + '%';
            } else {
                newDay.style.marginLeft = ((day - 1) * 14.28) + '%';
            }
        }
        if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
            newDay.classList.add('vcal-date--disabled');                        //add this day to the disabled class
        } else {
            newDay.classList.add('vcal-date--active');                          //add it to the active dates that can be selected
            newDay.setAttribute('data-calendar-status', 'active');
        }
        //socket function to get all the days' dates
        socket.emit('requestDays',{
            days: this.date.toString().substring(0, 15),
        });
        var new1 = {};
        socket.on('dayPopulate',function (data) {

        });

        var d = localStorage.getItem('dates');

        for (var j = 0; j < 31; j++) {
            if(d.includes(this.date.toString().substring(0, 15)))
            {
                newDay.classList.add('vcal-date--appointment');
            }
        }

        //Highlights the current date

        if (this.date.toString() === this.todaysDate.toString()) {
            newDay.classList.add('vcal-date--today');
        }

        console.log(newDay.appendChild(dateEl));
        console.log(this.month.appendChild(newDay));
    },

    dateClicked: function () {
        var _this = this;
        this.activeDates = document.querySelectorAll(
            '[data-calendar-status="active"]'
        );
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].addEventListener('click', function (event) {
                var div=document.getElementById('schedule');
                var picked = document.querySelectorAll(
                    '[data-calendar-label="picked"]'
                )[0];
                newDate = this.dataset.calendarDate;
                newDate = newDate.split(' ').slice(0, 4).join(' ');
                currentDate = newDate;
                _this.removeActiveClass();
                this.classList.add('vcal-date--selected');

                div.innerHTML="";

                //Each date has a number of schedules. for each time on that date, add name,time & date below the calendar
                socket.emit('scheduleLoad',{
                    date: currentDate,
                });
                socket.on('shedulePopulate',function (data) {
                    div.innerHTML="";
                        for(i = 0; i < data.result.length; i++){
                            console.log(data.result[i]['calID']);
                            console.log(data.result[i]['custName']);
                            console.log(data.result[i]['setDate']);
                            console.log(data.result[i]['time']);
                            // div.innerHTML="";
                            div.innerHTML+="<p style='background-color:#e7e9ed' >"+
                                data.result[i]['custName']+":<br>"+data.result[i]['setDate']+" "+data.result[i]['time']+"<i class='icon ion-md-information-circle-outline'></i>"+
                                "</p>";
                        }
                });
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
    //this function creates the month, by calling the createDay function and looping it as required
    createMonth: function () {
        var currentMonth = this.date.getMonth();

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
      //to clear the calendar
    clearCalendar: function () {
        myCalendar.month.innerHTML = '';
    },

    removeActiveClass: function () {
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].classList.remove('vcal-date--selected');
        }
    }
};
//button to call the set schedule function
btnSetSchedule.addEventListener('click', function () {
    modal.style.display = "block";
    close.onclick = function () {
        modal.style.display = "none";
    };
});

// function setSchedule()

function setSchedule()
{
    custName = document.getElementById("setName").value;
    appointmentTime = document.getElementById("setTime").value;
    var isNewAppointment = true;
    modal.style.display = "none";

    socket.emit('setDateArray',{

    });
    socket.on('getDateArray',function (data) {
        for(i = 0; i < data.result.length; i++){
            if(data.result[i]['custName'] === custName && data.result[i]['setDate'] === newDate && data.result[i]['time'] === appointmentTime)
            {
                isNewAppointment = false;
                document.getElementById("feedBackCal").innerHTML='This Appointment already exists';
            }
            // else
            // {
            //     alert("Appointment does not exist!!!");
            // }
        }
        if(isNewAppointment)
        {
            socket.emit('insertCal',{
                name: custName,
                date: currentDate,
                time: appointmentTime,
            });
            document.getElementById("feedBackCal").innerHTML = 'Appointment Added Successfully';
        }
        else {
            document.getElementById("feedBackCal").innerHTML='An appointment for this date and time already exists';
        }
    });

    var oldDates = JSON.parse((localStorage.getItem('dates'))) || [];

    var newdates = {
        storeDates: currentDate
    };

    oldDates.push(newdates);
    localStorage.setItem('dates', JSON.stringify(oldDates));
    console.log(JSON.parse((localStorage.getItem('dates'))));
    setTimeout(function(){
        window.location.reload(1);
    }, 5000);
}
