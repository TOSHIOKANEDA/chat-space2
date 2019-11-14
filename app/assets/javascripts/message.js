$(document).on("turbolinks:load",function(){
      var buildHTML = function(message){

        var content = message.content ? `${ message.content }` : "";
        var image = message.image == null ? "" : `<img src= ${ message.image } class="lower-message__image">` ;
        var html = `<div class="message" data-id= "${ message.id }" >
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${ message.user_name }
                <div class="upper-message__data">
                  ${ message.created_at }
                </div>
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${ content }
              </p>
              ${ image }
            </div>
          </div>`
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
      $("#new_message")[0].reset()
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


