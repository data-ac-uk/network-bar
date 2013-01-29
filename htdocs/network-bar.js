(function(d){

  var menu = [
    { title: "data.ac.uk Homepage", url: "http://www.data.ac.uk/" },
    { title: "Learning Providers",  url: "http://learning-provider.data.ac.uk/"},
    { title: "CPV Codes",           url: "http://cpv.data.ac.uk/" },
    { title: "Academic Sessions",   url: "http://academic-session.data.ac.uk/" },
    { title: "Open Data Hub",       url: "http://hub.data.ac.uk/" }
  ];

  // The HTML and CSS to insert
  var html = "<div id='data-ac-uk-bar'>(logo) data.ac.uk Network<span onclick='el = document.getElementById( \"data-ac-uk-sites\" ); if( el.style.display == \"block\" ) { el.style.display = \"none\"; } else { el.style.display = \"block\"; }' id='data-ac-uk-menu-toggle'>view other data.ac.uk sites</span></div> <div id='data-ac-uk-sites'>";

  for( i in menu )
  {
    html += "<div class='data-ac-uk-bar-menu-item'><a href='"+menu[i].url+"'>"+menu[i].title+"</a></div>";
  }
  html += "</div> </div>";

  var css  = "#data-ac-uk-bar { font-size:14px; height: 20px; padding: 4px 20px 4px 20px; background-color: #000; color: #fff; } #data-ac-uk-sites .data-ac-uk-bar-menu-item { border-top: solid 1px #666; } #data-ac-uk-sites { background-color: #000; width: 200px; position: absolute;top:28px; right:20px; z-index: 100; display:none; } #data-ac-uk-sites a { width: 100%; display: block; color: #fff; padding: 3px; } #data-ac-uk-menu-toggle { float:right; margin-right: 20px; cursor:pointer;} ";

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

})(document);

