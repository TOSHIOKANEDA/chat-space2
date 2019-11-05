$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : ""
                                var html = `<div class="message" message-num="${message.id}">
                                  <div class="message__talker">
                                    ${message.user_name}
                                    <div class="message__talker__date">
                                      ${message.created_at}
                                    </div>
                                  </div>

                                  <div class="message__text">
                                    ${message.content}
                                    <p>
                                      ${img}
                                    </p>
                                  </div>
                              </div>`
    
    return html;
  
  }



  
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
      $(".input-box__text").reset();
      scrollBottom();
    })

    .fail(function(){
      alert("エラー");
    })
    .always(function(data){
      $("#btn").prop('disabled', false)
      
    })
  })

})


