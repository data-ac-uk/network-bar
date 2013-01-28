var bar = document.getElementById( "data-ac-uk-bar" );
bar.innerHTML = "<div>(logo) data.ac.uk Network  <span style='float:right; margin-right: 20px;' onclick='toggleView( \"data-ac-uk-sites\" )' id='data-ac-uk-toggle'>view other data.ac.uk sites</span></div> <div id='data-ac-uk-sites'> <div class='data-ac-uk-bar-menu-item'><a href='http://www.data.ac.uk/'>data.ac.uk Homepage</a></div> <div class='data-ac-uk-bar-menu-item'><a href='http://learning-provider.data.ac.uk/'>Learning Providers</a></div> <div class='data-ac-uk-bar-menu-item'><a href='http://cpv.data.ac.uk/'>CPV Codes</a></div> <div class='data-ac-uk-bar-menu-item'><a href='http://academic-session.data.ac.uk/'>Academic Sesssions</a></div> <div class='data-ac-uk-bar-menu-item'><a href='http://hub.data.ac.uk/'>Open Data Hub</a></div> </div> <style> #data-ac-uk-bar { font-size:14px; height: 20px; padding: 4px 20px 4px 20px; background-color: #000; color: #fff; } #data-ac-uk-sites .data-ac-uk-bar-menu-item { border-top: solid 1px #666; } #data-ac-uk-sites { background-color: #000; width: 200px; position: absolute;top:28px; right:20px; z-index: 100; display:none; } #data-ac-uk-sites a { width: 100%; display: block; color: #fff; padding: 3px; } </style> </div> ";

function toggleView(id)
{
	var el = document.getElementById( id );
	if( el.style.display == 'block' ) 
	{
		el.style.display = 'none';
	}
	else
	{
		el.style.display = 'block';
	}
}
