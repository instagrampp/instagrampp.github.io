$('#find').click(function(e){

    e.preventDefault();

    var username = $("input[name=username]").val();
    var url = "https://instagram.com/"+username+"?__a=1";
    var success = false;
    var result;
    document.getElementById("loading").style.display = "-webkit-inline-box";
    document.getElementById("danger").style.display = "none";
    $.getJSON(url, function(data) {
        url = "https://i.instagram.com/api/v1/users/"+data.graphql.user.id+"/info/";
        $.getJSON(url, function(data) {
            success = true;
            result = data.user.hd_profile_pic_url_info.url;
            document.getElementById("img-profile-picture").src = result;
            document.getElementById("loading").style.display = "none";
            document.getElementById("img-target").href = result;
        });
    });
    
    setTimeout(function() {
        if (!success)
        {
            document.getElementById("loading").style.display = "none";
            document.getElementById("danger").style.display = "-webkit-inline-box";
        }
    }, 6000);
});

$('#close').click(function(){
    document.getElementById("img-profile-picture").src = "";
});