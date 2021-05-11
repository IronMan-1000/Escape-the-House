if(jQuery.fx.interval=10,"undefined"==typeof(window.collected&&window.used))var collected=!1,used=!1;var room={settings:{inject:!1,grid_width:null,grid_height:null,tile_width:69.282,tile_height:40,drag_room:!1,room_glow:!1,player:!1,player_speed:null,player_position_x:null,player_position_y:null,collision_nodes:[],collected_items:collected,used_items:used,transparency_power:".7",volume:50,preload:[],fade_color:"black",zdetection:function(){return!1},execute:function(){}},generate:function(t){$.extend(room.settings,t),$("<div/>",{id:room.settings.fade_color}).appendTo("body").css({opacity:0}).animate({opacity:1},1e3,function(){"white"===room.settings.fade_color?$("body").css("background","#fff"):$("body").css("background","#000"),room.settings.inject&&$("#the_game").empty(),setTimeout(function(){$("#black").remove(),$("#white").remove(),room.inject()},500)})},inject:function(){room.settings.inject?$("#the_game").load(room.settings.inject+".html?"+(new Date).getTime(),function(){soundManager.stopAll();var t=window.room.settings.inject,o=function(){sound[t].play({volume:room.settings.volume,onfinish:function(){o(t)}})};o(t),$("body").css("background","#000"),$("<div/>",{id:room.settings.fade_color}).appendTo("body").css({opacity:1}).animate({opacity:0},1e3,function(){$("body").find("#"+room.settings.fade_color).remove()}),$.jStorage.set("is_in",room.settings.inject),room.draw_grid(),room.place_player(),room.set_collisions(),room.set_collected_items(),room.set_used_items(),room.draggable(),room.stroke(),room.settings.execute(),room.the_player.start(),room.center(),$.idleTimer("destroy"),$(".the-resume-screen").remove(),setTimeout(function(){$("#items").children().length>1&&$("#items").fadeIn()},100),$(room.player_body()).sprite({no_of_frames:8}).spStop(!0)}):(room.draw_grid(),room.draggable())},player:function(){var t=$("#"+room.settings.player);return t},player_body:function(){var t=$("#sprite");return t},center:function(t,o){var e=$("#the_game").children("div").first(),r=$(window).width(),i=$(window).height(),n=$(room.player()).width(),s=$(room.player()).height(),a=$(room.player_body()).height(),d=$(room.player()).position(),l=$("body").find("#floor"),c=$(l).width(),p=$(l).height(),g=$(l).position();if(t){if(!o)return!1;$("#tooltip").remove(),$(e).stop(!0,!1).animate({left:r/2-n/2-d.left-g.left,top:i/2-s/2-d.top-g.top+a/3},o)}else $(e).css({left:r/2-n/2-d.left-g.left,top:i/2-s/2-d.top-g.top+a/3})},draggable:function(){return!!room.settings.drag_room&&void $("#the_game").children("div:first-child").draggable({start:function(){$("#the_game").children("div").stop()}})},stroke:function(){return!!room.settings.room_glow&&void $("div.tile, div.active").hover(function(){$("#stroke").css({opacity:1})},function(){$("#stroke").css({opacity:.5})})},draw_grid:function(){var t=0,o=0;for(t=0;t<room.settings.grid_width;t++)for(o=0;o<room.settings.grid_height;o++)var e=$("<div/>",{id:t+"-"+o,css:{width:room.settings.tile_width,height:room.settings.tile_height,position:"absolute",left:t*room.settings.tile_width/2+(room.settings.grid_height*room.settings.tile_width/2-room.settings.tile_width/2)-room.settings.tile_width/2*o,top:o*room.settings.tile_height/2+t*room.settings.tile_height/2}}).appendTo("#floor").attr("class","tile").attr("data-x",t).attr("data-y",o).attr("data-z",o+(o+room.settings.grid_height*t))},grid:function(){return grid=function(){grid=new Array(room.settings.grid_height);for(var t,o=0;o<room.settings.grid_height;o++)for(grid[o]=new Array(room.settings.grid_width),t=0;t<room.settings.grid_width;t++)grid[o][t]=0;return grid},add_collisions=function(t,o){for(i=0;i<t.length;i++){var e=$("#"+t[i]).attr("data-x"),r=$("#"+t[i]).attr("data-y");e&&r&&(o[r][e]=1)}return o},grid=add_collisions(room.settings.collision_nodes,grid()),grid},place_player:function(){var t=$("#"+room.settings.player_position_x+"-"+room.settings.player_position_y),o=t.position();$(room.player()).css({top:o.top,left:o.left,"z-index":t.attr("data-z")}).attr("data-x",room.settings.player_position_x).attr("data-y",room.settings.player_position_y)},set_collisions:function(){room.loop_and_add_class(room.settings.collision_nodes,"collision")},set_collected_items:function(){room.loop_and_remove(room.settings.collected_items)},set_used_items:function(){room.loop_and_remove(room.settings.used_items,!0)},loop_and_remove:function(t,o){var e=t.length;if(o){if(!(e>0))return!1;for(i=0;i<e;i++)$("#"+t[i]).remove()}else{if(!(e>0))return!1;for(i=0;i<e;i++)$("#the_game").find("#"+t[i]).remove()}},loop_and_add_class:function(t,o){var e=t.length;if(!(e>0))return!1;for(i=0;i<e;i++)$("#"+t[i]).addClass(o)},transparency:function(t,o){$(o).addClass("transparency"),$(o).hover(function(){$(t).stop().css({opacity:room.settings.transparency_power})},function(){$(t).stop().css({opacity:1})})},pulse:function(t,o){function e(){setTimeout(function(){$(t).css({opacity:0}),setTimeout(function(){$(t).css({opacity:1}),e()},2*o)},o)}$(t).css({"-moz-transition":"opacity "+o/1e3+"s linear","-webkit-transition":"opacity "+o/1e3+"s linear","-o-transition":"opacity "+o/1e3+"s linear","-moz-transition":"opacity "+o/1e3+"s linear",transition:"opacity "+o/1e3+"s linear"}),e()},the_player:{start:function(){$("#floor").find("div.tile").on("click",function(){if(!$(this).hasClass("collision")){var t=$.jStorage.get("temp_path");t=[],$.jStorage.set("this_path",path),$(room.player_body()).spStart(),$(room.player()).stop(),room.the_player.go_to.start({target:!1,action:function(){}}),room.the_player.footsteps(),room.the_player.footsteps(12,4,!0),room.the_player.clear_path(),room.the_player.find_path(this,!1,!1,room.grid())}})},go_to:{settings:{target:!1,action:function(){return!1}},start:function(t){$.extend(room.the_player.go_to.settings,t),room.the_player.go_to.settings.target&&($(room.player_body()).spStart(),$(room.player()).stop(),room.the_player.footsteps(),room.the_player.footsteps(12,4,!0),room.the_player.clear_path(),room.the_player.find_path($("#"+room.the_player.go_to.settings.target),!1,!1,room.grid()))}},footsteps:function(t,o,e){t&&o&&e?stop_steps=setInterval(function(){sound_footstep.play()},1e3/t*o):("undefined"!=typeof window.stop_steps&&clearInterval(stop_steps),sound_footstep.play())},clear_path:function(){$("div.tile").removeClass("marked")},AStar:function(){/**
			
			 */
function t(t,o,e,r,i,n,s,a,d,l,c,p,g){return t&&(e&&!d[i][s]&&(p[g++]={x:s,y:i}),r&&!d[i][a]&&(p[g++]={x:a,y:i})),o&&(e&&!d[n][s]&&(p[g++]={x:s,y:n}),r&&!d[n][a]&&(p[g++]={x:a,y:n})),p}function o(t,o,e,r,i,n,s,a,d,l,c,p,g){return t=i>-1,o=n<l,e=s<c,r=a>-1,e&&(t&&!d[i][s]&&(p[g++]={x:s,y:i}),o&&!d[n][s]&&(p[g++]={x:s,y:n})),r&&(t&&!d[i][a]&&(p[g++]={x:a,y:i}),o&&!d[n][a]&&(p[g++]={x:a,y:n})),p}function e(t,o,e,r,i,n,s,a,d,l,c,p,g){return p}function r(t,o,e,r,i,n){var s=e-1,a=e+1,d=o+1,l=o-1,c=s>-1&&!r[s][o],p=a<i&&!r[a][o],g=d<n&&!r[e][d],m=l>-1&&!r[e][l],_=[],y=0;return c&&(_[y++]={x:o,y:s,index:y,direction:"up"}),g&&(_[y++]={x:d,y:e,index:y,direction:"right"}),p&&(_[y++]={x:o,y:a,index:y,direction:"down"}),m&&(_[y++]={x:l,y:e,index:y,direction:"left"}),t(c,p,g,m,s,a,d,l,r,i,n,_,y)}function i(t,o,e,r){return r(e(t.x-o.x),e(t.y-o.y))}function n(t,o,e,r){var i=t.x-o.x,n=t.y-o.y;return r(i*i+n*n)}function s(t,o,e,r){return e(t.x-o.x)+e(t.y-o.y)}function a(a,d,l,c){var p=a[0].length,g=a.length,m=p*g,_=Math.abs,y=Math.max,f={},u=[],h=[{x:d[0],y:d[1],f:0,g:0,v:d[0]+d[1]*p}],v=1,x,w,b,k,S,j,z,T,I;switch(l={x:l[0],y:l[1],v:l[0]+l[1]*p},c){case"Diagonal":b=t;case"DiagonalFree":w=i;break;case"Euclidean":b=t;case"EuclideanFree":y=Math.sqrt,w=n;break;default:w=s,b=e}b||(b=o);do{for(j=m,z=0,k=0;k<v;++k)(c=h[k].f)<j&&(j=c,z=k);if(T=h.splice(z,1)[0],T.v!=l.v)for(--v,I=r(b,T.x,T.y,a,g,p),k=0,S=I.length;k<S;++k)(x=I[k]).p=T,x.f=x.g=0,x.v=x.x+x.y*p,x.v in f||(x.f=(x.g=T.g+w(x,T,_,y))+w(x,l,_,y),h[v++]=x,f[x.v]=1);else{k=v=0;do u[k++]=[T.x,T.y,T.index,T.direction];while(T=T.p);u.reverse()}}while(v);return u}return a}(),find_path:function(t,o,e,r){if(!o&&!e)var o=parseInt($(room.player()).attr("data-x")),e=parseInt($(room.player()).attr("data-y"));var i=parseInt($(t).attr("data-x")),n=parseInt($(t).attr("data-y"));go=function(t,o){var o=o?o:1;if(t.length>o){var e=$("#"+t[o][0]+"-"+t[o][1]).position(),r=room.settings.zdetection()?room.settings.zdetection():$("#"+t[o][0]+"-"+t[o][1]).attr("data-z");"up"===t[o][3]?$(room.player_body()).spState(2):"down"===t[o][3]?$(room.player_body()).spState(3):"right"===t[o][3]?$(room.player_body()).spState(4):"left"===t[o][3]&&$(room.player_body()).spState(5),$(room.player()).attr("data-x",t[o][0]).attr("data-y",t[o][1]).css("z-index",r).animate({left:e.left,top:e.top},room.settings.player_speed,"linear",function(){o++,go(t,o)})}else $(room.player_body()).spStop(!0),get_direction=$(room.player_body()).css("background-position"),direction=get_direction.substr(-6,4),room.center(!0,1e3),"-310"==direction?room.player_body().css("background-position","0 0"):"-620"==direction?room.player_body().css("background-position","-620px 0"):"-930"==direction?room.player_body().css("background-position","-930px 0"):"1240"==direction&&room.player_body().css("background-position","-310px 0"),room.the_player.go_to.settings.action()&&room.the_player.go_to.settings.action(),room.the_player.go_to.start({target:!1,action:function(){}}),room.the_player.footsteps()},go(room.the_player.AStar(r,[o,e],[i,n]))}}};