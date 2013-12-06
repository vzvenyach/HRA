function makeTextBox(data) {
	var s = data.versions;
	sCount = s.length - 1;
	var cite = s[sCount].source.stat;
	var outString = makeButtons(sCount+1);
	outString += '<h2> Sec. ' + data.section +'. ' + s[sCount].short_title + '.</h2><div id="sectionBox">';
	outString += '<h3>Source: <a href="' + makeStatURL(cite) + '" target="blank">' + cite + '</a> (' + s[sCount].source.date + ')</h3>';
	outString += formatJSONtext(s[sCount].text) + '</div><p/>';
	return outString;
}

function makeButtons(count) {
	var outString = "";
	var i = 0;
	while (i < count) {
		outString += '<button class="version" id="v_' + i + '" onClick>' + i + '</button>\n';
		i++;
	}
	return outString;
}

function makeStatURL (cite) {
	//cite format: 100 Stat. 3228
	//http://www.gpo.gov/fdsys/search/citation2.result.STATUTE.action?statute.volume=87&statute.pageNumber=795&publication=STATUTE

	var out = cite.match(/\d+/g);
	url = 'http://www.gpo.gov/fdsys/search/citation2.result.STATUTE.action?statute.volume=' + out[0] + '&statute.pageNumber=' + out[1] +'&publication=STATUTE';
	return url;
}

function formatJSONtext (textString) {
	return textString.replace(/(.*)(\n)/g,'<p>$1</p>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');
}