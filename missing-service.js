var MissingService = {
    init: function() {
        $('#addMissingForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                MissingService.add(entity);

            }
        });
        MissingService.list();

    },

    list: function() {
        $.ajax({
            url: "rest/missing",
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
            $("#missing-list").html("");
            var html = "";
            
            
            for (let i = data.length - 1; i>=0; i--) {
                var dateStrP = data[i].last_time_seen;
                var dateP = new Date(dateStrP);
                var optionsP = { month: 'short', day: 'numeric', year: 'numeric' };
                var formattedDateP = dateP.toLocaleDateString('en-US', optionsP);
                if (data[i].status != "found") {
                    html += `
                    <div class="col-lg-3 col-md-6 col-sm-9" >
                        <a href="#" onclick="event.preventDefault(); MissingService.list_by_id(` + data[i].id + `)">
                            <div class="rounded bg-dark overflow-hidden pb-4">
                                <img class="img-fluid mb-4" style="float: left; width: 100%; height: 350px; object-fit: cover;" src="images/missing/`+data[i].image+`" alt="">
                                <div style="margin-left: 20px; margin-right: 20px;">
                                    <span class="text-info"><strong>MISSING</strong></span><br>
                                    <span class="text-light"><strong>Name:</strong> `+data[i].first_name + " " + data[i].last_name+`</span><br>
                                    <span class="text-light"><strong>Disappearance:</strong> `+data[i].last_place_seen+ " - " + formattedDateP + `</span><br>
                                    <span class="text-light"><strong>Contact:</strong> `+data[i].contact + `</span>
                                    <br>
                                </div>
                            </div>
                            </a>
                        </div>
                    `;
                }
                $("#missing-list").html(html);
            }
        }})
    },
    
    list_by_id: function(id) {
        $('.missing-button').attr('disabled', true);
        $('#missing-item').html('loading...');
        $.ajax({
            url: 'rest/missing/' + id,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(data) {
            $("#id").val(data.id);
            $("#status").val(data.status); 

            var dateStrS = data.last_time_seen;
            var dateS = new Date(dateStrS);
            var optionsS = { month: 'short', day: 'numeric', year: 'numeric' };
            var formattedDateS = dateS.toLocaleDateString('en-US', optionsS);

            var dateStr = data.date_of_birth;
            var date = new Date(dateStr);
            var options = { month: 'short', day: 'numeric', year: 'numeric' };
            var formattedDate = date.toLocaleDateString('en-US', options);

            
                var html = "";
            
                html += `
                
                        <img class="rounded w-50" src="images/missing/`+data.image+`" alt="Image"><br>
                        <p class="list-group-item-text"><strong>ID: </strong>` + data.id + `</p>
                        <p class="list-group-item-text"><strong>First Name: </strong>` + data.first_name + `</p>
                        <p class="list-group-item-text"><strong>Last Name: </strong>` + data.last_name + `</p>
                        <p class="list-group-item-text"><strong>Place and Date of Birth: </strong>` +data.place_of_birth+ ", " + formattedDate + `</p>
                        <p class="list-group-item-text"><strong>Disappearance: </strong> `+data.last_place_seen+ " - " + formattedDateS + `</p>
                        <p class="list-group-item-text"><strong>Contact: </strong>` + data.contact + `</p>
                        <p class="list-group-item-text"><strong>Description: </strong>` + data.description + `</p>
                        <p class="list-group-item-text"><strong>Physical Charasteristics: </strong>` + data.physical_chars + `</p>
                        
                    `;
            

            
            
            $("#exampleModalM").modal("show");
            $("#missing-item").html(html);
            $('.missing-button').attr('disabled', false);
            
        }});
    },


    get: function(id) {
        $('.missing-button').attr('disabled', true);
        $.ajax({
            url: 'rest/missing/' + id,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(data) {
            $("#id").val(data.id);
            $("#first_name").val(data.first_name);
            $("#last_name").val(data.last_name);
            $("#date_of_birth").val(data.date_of_birth);
            $("#place_of_birth").val(data.place_of_birth);
            $("#last_time_seen").val(data.last_time_seen);
            $("#last_place_seen").val(data.last_place_seen);
            $("#contact").val(data.contact);
            $("#description").val(data.description);
            $("#physical_chars").val(data.physical_chars);
            $("#image").val(data.image);
            $("#exampleModalM").show();
            $('.missing-button').attr('disabled', false);
        }});
    },

    add: function(missing) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/missing',
            type: 'POST',
            data: JSON.stringify(missing),
            dataType: "json",
            success: function(result) {
                console.log(result);
                $("#missing-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                MissingService.list();
                $("#addMissingModal").hide();
            }
        });
    },

    update: function() {
        $('.save-missing-button').attr('disabled', true);
        var missing = {};
        missing.id = $('#id').val();
        missing.first_name = $('#first_name').val();
        missing.last_name = $('#last_name').val();
        missing.image = $('#image').val();
        missing.description = $('#description').val();
        console.log($('#description').val());

        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/missing/' + $('#id').val(),
            type: 'PUT',
            data: JSON.stringify(missing),
            dataType: "json",
            success: function(result) {
                console.log(result);

                $("#exampleModalM").modal("hide");
                $("#missing-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                $('.save-missing-button').attr('disabled', false);
                MissingService.list();
            }
        });
    },

    delete: function(id) {
        $('.missing-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/missing/' + id,
            type: 'DELETE',
            success: function(result) {
                $("#missing-list").html();
                MissingService.list();
            }
        });
    }
}