const card_template = UnderscoreTemplate(
    '<div class="col-sm-3" style="padding:5px">\
        <div class="card">\
        <img class="card-img-top" src="<%- image %>" >\
            <div class="card-body">\
                <div class="card-title">\
                    <h4 class="mt-2"> Star Wars Episode <%-episode_id%>: <br><%- title %></h4>\
                </div>\
            </div>\
        </div>\
    </div>'
);



$(document).ready(function () {
    var targetDiv = document.getElementById("movies");
    targetDiv.innerHTML = "";
    $.get('https://whispering-caverns-86180.herokuapp.com/get_movies?', function (data) {
        for (var i = 0; i < data.data.length; i++) {
            image = data.images.list[i];
            data.data[i].image = image;
            targetDiv.innerHTML += card_template(data.data[i])
        }
    });
});