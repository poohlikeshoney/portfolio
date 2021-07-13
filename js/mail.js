
$(document).ready(function() {
  emailjs.init("user_wjbCc5L30EGJW5SiD6Oy0");

  $('input[name=submit]').click(function(){       	 
        
    var templateParams = {	
      name: $('input[name=name]').val(),
      email : $('input[name=email]').val(),
      phone: $('input[name=phone]').val(), 
      message : $('textarea[name=message]').val()
    };
                  
    emailjs.send('jiyoung', 'template_u4k7pzn', templateParams)

      .then(function(response) {
          alert('메일이 성공적으로 발송되었습니다! 빠른 시일 내에 확인 후 답장 드리도록 하겠습니다. 감사합니다.', response.status, response.text);
        }, function(error) {
          alert('FAILED...', error);
        });
  });
});  
