var ImportanceID;
var Cardtodo = [];

$(document).ready(function () {
    $("#SerachInput").keyup(function () {
            $("tbody").html("");
        
    var Search = $(this).val();
    if (Search == null) {
        Search="";
    }
            console.log(Search);
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "../Home/GetTodo",
                data: { Search: Search },
                success: function (data) {
                    console.log(data.data);
                    //var archieve = JSON.parse(data);
                    if (data.data.length) {

                        for (var i = 0; i < data.data.length; i++) {

                            Cardtodo = '<div class="card cardstyle inputstyle " id="cardid' + data.data[i].TodoID + '">';
                            Cardtodo += '<div class="card-body">';
                            Cardtodo += '<div class="form-group row">';
                            Cardtodo += '<div class="col-sm-10">';
                            Cardtodo += '<input class="card-title Titleinputfield inputstyle cardinputtitle" id="titleid' + data.data[i].TodoID + '" type="text"  value="' + data.data[i].Title + '" readonly>';
                            Cardtodo += '</div>';
                            Cardtodo += '</div>';
                            Cardtodo += '<div class="form-group row">';
                            Cardtodo += '<label  class="col-sm-2 col-form-label">Category</label>';
                            Cardtodo += '<div class="col-sm-10">';
                            Cardtodo += '<input type="text" class="catinputfield inputstyle cardinputs" id="catid' + data.data[i].TodoID + '" value="' + data.data[i].Category + '" readonly>';
                            Cardtodo += '</div>';
                            Cardtodo += '</div>';
                            Cardtodo += '<div class="form-group row">';
                            Cardtodo += '<label class="col-sm-2 col-form-label">DueDate</label>';
                            Cardtodo += '<div class="col-sm-10">';
                            Cardtodo += '<input type="date" class="dateinputfield inputstyle cardinputs" id="duedateid' + data.data[i].TodoID + '" value="' + data.data[i].DueDate + '" readonly>';
                            Cardtodo += '</div>';
                            Cardtodo += '</div>';
                            Cardtodo += '<div class="form-group row">';
                            Cardtodo += '<label class="col-sm-2 col-form-label">Estimate</label>';
                            Cardtodo += '<div class="col-sm-10">';
                            Cardtodo += '<input type="text" class="Estimateinputfield inputstyle cardinputs" id="estimateid' + data.data[i].TodoID + '" value="' + data.data[i].Estimate + '" readonly>';
                            Cardtodo += '</div>';
                            Cardtodo += '</div>';
                            Cardtodo += '<div class="form-group row">';
                            Cardtodo += '<label class="col-sm-2 col-form-label">Importance</label>';
                            Cardtodo += '<div class="col-sm-10">';
                            Cardtodo += '<input type="text" class="Impoinputfield inputstyle cardinputs" id="impoid' + data.data[i].TodoID + '" value="' + data.data[i].ImportanceName + '" readonly>';
                            Cardtodo += '</div>';
                            Cardtodo += '</div>';
                            Cardtodo += '</div></div>';
                            $("tbody").append(Cardtodo);

                            if ($("#impoid" + data.data[i].TodoID).val() == "Hight") {
                                $("#impoid" + data.data[i].TodoID).css("background-color", "#DC3545");
                            } else if ($("#impoid" + data.data[i].TodoID).val() == "Medium") {
                                $("#impoid" + data.data[i].TodoID).css("background-color", "#FE913E");
                            } else {
                                $("#impoid" + data.data[i].TodoID).css("background-color", "#39AC95");
                            }

                        }
                    }

                },
                error: function () {
                    alert("Error");
                }
            });
        
    });
    if ($(".Impoinputfield ").val() == "Hight") {
        $(".Impoinputfield ").css("background-color", "#DC3545");
    }


    //prevent user from picking past date
    var CurrentDate = moment().format("YYYY-MM-DD");
    $("#InputDate").attr("min", CurrentDate);
    //End
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "../Home/GetImportance",
        success: function (data) {
            var archieve = JSON.parse(data);
            if (archieve.length) {
                for (var i = 0; i < archieve.length; i++) {
                    $("#InputImportance").append($('<option>', { value: archieve[i].ImportanceId, text: archieve[i].ImportanceName }));
                }
            }
        },
        error: function () {
            alert("Error");
        }
    });
    $("tbody").on("click", ".cardstyle", function () {
        
       
        var CardID = $(this).attr('id').replace("cardid", "");
        $("#titleid" + CardID).attr("readonly", false);
        $("#catid" + CardID).attr("readonly", false);
        $("#duedateid" + CardID).attr("readonly", false);
        $("#estimateid" + CardID).attr("readonly", false);
       
    });
    $("tbody").on("keypress", ".cardstyle", function (e) {
    
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            var CardID = $(this).attr('id').replace("cardid", "");
           
           var title= $("#titleid" + CardID).val();
           var category= $("#catid" + CardID).val();
           var duedate= $("#duedateid" + CardID).val();
            var estimate = $("#estimateid" + CardID).val();
            
           
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "../Home/EditTodo",
                data: { TodoID: CardID, Title: title, Category: category, DueDate: duedate, Estimate: estimate },
                success: function (data) {

                    $("#titleid" + CardID).attr("readonly", true);
                    $("#catid" + CardID).attr("readonly", true);
                    $("#duedateid" + CardID).attr("readonly", true);
                    $("#estimateid" + CardID).attr("readonly", true);
                },
                error: function () {
                    alert("Error");
                }
            });
            

           
        }
    });

});

function selectimportance(data) {
    ImportanceID = data;
}
function AddTodoData() {
    var Title = $("#InputTitle").val();
    var Category = $("#InputCategory").val();
    var Date = $("#InputDate").val();
    var Estimate = $("#InputEstimate").val();
    if ($("#InputTitle").val() == "")
        $(".TitleError").css("display", "block");

    if ($("#InputCategory").val() == "")
        $(".CategoryError").css("display", "block");

    if ($("#InputEstimate").val() == "")
        $(".EstimateError").css("display", "block");

    if ($("#InputImportance").val() == 0)
        $(".ImportanceError").css("display", "block");

    //console.log(ImportanceID);
    if (!$("#InputTitle").val() == "" && !$("#InputCategory").val() == "" && !$("#InputEstimate").val() == "" && !$("#InputImportance").val() == 0) {
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "../Home/CreateTodo",
            data: { Title: Title, Category: Category, DueDate: Date, Estimate: Estimate, Importance: ImportanceID },
            success: function (data) {
                $("#InputTitle").val("");
                $(".TitleError").css("display", "none");
                $("#InputCategory").val("");
                $(".CategoryError").css("display", "none");
                $("#InputDate").val("");
                $("#InputEstimate").val("");
                $(".EstimateError").css("display", "none");
                $("#InputImportance").val("");
                $(".ImportanceError").css("display", "none");
                $("#exampleModal").addClass("fade")
            },
            error: function () {
                alert("Error");
            }
        });
    }


   

}
