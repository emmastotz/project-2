$(document).ready(function() {
  $(function () {
    $(".student-schedule").hide();
    $(".classes-display").hide();
  
    $(".subject-btn").on("click", function(event) {
      $("#classes-list").empty();
      let id = $(this).data("id");
      var subjectName = $(this).data("name").trim().replace(/\s/g, '');
  
      $.ajax("/class/" + id, {
        type: "GET"
      }).then(function(result) {
        $(".classes-display").show();
        
        for (var i in result){
          let className = result[i].number_title;
          let startTime = result[i].start_time;
          let endTime = result[i].end_time;
          let dayCode = result[i].day_code;
          let idValue = result[i].id;
          let time = dayCode + ": " + startTime + " - " + endTime;
          let classDiv = $("<li>");
          classDiv.addClass("list-group-item");
          classDiv.append("<strong>" + className + "</strong>");
          classDiv.append("<br>");
          classDiv.append(time);

          let btn = $("<button>");
          btn.addClass("btn btn-primary btn-sm add-class");
          btn.attr("type","submit");
          btn.text("Add to Schedule");
          btn.attr("data-id",idValue);
  
          $("#classes-list").append(classDiv);
          $("#classes-list").append(btn);
        };
      }).fail(function(err){
        console.log(err);
      });
    });
// ====================================================
    $(document).on("click", ".add-class", function(){
      $(".student-schedule").show();
      let id = $(this).data("id");
      console.log(id);
      
      var scheduleState = {
        inSchedule: true
      };

      console.log(scheduleState);
      $.ajax("/classes/update/" + id, {
        type: "PUT",
        data: scheduleState
      }).done(function(res){
        
        console.log("We are here: " + res);
        $.ajax("/schedule/" + id, function() {
          type: "GET"
        }).then(function(res){

           //FUNCTION
          var appendToTimetable = function (name,day, startTimeHour, startTimeMin, endTimeHour, endTimeMin) {
            timetable.addEvent(name, day, new Date(2015,7,17, startTimeHour, startTimeMin), new Date(2015,7,17,endTimeHour,endTimeMin)); 
            renderer.draw('.timetable');
          };

          for(var i = 0; i<res.length; i++) {
            if(res[i].inSchedule===true){
              var startTimeArray = res[i].start_time.split(":");
              console.log(typeof(startTimeArray));
              console.log(startTimeArray);
              var endTimeArray = res[i].end_time.split(":");
              console.log(endTimeArray);

              var name = res[i].subject_code + " " + res[i].number_title;
              console.log("this is the response we are looping through"+ JSON.stringify(res));

              if (res[i].day_code==="MWF"){
                console.log("Is the mwf if statement working?  YES")
                appendToTimetable(name, "Monday",  startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);
                appendToTimetable(name, "Wednesday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);
                appendToTimetable(name, "Friday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);
                

              } else if (res[i].day_code==="TR"){
                appendToTimetable(name, "Thursday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);
                appendToTimetable(name, "Tuesday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);

              } else if (res[i].day_code==="MW"){
                appendToTimetable(name, "Monday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);
                appendToTimetable(name, "Wednesday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);

              } else if (res[i].day_code==="W"){
                appendToTimetable(name, "Wednesday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);

              } else if(res[i].day_code==="T"){
                appendToTimetable(name, "Tuesday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);

              } else if(res[i].day_code==="R"){
                appendToTimetable(name, "Thursday", startTimeArray[0], startTimeArray[1], endTimeArray[0], endTimeArray[1]);
              }
            }
          }
          renderer.draw('.timetable');
        });
      }).fail(function(err){
        console.log(err);
      });
    });

    // $(".not-in-schedule").on("click", function(event) {
    //   var id = $(this).data("id");
    //   console.log(id);
  
    //   var scheduleState = {
    //     inSchedule: true
    //   };
  
    //   $.ajax("/classes/update/" + id, {
    //     type: "PUT",
    //     data: scheduleState
    //   }).then(function () {
    //     console.log("Added class #", id);
    //     location.reload();
    //   }).fail(function(err){
    //     console.log(err);
    //   });
    // });
  
    // $(".in-schedule").on("click", function (event) {
    //   var id = $(this).data("id");
    //   console.log(id);
  
    //   $.ajax("/classes/delete/" + id, {
    //     type: "DELETE"
    //   }).then(function () {
    //     console.log("Deleted burger #", id);
    //     location.reload();
    //   }).fail(function(err){
    //     console.log("Error: " + err);
    //   });
    // });
  });
});

