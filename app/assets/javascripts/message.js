$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="main-message__chat-list" data-message-id="${message.id}">
          <ul class="main-message__chat-list__entrant">
            ${message.user_name}
            <li class="main-message__chat-list__date">
              ${message.created_at}
            </li>
          </ul>
          <div class="main-message__chat-list__content">
            <p class="main-message__chat-list__content-text">
              ${message.content}
            </p>
            <img class="main-message__chat-list__content-image" src=${message.image} >
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="main-message__chat-list" data-message-id="${message.id}">
          <ul class="main-message__chat-list__entrant">
            ${message.user_name}
              <li class="main-message__chat-list__date">
                ${message.created_at}
              </li>
          </ul>
          <div class="main-message__chat-list__content">
            <p class="main-message__chat-list__content-text">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
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
      $('.messages').append(html);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    var last_message_id = $('.main-message__chat-list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
        $("#new_message")[0].reset();
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});