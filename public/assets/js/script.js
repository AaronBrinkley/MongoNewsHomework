$(document).ready(function() {
    
    $(".save-form").on("submit", function(event) {
    event.preventDefault();

    var headline_id = $(this).children(".headline_id").val();
    console.log(headline_id)
    $.ajax({
        method: "PUT",
        url: "/headlines/" + headline_id
    }).then(function(data) {
       
        location.reload();
    })

    })

    $(".Save-Delete-Form").on("submit", function(event) {
        event.preventDefault();
    
        var Savedheadline_id = $(this).children(".Savedheadline_id").val();
        console.log(Savedheadline_id)
        $.ajax({
            method: "DELETE",
            url: "/headlines/" + Savedheadline_id
        }).then(function(data) {
           
            location.reload();
        })
    
        })



        // $(".Note-Delete-Form").on("#Note-Button", function(event) {
        //     event.preventDefault();
        
        //     modal.style.display = "block";
        
        //     })



            // $(document).on("#savenote", function(event) {
            //     event.preventDefault();
                
            //     var Savedheadline_id = $(this).children(".Savedheadline_id").val();
              
                
            //     $.ajax({
            //       method: "POST",
            //       url: "/headlines/" + Savedheadline_id,
            //       data: {
                  
            //         title: $("#titleinput").val(),
                   
            //         body: $("#bodyinput").val()
            //       }
            //     })
                 
            //       .then(function(data) {
                   
            //         console.log(data);
                   
            //         $("#notes").empty();
            //       });
              
               
            //     $("#titleinput").val("");
            //     $("#bodyinput").val("");
            //   });




            console.log("Hello")
             
    $(".Note-Form").on("click", "#Note-Button", function(event) {
     event.preventDefault();
     $("#notes").empty();
    console.log("button works")
    // $('#myModal').modal('toggle')
    
   
    var Savedheadline_id = $(this).children(".Savedheadlinenote_id").val();

    console.log(Savedheadline_id)
  
  
    $.ajax({
      method: "GET",
      url: "/headlines/" + Savedheadline_id
    })
     
      .then(function(data) {
          
        console.log(data);
      
        $("#notes").append("<h2>" + data.title + "</h2>");
      
        $("#notes").append("<input id='titleinput' name='title' >");
     
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      
        $("#notes").append("<button class='btn btn-default' data-id='" + data._id + "' id='savenote'>Save Note</button>");

        
  
     
        if (data.note) {
         
          $("#titleinput").val(data.note.title);
         
          $("#bodyinput").val(data.note.body);
        }
      });
  });



  
$(document).on("click", "#savenote", function() {
    
    var noteId = $(this).attr("data-id");
  
    
    $.ajax({
      method: "POST",
      url: "/headlines/" + noteId,
      data: {
       
        title: $("#titleinput").val(),
        
        body: $("#bodyinput").val()
      }
    })
      
      .then(function(data) {
        
        console.log(data);
       
        $("#notes").empty();
      });
  
    
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  



});
