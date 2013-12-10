function getHashFromURL () {
	return window.location.hash.replace("\#","");
}

function buildSection(section) {
	$.getJSON('sections/' + section + '.json', function (d) {
		$('div#section').replaceWith(makeTextBox(d));
		    $(' button ').on("click", function(){
		    	var cite=d.versions[$(this).text()].source.stat;
		    	$('div#sectionBox').replaceWith('<div id="sectionBox">' + '<h3>Source: ' + makeStatURL(cite) + ' (' + d.versions[$(this).text()].source.date + ')' +'</h3>' + formatJSONtext(d.versions[$(this).text()].text) + '</div>');});
	}).fail(function(){
		console.log("failed");
		window.location.hash = "#";});
	$('input').val(getHashFromURL());
}

function getUserInput() {

	var userInput = $('input').val();
	window.location.hash = userInput;

// Build section
	buildSection(userInput);
	$('input').val(getHashFromURL());
//Need to deal with error from buildSection()

}

function makeTextBox(data) {
	var s = data.versions;
	sCount = s.length - 1;
	var cite = s[sCount].source.stat;
	var outString = '<div id="section">';
	outString += makeButtons(sCount+1);
	outString += '<h2> Sec. ' + data.section +'. ' + s[sCount].short_title + '.</h2><div id="sectionBox">';
	outString += '<h3>Source: ' + makeStatURL(cite) + ' (' + s[sCount].source.date + ')</h3>';
	outString += formatJSONtext(s[sCount].text) + '</div><p/></div>';
	return outString;
}

function makeButtons(count) {
	var outString = '<div class="btn-group">';
	var i = 0;
	while (i < count) {
		outString += '<button type="button" class="btn btn-default" id="v_' + i + '" onClick>' + i + '</button>\n';
		i++;
	}
	outString +='</div>'
	return outString;
}

function makeStatURL (cite) {
	//cite format: 100 Stat. 3228
	// Shout out to @tmcw and @konklone at DCCode.org for the inspiration for these functions

	if (cite.search(/Stat/) == -1) {
		return cite;
	}
	var out = cite.match(/\d+/g);
	return linked('http://api.fdsys.gov/link?collection=statute&volume=' + out[0] + '&page=' + out[1], cite);
}

function formatJSONtext (textString) {
	return textString.replace(/(.*)(\n)/g,'<p>$1</p>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');
}

function linked(url, text) {
	return '<a href="' + url + '" target="blank">' + text + '</a>';
}
