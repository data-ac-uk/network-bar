(function(d){

  var menu = [
    { title: "data.ac.uk Homepage", url: "http://www.data.ac.uk/" },
    { title: "Equipment Sharing",   url: "http://equipment.data.ac.uk/" },
    { title: "OPDs",       			url: "http://opd.data.ac.uk/" },
    { title: "Observatory",       	url: "http://observatory.data.ac.uk/" },
    { title: "Learning Providers",  url: "http://learning-provider.data.ac.uk/"},
    { title: "CPV Codes",           url: "http://cpv.data.ac.uk/" },
    { title: "Academic Sessions",   url: "http://academic-session.data.ac.uk/" },
    { title: "Open Data Hub",       url: "http://hub.data.ac.uk/" },
    { title: "RSS News Feed",		url: "http://rss.data.ac.uk/" }
  ];
  // The HTML and CSS to inserr
  var html = "<div id='data-ac-uk-bar' class='noprint'><div id='data-ac-uk-bar-inner'><a href='http://www.data.ac.uk/'><img src='//network-bar.data.ac.uk/images/bar-data-logo.png' alt='data.ac.uk' style='width:80px;height:20px;vertical-align:middle' /></a>";
  if(location.hostname!='equipment.data.ac.uk'){
	  html += "<div id='data-ac-uk-eq'><a href='http://equipment.data.ac.uk/'><img src='//network-bar.data.ac.uk/images/equipment.data.png' alt='equipment.data' style='height:20px;vertical-align:middle' /></div>";
	}	
  html +="<div id='data-ac-uk-menu-toggle'><div id='data-ac-uk-menu-toggle-inner'>other data.ac.uk sites</div>";
  html += "</div></div> <div id='data-ac-uk-sites'>";

  for( i in menu )
  {
    html += "<div class='data-ac-uk-bar-menu-item'><a href='"+menu[i].url+"'>"+menu[i].title+"</a></div>";
  }
  html += "</div>";
 
  html += "</div> </div>";
  html += "<div id='data-ac-uk-overlay-mask'></div>";
//#121x25
  var css  = "#data-ac-uk-bar { position: absolute; top:0; left:0; width:100%; z-index: 2002; box-shadow: 0px 1px 2px rgba(0,0,0,0.7);} #data-ac-uk-bar-inner{ font-size:14px; height: 20px; padding: 4px 20px 4px 20px; background-color: #ccc; color: #333; } #data-ac-uk-sites .data-ac-uk-bar-menu-item { border: solid 1px #666; } #data-ac-uk-sites { background-color: #ccc; width: 200px; position: absolute;top:25px; right:20px; z-index: 2003; display:none; box-shadow: 2px 2px 2px rgba(0,0,0,0.7);} #data-ac-uk-sites a { width: 100%; display: block; color: #333; padding: 3px 3px 3px 13px; text-decoration: none; } #data-ac-uk-menu-toggle { position: absolute; top: 4px; right:20px; width: 200px; height: 20px; cursor:pointer;} #data-ac-uk-menu-toggle-inner { border: solid 1px #999; background-color: #bbb; font-size: 12px; padding: 0px 10px 0px 10px;}  #data-ac-uk-overlay-mask { width: 100%; height: 100%; background-color: transparent; display: none; position: fixed; top:0; left:0; z-index:2001 } .data-ac-uk-bar-menu-item:hover, #data-ac-uk-menu-toggle-inner:hover { background-color: #eef; } #data-ac-uk-eq {  position: absolute; top: 5px; right:230px; }  @media (max-width: 700px) {  #data-ac-uk-eq { display:none; } } ";

  // Append styles in to head
  var h = d.getElementsByTagName('head')[0];
  var s = d.createElement('style');
  s.type = "text/css";
  if(s.styleSheet){ s.styleSheet.cssText = css; }
  else            { s.appendChild(d.createTextNode(css)); }
  h.appendChild(s);

  // Prepend toolbar markup to body
  var b = d.getElementsByTagName('body')[0];
  var t = d.createElement('div');
  t.className = "toolbar";
  t.innerHTML = html;
  b.insertBefore(t, b.firstChild);
  //b.style.paddingTop = "23px";

  // Handle menu toggle
  mt = d.getElementById('data-ac-uk-menu-toggle-inner');
  ml = d.getElementById('data-ac-uk-sites');
  mask = d.getElementById('data-ac-uk-overlay-mask');
  mt.onclick = function(){
    if(ml.style.display == 'block') {
      // hide menu
      mt.style.backgroundColor = '#bbb';
      ml.style.display = 'none';
      mask.style.display = 'none';
    }
    else {
      // show menu
      mt.style.backgroundColor = '#eeeeff';
      ml.style.display = 'block';
      mask.style.display = 'block';
    }
  };

  mask.onclick = function(){
      // hide menu
      mt.style.backgroundColor = '#bbb';
      ml.style.display = 'none';
      mask.style.display = 'none';
  };
  
  var taged = d.getElementsByClassName('tag');
  
  for (var i = 0; i < taged.length; ++i) {
      var item = taged[i];  
	  var classes = item.classList;
	  var tag = false;
	  var vtags = ['demo','alpha','beta'];
	  for (var j = 0; j < classes.length; ++j) {
		  if(vtags.indexOf(classes[j])>=0){
			  var tag = classes[j];
		  }
	  }	 
	  if(tag){
		  item.innerHTML =  item.innerHTML + ' <img src="http://network-bar.data.ac.uk/images/tags/' + tag + '.png" class="tag_icon"/>';
	  }
  }
  

})(document);

