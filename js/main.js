$('#find').click(function(e){

    e.preventDefault();

    var username = $("input[name=username]").val();
    var url = "https://instagram.com/"+username+"?__a=1";
    var result;
    document.getElementById("loading").style.display = "-webkit-inline-box";
    document.getElementById("danger").style.display = "none";
    document.getElementById("profile").style.display = "none";
    
    $.getJSON(url, function(data) {
        url = "https://i.instagram.com/api/v1/users/"+data.graphql.user.id+"/info/";
        $.getJSON(url, function(data) {
            result = data.user.hd_profile_pic_url_info.url;
            document.getElementById("img-profile-picture").src = result;
            document.getElementById("profile").style.display = "-webkit-inline-box";
            document.getElementById("profile").href = "https://instagram.com/"+username;
            document.getElementById("loading").style.display = "none";
            document.getElementById("danger").style.display = "none";
        });
    })
    .fail(function(){
            document.getElementById("loading").style.display = "none";
            document.getElementById("danger").style.display = "-webkit-inline-box";
    });
});

$('#modal').on('hidden.bs.modal', function (e) {
    document.getElementById("img-profile-picture").src = "";
});