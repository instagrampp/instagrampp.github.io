function field_control(e){e.value?$("#letseeit").prop("disabled",!1):$("#letseeit").prop("disabled",!0)}function error(){$("#modal-body").css("background","#f8d7da"),$("#loading").hide(),$("#danger").fadeIn()}$("#letseeit").click(function(e){e.preventDefault();var a,t,r,i,o,n=$("input[name=username]").val(),d="https://instagram.com/"+n,l=[];$(".invalid-feedback").hide(),$("#loading").fadeIn(),$("#danger").hide(),$("#profile").hide(),$("#modal-body").css("background","#141d26"),$(".carousel-control-prev").hide(),$(".carousel-control-next").hide();var s=new XMLHttpRequest;s.onreadystatechange=function(){if(s.readyState==XMLHttpRequest.DONE){var e=document.implementation.createHTMLDocument().documentElement;if(e.innerHTML=s.responseText,a=(a=(a=e.querySelectorAll("script"))[2].firstChild.data).replace("window._sharedData = ","").split(',"gatekeepers":')[0].concat("}"),a=jQuery.parseJSON(a),t=a.entry_data.ProfilePage[0].graphql.user.id,r=a.entry_data.ProfilePage[0].graphql.user.is_private,i=a.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count,0==r)for(var c=0;c<11&&c!=i;c++)1!=a.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[c].node.is_video&&(l[c]=a.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[c].node.display_url);l=l.filter(function(e){return""!==e}),d="https://i.instagram.com/api/v1/users/"+t+"/info/",$.getJSON(d,function(e){if(o=e.user.hd_profile_pic_url_info.url,$(".carousel-indicators").append("<li data-target='#carousel' data-slide-to='0' class='active'></li>"),$(".carousel-inner").append("<div class='carousel-item active'><a href='"+o+"' target='_blank'><img class='img-fluid' id='img-profile-picture' src='"+o+"'></a></div>"),0==r)for($(".carousel-control-prev").show(),$(".carousel-control-next").show(),c=0;c<l.length;c++)$(".carousel-indicators").append("<li data-target='#carousel' data-slide-to='"+(c+1)+"'></li>"),$(".carousel-inner").append("<div class='carousel-item'><a href='"+l[c]+"' target='_blank'><img class='img-fluid' id='img-profile-picture' src='"+l[c]+"'></a></div>");$("#profile").attr("href","https://instagram.com/"+n),$("#profile").show(),$("#loading").hide(),$("#danger").hide()})}404==s.status&&error()},s.open("GET",d,!0),s.send(null)}),$("#modal").on("hidden.bs.modal",function(e){$(".carousel-indicators").empty(),$(".carousel-inner").empty(),$("#loading").hide()}),$("#download").click(function(e){e.preventDefault();var a=$("input[name=video_url]").val(),t=!1,r=new XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState==XMLHttpRequest.DONE){var e=document.implementation.createHTMLDocument().documentElement;e.innerHTML=r.responseText,window.open(e.querySelector("meta[property='og:video']").getAttribute("content")),console.log(e),$("#video_url").val(""),t=!0}},r.open("GET",a,!1),r.send(null),0==t?($(".invalid-feedback").show(),$("#video_url").css("border","1px solid #dc3545")):($("#video_url").css("border","1px solid black"),$(".invalid-feedback").hide())});