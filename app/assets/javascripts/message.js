$(document).on("turbolinks:load",function(){
      var buildHTML = function(message){

        if (message.content && message.image.url) {
          var html = `<div class="message" data-id=` + message.id + `>` +
            `<div class="upper-message">` +
              `<div class="upper-message__user-name">` +
                message.user_name +
                `<div class="upper-message__date">` +
                  message.created_at +
                `</div>` +
              `</div>` +
            `</div>` +
            `<div class="lower-message">` +
              `<p class="lower-message__content">` +
                message.content +
              `</p>` +
              `<img src="` + message.image.url + `" class="lower-message__image" />` +
            `</div>` +
          `</div>`
    } else if (message.content){
      var html = `<div class="message" data-id=` + message.id + `>` +
                  `<div class="upper-message">` +
                    `<div class="upper-message__user-name">` +
                      message.user_name +
                      `<div class="upper-message__data">` +
                      message.created_at +
                    `</div>` +
                    `</div>` +
                  `</div>` +
                  `<div class="lower-message">` +
                    `<p class="lower-message__content">` +
                      message.content +
                    `</p>` +
                  `</div>` +
                `</div>`
    } else if (message.image.url) {
      var html = `<div class="message" data-id=` + message.id + `>` +
                      `<div class="upper-message">` +
                        `<div class="upper-message__user-name">` +
                          message.user_name +
                          `<div class="upper-message__data">` +
                            message.created_at +
                          `</div>` +
                        `</div>` +
                      `</div>` +
                      `<div class="lower-message">` +
                        `<img src="` + message.image.url + `" class="lower-message__image" />` +
                      `</div>` +
                  `</div>`
    };
    return html;
  };



  
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }
      $(".messages").append(html)
      $(".input-box__text").val("")
      scrollBottom();
    })

    .fail(function(){
      alert("エラー");
    })
    .always(function(data){
      $("#btn").prop('disabled', false)
      
    })
  });

  var reloadMessages = function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('id')

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(){
        alert("エラー");
      })
    }
  }
  setInterval(reloadMessages, 5000);
});


