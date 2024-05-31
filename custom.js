$(document).ready(function() {

    $("main#spapp > section").height($(document).height() - 60);
  
    var app = $.spapp({defaultView: "dashboard"}); // initialize
  
    // define routes
    app.route({view: 'dashboard', load: 'dashboard.html' });
    app.route({view: 'reports', load: 'admin-reports.html' });
    app.route({view: 'wanted', load: 'admin-wanted.html' });
    app.route({view: 'missing', load: 'admin-missing.html' });
    app.route({view: 'news', load: 'admin-news.html' });
    app.route({view: 'newsletter', load: 'admin-newsletter.html' });
  
    // run app
    app.run();
  
  });
  