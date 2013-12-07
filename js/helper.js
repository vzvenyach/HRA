function makeTextBox(data) {
	var s = data.versions;
	sCount = s.length - 1;
	var cite = s[sCount].source.stat;
	var outString = makeButtons(sCount+1);
	outString += '<h2> Sec. ' + data.section +'. ' + s[sCount].short_title + '.</h2><div id="sectionBox">';
	outString += '<h3>Source: ' + makeStatURL(cite) + ' (' + s[sCount].source.date + ')</h3>';
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
	// Shout out to @tmcw and @konklone at DCCode.org for the inspiration for these functions

	var out = cite.match(/\d+/g);
	return linked('http://api.fdsys.gov/link?collection=statute&volume=' + out[0] + '&page=' + out[1], cite);
}

function formatJSONtext (textString) {
	return textString.replace(/(.*)(\n)/g,'<p>$1</p>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');
}

function linked(url, text) {
	return '<a href="' + url + '" target="blank">' + text + '</a>';
}