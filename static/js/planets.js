const card_template = UnderscoreTemplate(
    '<div class="col-sm-3" style="padding:5px">\
        <div class="card">\
        <img class="card-img-top" src="<%- image %>" >\
            <div class="card-body">\
                <div class="card-title">\
                    <h4 class="mt-2">  <%- name %></h4>\
                </div>\
            </div>\
        </div>\
    </div>'
);



$(document).ready(function () {

    var page = 1;

    var targetDiv = document.getElementById("planets");
    targetDiv.innerHTML = "";
    $.get('https://whispering-caverns-86180.herokuapp.com/get_planets?', { page: page }, function (data) {
        for (var i = 0; i < data.data.length; i++) {
            image = data.images.filter((image) => image.name === data.data[i].name)[0];
            data.data[i].image = image.url;
            targetDiv.innerHTML += card_template(data.data[i])
        }
    });

    $('#next').click(function () {
        if (page < 7) {
            page = page + 1;
        
            var targetDiv = document.getElementById("planets");
            targetDiv.innerHTML = "";
            $.get('https://whispering-caverns-86180.herokuapp.com/get_planets?', { page: page }, function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    image = data.images.filter((image) => image.name === data.data[i].name)[0];
                    data.data[i].image = image.url;
                    targetDiv.innerHTML += card_template(data.data[i])
                }
            });
        }
    });

    $('#previous').click(function () {
        if (page >1 ) {
            page = page - 1;
    
            var targetDiv = document.getElementById("planets");
            targetDiv.innerHTML = "";
            $.get('https://whispering-caverns-86180.herokuapp.com/get_planets?', { page: page }, function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    image = data.images.filter((image) => image.name === data.data[i].name)[0];
                    data.data[i].image = image.url;
                    targetDiv.innerHTML += card_template(data.data[i])
                }
            });
        }
    });

});

var search = function () {
    var nav = document.getElementById("pager");
    var targetDiv = document.getElementById("planets");
    search_item = $("#search").val()
    targetDiv.innerHTML = "";
    nav.innerHTML = "<h4 style='color:white'>Search Results</h4>";
    $.get('https://whispering-caverns-86180.herokuapp.com/search_planets/', { search: search_item }, function (data) {
        for (var i = 0; i < data.data.length; i++) {
            image = data.images.filter((image) => image.name === data.data[i].name)[0];
            data.data[i].image = image.url;
            targetDiv.innerHTML += card_template(data.data[i]);
        }
    });
};