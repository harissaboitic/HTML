var NewsService = {
    init: function() {
        $('#addNewsForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                NewsService.add(entity);

            }
        });
        NewsService.list();

    },

    list: function() {
        $.ajax({
            url: "rest/news",
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
                $("#news-list").html("");
                var html = "";
    
                data.sort(function(a, b) {
                    var dateA = new Date(a.date);
                    var dateB = new Date(b.date);
                    return dateA - dateB;
                });
                
                for (let i = data.length-1; i>=0; i--) {
                    html += `
                    <tr>
                                    <th scope="row">`+data[i].id+`</th>
                                    <td>`+data[i].title+`</td>
                                    <td>`+data[i].date+`</td>
                                    <td><img style="width: 50px; height: 40px;" src="images/news/`+data[i].image+`" alt=""></td>
                                    <td>`+data[i].description+`</td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-primary news-button" onClick="NewsService.get(` + data[i].id + `)"><i class="fas fa-edit"></i></button>
                                        <button type="button" class="btn btn-danger news-button" onClick="NewsService.delete(` + data[i].id + `)"><i class="fas fa-trash"></i></button>
                                      </div>
                                    </td>
                                  </tr>
                    `;
                }
                $("#news-list").html(html);
            },
            error: function () {
              AdminService.logout();
            }
          });
    },

    list_by_search: function() {
        var search = document.getElementById('search-bar').value;
        
        // Check if search term is not empty
        if (search.trim() !== '') {
          $.ajax({
            url: "rest/search_title/?title=" + search.trim(),
            type: "GET",
            beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
            success: function(data) {
              $("#news-list").html("");
              var html = "";
              $('#search-bar').val('');

              for (let i = data.length - 1; i >= 0; i--) {
                html += `
                <tr>
                  <th scope="row">${data[i].id}</th>
                  <td>${data[i].title}</td>
                  <td>${data[i].date}</td>
                  <td><img style="width: 50px; height: 40px;" src="images/news/${data[i].image}" alt=""></td>
                  <td>${data[i].description}</td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-primary news-button" onClick="NewsService.get(${data[i].id})"><i class="fas fa-edit"></i></button>
                      <button type="button" class="btn btn-danger news-button" onClick="NewsService.delete(${data[i].id})"><i class="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
                `;
              }
        
              $("#news-list").html(html);
            },
            error: function() {
                AdminService.logout();
            }
          });
        } else {
            NewsService.list();
        }
      },
      


    get: function(id) {
        $('.news-button').attr('disabled', true);
        $.ajax({
            url: 'rest/news/' + id,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(data) {
            $("#id").val(data.id);
            $("#title").val(data.title);
            $("#image").val(data.image);
            $("#description").val(data.description);
            $("#date").val(data.date);
            $("#exampleModal").modal("show");
            $('.news-button').attr('disabled', false);
        }});
    },

    add: function(news) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/news',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            data: JSON.stringify(news),
            dataType: "json",
            success: function(result) {
                $("#news-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `)
                NewsService.list();
                setTimeout(function(){
                    $('#addNewsModal').hide();
                    $('.modal-backdrop').remove();                    
                    $('#addNewsModal input[name="title"]').val("");
                    $('#addNewsModal textarea[name="description"]').val("");
                    $('#addNewsModal input[name="image"]').val("");
                    $('#addNewsModal input[name="date"]').val("");
                }, 500); // delay for 500ms
                
            }
        });
    },

    update: function() {
        $('.save-news-button').attr('disabled', true);
        var news = {};
        news.id = $('#id').val();
        news.title = $('#title').val();
        news.image = $('#image').val();
        news.description = $('#description').val();
        news.date = new Date($('#date').val()).toISOString().slice(0, 19).replace('T', ' '); // convert to ISO 8601 datetime format
    
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/news/' + $('#id').val(),
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            data: JSON.stringify(news),
            dataType: "json",
            success: function(result) {
                $("#exampleModal").modal("hide");
                $("#news-list").html();
                $('.save-news-button').attr('disabled', false);
                NewsService.list();
            }
        });
    },

    delete: function(id) {
        $('.news-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/news/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(result) {
                $("#news-list").html();
                NewsService.list();
            }
        });
    }
}