var MissingServiceIndex = {
    init: function() {
        $('#addMissingForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                MissingServiceIndex.add(entity);

            }
        });
        MissingServiceIndex.list();

    },

    list: function() {
        $.ajax({
            url: 'rest/missing',
            type: 'GET',
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
                html += `
                <tr>
                                <th scope="row">`+data[i].id+`</th>
                                <td>`+data[i].first_name+" "+data[i].last_name+`</td>
                                <td><img style="width: 50px; height: 40px;" src="images/missing/`+data[i].image+`" alt=""></td>
                                <td>`+data[i].last_place_seen+ " - " + formattedDateP + `</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-primary missing-button" onClick="MissingServiceIndex.get(` + data[i].id + `)"><i class="fas fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger missing-button" onClick="MissingServiceIndex.delete(` + data[i].id + `)"><i class="fas fa-trash"></i></button>
                                  </div>
                                </td>                            
                            </tr>
                `;
                $("#missing-list").html(html);
            }
        }})
    },

    
    
    list_by_id: function(id) {
        $('.missing-button').attr('disabled', true);
        $('#missing-item').html('loading...');
        $.ajax({
            url: "rest/missing/" + id,
            type: "GET",
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

            if (data.status == "found") {
                var status = "success";
            }

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

    list_by_search: function() {
        var search = document.getElementById('search-bar').value;
        
        // Check if search term is not empty
        if (search.trim() !== '') {
          $.ajax({
            url: "rest/search_name_descm/?name_desc=" + search.trim(),
            type: "GET",
            beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
                $("#missing-list").html("");
                var html = "";
                $('#search-bar').val('');
                
                for (let i = data.length - 1; i>=0; i--) {
                    var dateStrP = data[i].last_time_seen;
                    var dateP = new Date(dateStrP);
                    var optionsP = { month: 'short', day: 'numeric', year: 'numeric' };
                    var formattedDateP = dateP.toLocaleDateString('en-US', optionsP);
                    html += `
                    <tr>
                                    <th scope="row">`+data[i].id+`</th>
                                    <td>`+data[i].first_name+" "+data[i].last_name+`</td>
                                    <td><img style="width: 50px; height: 40px;" src="images/missing/`+data[i].image+`" alt=""></td>
                                    <td>`+data[i].last_place_seen+ " - " + formattedDateP + `</td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-primary missing-button" onClick="MissingServiceIndex.get(` + data[i].id + `)"><i class="fas fa-edit"></i></button>
                                        <button type="button" class="btn btn-danger missing-button" onClick="MissingServiceIndex.delete(` + data[i].id + `)"><i class="fas fa-trash"></i></button>
                                      </div>
                                    </td>                            
                                </tr>
                    `;
                    $("#missing-list").html(html);
                }
            },
            error: function() {
                AdminService.logout();
            }
          });
        } else {
            MissingServiceIndex.list();
        }
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
            $("#status").val(data.status);
            $("#exampleModalM").modal("show");
            $('.missing-button').attr('disabled', false);
        }});
    },

    add: function(missing) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/missing',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            data: JSON.stringify(missing),
            dataType: "json",
            success: function(result) {
                console.log(result);
                $("#missing-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                MissingServiceIndex.list();
                setTimeout(function(){
                    $("#addMissingModal").hide();
                    $('.modal-backdrop').remove();  
                    $('#addMissingModal input[name="first_name"]').val("");
                    $('#addMissingModal input[name="last_name"]').val("");
                    $('#addMissingModal textarea[name="description"]').val("");
                    $('#addMissingModal input[name="date_of_birth"]').val("");
                    $('#addMissingModal input[name="place_of_birth"]').val("");
                    $('#addMissingModal input[name="last_time_seen"]').val("");
                    $('#addMissingModal input[name="last_place_seen"]').val("");
                    $('#addMissingModal input[name="contact"]').val("");
                    $('#addMissingModal input[name="physical_chars"]').val("");
                    $('#addMissingModal input[name="image"]').val("");
                    $('#addMissingModal input[name="status"]').val("");
                }, 500); // delay for 500ms
                  
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
        missing.date_of_birth = $('#date_of_birth').val();
        missing.place_of_birth = $('#place_of_birth').val();
        missing.last_place_seen = $('#last_place_seen').val();
        missing.last_time_seen = $('#last_time_seen').val();
        missing.contact = $('#contact').val();
        missing.physical_chars = $('#physical_chars').val();
        missing.status = $('#status').val();
        missing.description = $('#description').val();

        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/missing/' + $('#id').val(),
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
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
                MissingServiceIndex.list();
            }
        });
    },

    delete: function(id) {
        $('.missing-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/missing/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(result) {
                $("#missing-list").html();
                MissingServiceIndex.list();
            }
        });
    }
}