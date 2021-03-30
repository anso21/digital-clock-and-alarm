(function(){

    let clock = document.getElementById('clock'),
        switcher = document.querySelector('.indicator'), 
        style = document.querySelectorAll("link")[1],
        img = document.querySelector("#clock-img"),
        timeInput = document.querySelector("#time"),
        date = new Date();
    clock.textContent = date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds();

    let hour, 
        minutes,
        seconds,
        time = "",
        allDays = document.querySelectorAll(".days");

    /**
     * This function will help to get the date each second
     * it is recursive
     */

    function startClock(){

        setTimeout(() => {
            let date = new Date();
            hour = date.getHours();
            minutes = date.getMinutes();
            seconds = date.getSeconds();
            
            allDays[date.getDay() -1 ].classList.add("active"); //get the current day and active it on the clock
            // format hour, minutes and seconds
            hour = formate(hour);
            minutes = formate(minutes);
            seconds = formate(seconds);

            // displaying of the clock
            clock.textContent = hour + " : " + minutes + " : " + seconds
            startClock(); 

            // set alarm
            setAlarm();
        }, 1000);
    }

    /**
     * 
     * @param {Number} elementToFormat 
     * @returns {Number}
     */
    function formate(elementToFormat){
        if (elementToFormat < 10) {
            elementToFormat = "0" + elementToFormat;
        }
        return elementToFormat;
    }


    /**
     * Let's define alarm part
     */

    function setAlarm() {
        let index = time.indexOf(':');
        let aHours = parseInt(time.slice(0,index));
        let aMinutes = parseInt(time.slice(index+1));
        if (aHours == hour && aMinutes == minutes && seconds == 00) {
            notify();
        }
    }
            

    /**
     * Notify the alarm to user
     */
    function notify() {
        // Ask for the permission first
        if (Notification.permission !== 'granted')
            Notification.requestPermission();
        else {
            var notification = new Notification(hour + " : " + minutes, {
                icon: "assets/images/clock-light.png" ,
                body: "It\'s time !",
                vibrate: navigator.vibrate(100),
            });
        }
    }

    Notification.requestPermission();

    /**
     * Main Program
     */
    document.addEventListener("DOMContentLoaded", (e) => {
        // compatibility with the browser
        if (!Notification) {
            alert("Your brower does not support notification");
        }

        else if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        startClock()

        // Switch style 
        document.querySelector('.selector').addEventListener('click', (e) => {

            if (switcher.className === "indicator") {
                switcher.classList.add("indicate");
                switcher.setAttribute("src", "assets/images/dark.png");
                img.setAttribute("src", "assets/images/clock-light.png");
                style.href = "assets/css/style-dark.css";

            } else{
                switcher.classList.remove("indicate");
                switcher.setAttribute("src", "assets/images/sun.png");
                img.setAttribute("src", "assets/images/clock-dark.png");
                style.href = "assets/css/style-light.css";

            }
        });

        // get the alarm 
        timeInput.addEventListener("change", (e) => {
            time = e.target.value;
        });
    });

})()