var NewsServiceIndex = {
    init: function() {
        NewsServiceIndex.list();

    },

    list: function() {
        $.ajax({
            url: "rest/news",
            type: "GET",
            success: function(data) {
                $("#news-list").html("");
                var html = "";
                
                data.sort(function(a, b) {
                    var dateA = new Date(a.date);
                    var dateB = new Date(b.date);
                    return dateA - dateB;
                });

                for (let i = data.length - 1; i>=0; i--) {
                    var dateStr = data[i].date;
                    var date = new Date(dateStr);
                    var options = { month: 'long', day: 'numeric', year: 'numeric' };
                    var formattedDate = date.toLocaleDateString('en-US', options);

                    if (i == data.length -1) {
                        html += `
                        <div class="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                            <a href="#" onclick="event.preventDefault(); NewsServiceIndex.list_by_id(` + data[i].id + `)">
                                <div class="team-item text-center rounded bg-dark overflow-hidden pb-4">
                                    <img class="img-fluid mb-4" style="float: left; width: 100%; height: 250px; object-fit: cover;" src="images/news/`+data[i].image+`" alt="">
                                    <h4 class="text-white" style="margin-left: 10px; margin-right: 10px;"><span class="text-danger"><strong>BREAKING </strong></span>`+data[i].title+`</h5>
                                    <span class="text-light text-center"><i>`+formattedDate+`</i></span>
                                </div>
                            </a>
                        </div>
                        `;
                    } else if (i == data.length -2) {
                        html += `
                        <div class="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <a href="#" onclick="event.preventDefault(); NewsServiceIndex.list_by_id(` + data[i].id + `)">
                                <div class="team-item text-center rounded bg-white overflow-hidden pb-3">
                                    <img class="img-fluid mb-4" style="float: left; width: 100%; height: 250px; object-fit: cover;" src="images/news/`+data[i].image+`" alt="">
                                    <h5 class="text-dark" style="margin-left: 10px; margin-right: 10px;">`+data[i].title+`</h5>
                                    <span class="text-dark"><i>`+formattedDate+`</i></span>
                                </div>
                            </a>
                        </div>
                        `;
                    } else {
                        html += `
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <a href="#" onclick="event.preventDefault(); NewsServiceIndex.list_by_id(` + data[i].id + `)">
                                <div class="team-item text-center rounded bg-white overflow-hidden pb-3">
                                    <img class="img-fluid mb-4" style="float: left; width: 100%; height: 250px; object-fit: cover;" src="images/news/`+data[i].image+`" alt="">
                                    <h5 class="text-dark" style="margin-left: 10px; margin-right: 10px;">`+data[i].title+`</h5>
                                    <span class="text-dark"><i>`+formattedDate+`</i></span>
                                </div>
                            </a>
                        </div>
                        `;
                    }
                    $("#news-list").html(html);
                }
            }
        })
    },

    list_by_id: function(id) {
        $('.news-button').attr('disabled', true);
        $('#news-item').html('loading...');
        $.ajax({
            url: 'rest/news/' + id,
            type: 'GET',
            
            success: function(data) {
                $("#id").val(data.id);

                var dateStr = data.date;
                var date = new Date(dateStr);
                var options = { month: 'short', day: 'numeric', year: 'numeric' };
                var formattedDate = date.toLocaleDateString('en-US', options);

                
                    var html = "";
                
                    html += `
                    
                            <div style="width: 100%;">
                                <img style="width: 100%; max-height: 400px; object-fit: cover;" class="rounded" src="images/news/`+data.image+`" alt="Image"><br>
                            </div><br>
                            <p style="font-size: 12px;" class="list-group-item-text"><i>` + formattedDate + `</i></p>
                            <p style="font-size: 30px;" class="list-group-item-text"><strong>` +data.title+ `</strong></p>
                            <p class="list-group-item-text">`+data.description+`</p>
                            
                        `;
                

                
                
                $("#exampleModalN").modal("show");
                $("#news-item").html(html);
                $('.news-button').attr('disabled', false);
                
            }
        });
    },


    get: function(id) {
        $('.news-button').attr('disabled', true);
        $.get('rest/news/' + id, function(data) {
            $("#id").val(data.id);
            $("#title").val(data.title);
            $("#image").val(data.image);
            $("#description").val(data.description);
            $("#date").val(data.date);
            $("#exampleModal").modal("show");
            $('.news-button').attr('disabled', false);
        });
    }


}