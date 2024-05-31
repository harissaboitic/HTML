var ReportsService = {
    init: function() {
        $('#addReportsForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                ReportsService.add(entity);

            }
        });
        ReportsService.list();

    },

    list: function() {
        $.ajax({
            url: "rest/locked/reports",
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
            $("#reports-list").html("");
            var html = "";
            
            
            for (let i = data.length - 1; i>=0; i--) {
                if (data[i].status == "finished") {
                    var reportStatus = "success";
                } else if (data[i].status == "canceled") {
                    reportStatus = "danger";
                } else if (data[i].status == null) {
                    reportStatus = "info";
                } else if (data[i].status == "none") {
                    reportStatus = "info";
                } else if (data[i].status == "in-process") {
                    reportStatus = "secondary";
                } else {
                    reportStatus = "info";
                }
                html += `
                <tr>
                                <th scope="row">`+data[i].id+`</th>
                                <td>`+data[i].first_name+ " " +data[i].last_name+`</td>
                                <td>`+data[i].category+`</td>
                                <td><span class="badge badge-`+reportStatus+`">` + data[i].status + `</span></td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-circle reports-button" onClick="ReportsService.list_by_id(` + data[i].id + `)"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>
                `;
                $("#reports-list").html(html);
            }
    }})
    },

    list_by_id: function(id) {
        $('.reports-button').attr('disabled', true);
        $('#report-item').html('loading...');
        $.ajax({
            url: "rest/locked/reports/" + id,
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
            $("#id").val(data.id);
            $("#status").val(data.status); 


            if (data.status == "finished") {
                var reportStatus = "success";
            } else if (data.status == "canceled") {
                reportStatus = "danger";
            } else if (data.status == null) {
                reportStatus = "info";
            } else if (data.status == "none") {
                reportStatus = "info";
            } else if (data.status == "in-process") {
                reportStatus = "secondary";
            } else {
                reportStatus = "info";
            }

            var html = "";
            
                html += `
                
                        <p class="list-group-item-text"><strong>ID: </strong>` + data.id + `</p>
                        <p class="list-group-item-text"><strong>First Name: </strong>` + data.first_name + `</p>
                        <p class="list-group-item-text"><strong>Last Name: </strong>` + data.last_name + `</p>
                        <p class="list-group-item-text"><strong>Date of Birth: </strong>` + data.date_of_birth + `</p>
                        <p class="list-group-item-text"><strong>Email: </strong>` + data.email + `</p>
                        <p class="list-group-item-text"><strong>Phone: </strong>` + data.phone + `</p>
                        <p class="list-group-item-text"><strong>City: </strong>` + data.city + `</p>
                        <p class="list-group-item-text"><strong>Country: </strong>` + data.country + `</p>
                        <p class="list-group-item-text"><strong>ZIP: </strong>` + data.zip + `</p>
                        <p class="list-group-item-text"><strong>Report Category: </strong>` + data.category + `</p>
                        <p class="list-group-item-text"><strong>Report Description: </strong>` + data.description + `</p>
                        <p class="list-group-item-text"><strong>Status: </strong><span class="badge badge-`+reportStatus+`">` + data.status + `</span></p>

                        <div class="form-group">
                            <button type="submit" class="btn btn-circle btn-danger" onclick="ReportsService.delete(`+data.id+`)"><i class="fas fa-trash"></i></button>
                        </div>
                    `;
            
            $('#exampleModalR').modal("show");
            $("#report-item").html(html);
            $('.reports-button').attr('disabled', false);

    }});
    },

    list_by_search: function() {
        var search = document.getElementById('search-bar').value;
        
        // Check if search term is not empty
        if (search.trim() !== '') {
          $.ajax({
            url: "rest/locked/search_name/?name=" + search.trim(),
            type: "GET",
            beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
                $("#reports-list").html("");
                var html = "";
                $('#search-bar').val('');
                
                for (let i = data.length - 1; i>=0; i--) {
                    if (data[i].status == "finished") {
                        var reportStatus = "success";
                    } else if (data[i].status == "canceled") {
                        reportStatus = "danger";
                    } else if (data[i].status == null) {
                        reportStatus = "info";
                    } else if (data[i].status == "none") {
                        reportStatus = "info";
                    } else if (data[i].status == "in-process") {
                        reportStatus = "secondary";
                    } else {
                        reportStatus = "info";
                    }
                    html += `
                    <tr>
                                    <th scope="row">`+data[i].id+`</th>
                                    <td>`+data[i].first_name+ " " +data[i].last_name+`</td>
                                    <td>`+data[i].category+`</td>
                                    <td><span class="badge badge-`+reportStatus+`">` + data[i].status + `</span></td>
                                    <td>
                                        <button type="button" class="btn btn-warning btn-circle reports-button" onClick="ReportsService.list_by_id(` + data[i].id + `)"><i class="fas fa-edit"></i></button>
                                    </td>
                                </tr>
                    `;
                    $("#reports-list").html(html);
                }
            },
            error: function() {
                AdminService.logout();
            }
          });
        } else {
            ReportsService.list();
        }
      },

    get: function(id) {
        $('.reports-button').attr('disabled', true);
        $.ajax({
            url: "rest/locked/reports/" + id,
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
            $("#id").val(data.id);
            $("#first_name").val(data.first_name);
            $("#last_name").val(data.last_name);
            $("#date_of_birth").val(data.date_of_birth);
            $("#city").val(data.city);
            $("#country").val(data.country);
            $("#phone").val(data.phone);
            $("#email").val(data.email);
            $("#zip").val(data.zip);
            $("#category").val(data.category);
            $("#description").val(data.description);
            $("#status").val(data.status); 
            $("#exampleModalR").modal("show");
            $('.reports-button').attr('disabled', false);
        }});
    },


    update: function() {
        $('.save-reports-button').attr('disabled', true);
        var reports = {};
        reports.id = $('#id').val();
        reports.status = $('#status').val();
        
    
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/reports/' + $('#id').val(),
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            data: JSON.stringify(reports),
            dataType: "json",
            success: function(result) {
                setTimeout(function(){
                    $('#exampleModalR').modal("hide");
                    $('.modal-backdrop').remove();  
                    
                }, 500); // delay for 500ms
                $("#reports-list").html();
                $('.save-reports-button').attr('disabled', false);
                ReportsService.list();
            }
        });
    },

    delete: function(id) {
        $('.reports-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/reports/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(result) {
                $("#reports-list").html();
                ReportsService.list();
            }
        });
    }
}