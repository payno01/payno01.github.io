var checker_cursor = false

$(document).click(function() {
    var obj = $("#searchterm");
    if (!obj.is(event.target) && !obj.has(event.target).length) {
        checker_cursor = false
        if ($("#searchterm").val() == ""){
            $("#searchterm").css("width", "15px");
            $("#searchterm").css("padding", "0");
            $("#searchterm").css("border", "0px");
            $("#buttonsearch").css("left", "-5px")
        }
    }
    else {
        checker_cursor = true
    }
});

$("#searcher").hover(function(){
    $("#searchterm").css("width", "90%");
    $("#searchterm").css("padding", "8px 30px");
    $("#searchterm").css("border", "solid 1px black");
    $("#buttonsearch").css("left", "77%")
        
}, function(){
    if ($("#searchterm").val() == "" && checker_cursor == false){
        $("#searchterm").css("width", "15px");
        $("#searchterm").css("padding", "0");
        $("#searchterm").css("border", "0px");
        $("#buttonsearch").css("left", "-5px")
    }
})




