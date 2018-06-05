function field_control(ev) {
     if(ev.value){
         $('#letseeit').prop( "disabled", false );
     }
     else{
         $('#letseeit').prop( "disabled", true );
     }
}

function field_control_stories(ev) {
     if(ev.value){
         $('#stories').prop( "disabled", false );
     }
     else{
         $('#stories').prop( "disabled", true );
     }
}

$('#letseeit').click(function(e){

    e.preventDefault();

    var username = $("input[name=username]").val();
    var x,user_id, is_private, count;
    var url = "https://instagram.com/"+username;
    var array = [];
    var result;
    $('.invalid-feedback').hide();
    $( "#loading").fadeIn();
    $( "#danger").hide();
    $( "#profile").hide();
    $( "#modal-body").css("background", "#141d26");
    $( "#letseeit-control-prev").hide();
    $( "#letseeit-control-next").hide();
    $( "#see-more").hide();
    $( "#see-more-header").hide();
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            
            var instagramDocument = document.implementation.createHTMLDocument().documentElement;
            instagramDocument.innerHTML = xmlHttp.responseText;
            
            x = instagramDocument.querySelectorAll("script");
            
            x = x[3].firstChild.data;
            console.log(x);
            x = x.replace("window._sharedData = ", "").split(',"gatekeepers":')[0].concat("}");
            x = jQuery.parseJSON(x);
            
            user_id = x.entry_data.ProfilePage[0].graphql.user.id;
            is_private = x.entry_data.ProfilePage[0].graphql.user.is_private;
            count = x.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count;

            if(is_private == false){
                for(var i=0; i<11; i++){
                    if(i==count){break;}
                    else if(x.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[i].node.is_video == true){
                        continue;
                    }
                    else{
                        array[i]=x.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;
                    }
                }
            }
            
            array = array.filter(function(v){return v!==''});
            url = "https://i.instagram.com/api/v1/users/"+user_id+"/info/";
            $.getJSON(url, function(data) {
                result = data.user.hd_profile_pic_url_info.url;
                $( ".carousel-indicators").append("<li data-target='#carousel' data-slide-to='0' class='active'></li>")
                $( ".carousel-inner" ).append("<div class='carousel-item active'><a href='"+result+"' target='_blank'><img class='img-fluid' id='   img-profile-picture' src='"+result+"'></a></div>");
                if(is_private == false){
                    $( "#letseeit-control-prev").show();
                    $( "#letseeit-control-next").show();
                    for(i=0; i<array.length; i++){
                            $( ".carousel-indicators").append("<li data-target='#carousel' data-slide-to='"+(i+1)+"'></li>");
                            $( ".carousel-inner" ).append("<div class='carousel-item'><a href='"+array[i]+"' target='_blank'><img class='img-fluid' id='img-profile-picture' src='"+array[i]+"'></a></div>");
                        }
                }
                $("#profile").attr("href", "https://instagram.com/"+username);
                $( "#profile").show();
                $( "#see-more").show();
                $( "#loading").hide();
                $( "#danger").hide();;
            });
        }
        if(xmlHttp.status == 404){
            error();
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
});

function error(){
        $("#modal-body").css("background", "#f8d7da");
        $( "#loading").hide();
        $( "#danger").fadeIn();
}

$('#modal').on('hidden.bs.modal', function (e) {
        $( ".carousel-indicators").empty();
        $( ".carousel-inner" ).empty();
        $( "#loading").hide();
        $('#photo_url').css("border", "1px solid black");
})

$('#download_modal').on('hidden.bs.modal', function (e) {
        $( "#modal-body-download").empty();
})

$('#stories_modal').on('hidden.bs.modal', function (e) {
        $( ".stories-inner").empty();
        $('.modal-title-stories').empty();
})

$('#download').click(function(e){
    e.preventDefault();     
    var video_url = $("input[name=video_url]").val();
    var success = false;
    $("#download").attr("data-target", "#");
    $('#download_modal').show()
    if(!video_url){$('#download_modal').hide()}
     var xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            var instagramDocument = document.implementation.createHTMLDocument().documentElement;
            instagramDocument.innerHTML = xmlHttp.responseText;
            var v_url=instagramDocument.querySelector("meta[property='og:video']").getAttribute("content");
            $("#modal-body-download").append('<video class="d-flex justify-content-center img-fluid" controls id="player"><source src="'+v_url+'" type="video/mp4"></video>');
            $("#video_url").val("");
            $("#download").attr("data-target", "#download_modal");
            success = true;
        }
    }
    xmlHttp.open("GET", video_url, false);
    xmlHttp.send(null);
        if(xmlHttp.status == 404){
            error();
            $('#download_modal').hide()
        }
    if(success==false){
        $('.invalid-feedback').show();
        $('#video_url').css("border", "1px solid #dc3545");
        $('#download_modal').hide()
    }
    else{
        $('#video_url').css("border", "1px solid black");
        $('.invalid-feedback').hide();
    }  
});


$('#add-photo').click(function(e){
    e.preventDefault();     
    var photo_url = $("input[name=photo_url]").val();
    var success = false;
     var xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            $('#photo_url').css("border", "1px solid black");
            var instagramDocument = document.implementation.createHTMLDocument().documentElement;
            instagramDocument.innerHTML = xmlHttp.responseText;
            var p_url=instagramDocument.querySelector("meta[property='og:image']").getAttribute("content");
            $('#photo_url').val("");
            var i = $(".carousel-indicators").last()[0].childElementCount;  //last element            
            $( ".carousel-indicators").append("<li data-target='#carousel' data-slide-to='"+(i)+"'></li>");
            $( ".carousel-inner" ).append("<div class='carousel-item'><a href='"+p_url+"' target='_blank'><img class='img-fluid' id='img-profile-picture' src='"+p_url+"'></a></div>");
            $('#carousel').carousel(i);
            success = true;
        }
    }
    xmlHttp.open("GET", photo_url, false);
    xmlHttp.send(null);
    if(xmlHttp.status == 404 || success==false){
        $('#photo_url').css("border", "1px solid #dc3545");
    }

});

$(' #see-more').click(function(e){
    e.preventDefault();
    $(' #see-more-header').toggle(200);
    
});

$('#stories').click(function(e){
    e.preventDefault();
    var stories_username = $("input[name=stories_url]").val();
    var success = false;
    $("#modal-body-stories").css("background", "#141d26");
    $( "#loading-stories").fadeIn();
    $( "#danger-stories").hide();
    $( "#carousel_stories").hide();
   
        
    $.getJSON("https://api.storiesig.com/stories/"+stories_username, function(data) {
        if(data.items == 0){$( "#danger-stories").text(stories_username+" has no story.");$( "#danger-stories").fadeIn();$("#modal-body-stories").css("background", "#f8d7da");}
        $( "#loading-stories").hide();
        $('.modal-title-stories').append("@"+data.user.username+"'s stories");
        $( "#carousel_stories").show();
        for(i=0; i<data.items.length; i++){
            if(data.items[i].video_versions){
                if(i==0){
                    $(".stories-inner").append('<div class="carousel-item active"><video class="justify-content-center img-fluid" controls id="player" width="300"><source src="'+data.items[i].video_versions[0].url+'" type="video/mp4"></video></div>')
                }
                else{
                    $(".stories-inner").append('<div class="carousel-item"><video class="justify-content-center img-fluid" controls id="player" width="300"><source src="'+data.items[i].video_versions[0].url+'" type="video/mp4"></video></div>')                    
                }
            }
            else{
                if(i==0){
                    $(".stories-inner").append('<div class="carousel-item active"><a href="'+data.items[i].image_versions2.candidates[0].url+'" target="_blank"><img class="justify-content-center img-fluid" src="'+data.items[i].image_versions2.candidates[0].url+'"></a></div>')
                }
                else{
                    $(".stories-inner").append('<div class="carousel-item"><a href="'+data.items[i].image_versions2.candidates[0].url+'" target="_blank"><img class="justify-content-center img-fluid" src="'+data.items[i].image_versions2.candidates[0].url+'"></a></div>')
                }
            }
        }
        success=true;
    }).fail(function() {
        $( "#loading-stories").hide();
        $( "#danger-stories").text("Invalid username! Try again.");
        $( "#danger-stories").fadeIn();
        $("#modal-body-stories").css("background", "#f8d7da");
    });
    
});


