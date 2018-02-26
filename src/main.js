'use strict';

require('./assets/scss/main.scss');

// XMLHttpRequest wrapper using callbacks
function request(obj, successHandler, errorHandler) {
    let xhr = new XMLHttpRequest();
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
        Object.keys(obj.headers).forEach(function(key) {
            xhr.setRequestHeader(key, obj.headers[key]);
        });
    }
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            successHandler(xhr.response);
        } else {
            errorHandler(xhr.statusText);
        }
    };
    xhr.onerror = () => {
        errorHandler(xhr.statusText);
    };
    xhr.send(obj.body);
}

request({url:"src/data/athletes.json"},
    function(data) {
        let athletes = JSON.parse(data);
        let html = "";

        athletes.forEach(function(athlete){
            let races = athlete.races;

            races.forEach(function(item, index, array) {
                console.log(item);
            })
            


            html += "<div class='athlete'><img src='" + athlete.picture + "'/>" + 
            "<p>" + athlete.firstName + " " + athlete.lastName + "</p>" + "<p>" + athlete.club + 
                "</p><div class='races'>" + races + "</div></div>";

        });
        document.getElementById("app").innerHTML = html;
    },
    function(error) {
        console.log(error);
    }
);

//var appContainer = document.querySelector('#app');

//appContainer.innerHTML = '<div class="main-component"><h1 class="main-component__title">Welcome!</h1></div>';
