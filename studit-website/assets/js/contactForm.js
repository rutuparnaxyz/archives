function submitStudentDetails(){
    alert('s');
    
    var data = {
        "student_name": $('#student_name').val(),
        "student_phone": $('#student_phone').val(),
        "student_email": $('#student_email').val(),
        "student_class":$('#student_class').val(),
        "student_subject":$('#student_subject').val(),
        
      };

      var student_board = [];
            $.each($("input[name='student_board']:checked"), function(){
                student_board.push($(this).val());
            });
        data['student_board']=student_board;

      console.log('student data is', data)
}


function submitTeacherDetails(){

    var teacher_data = {
        "teacher_name": $('#teacher_name').val(),
        "teacher_email": $('#teacher_email').val(),
        "teacher_phone": $('#teacher_phone').val(),
        "teacher_gender": $('#teacher_gender').val(),
        "teacher_address": $('#teacher_address').val(),
        "teacher_city": $('#teacher_city').val(),
        "teacher_pin": $('#teacher_pin').val(),
        "teacher_exp": $('#teacher_exp').val(),
        "teacher_qualification": $('#teacher_qualification').val(),
        "teacher_exp": $('#teacher_exp').val(),

        
    }

    var tution_mode = [];
    $.each($("input[name='tutionmode']:checked"), function(){
        tution_mode.push($(this).val());
    });

    var teacher_board = [];
    $.each($("input[name='teacher_board']:checked"), function(){
        teacher_board.push($(this).val());
    });
    var teacher_class = [];
    $.each($("input[name='teacher_class']:checked"), function(){
        teacher_class.push($(this).val());
    });

    teacher_data['tution_mode'] = tution_mode;
    
    teacher_data['teacher_board'] = teacher_board;
    
    teacher_data['teacher_class'] = teacher_class;
    
    console.log('teacher form data is', teacher_data)
    
}



function submitContactus(){

    $("#backdrop-overlay").show();
            
      var data = {
          "name": $('#name').val(),
          "phoneNumber": $('#phone').val(),
          "userEmail": $('#email').val(),
          "message":$('#message').val()
        };
  
      
  
      $.ajax({
          type: "POST",  
          url: "https://protech-email.herokuapp.com/email",
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: 'application/json',  
  
      }).done(function(data) {

  
          })
      .fail(function() { 
  
       })
      .always(function(data) { 
       
          $(".loader").hide();
  
  
      console.log('aa',data)
  
      if(data.status == 200){
          alert("Request Submitted Successfully")
      }else{
        alert("Unable to Submit. Please Try agian..")
  
      }
  
  
  });
  
  }