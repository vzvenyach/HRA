function makeTextBox(data) {
	var s = data.versions;
	sCount = s.length - 1;
	var outString = '<h2> Sec. ' + data.section +'. ' + s[sCount].short_title + '.</h2><div id="sectionBox">';
	outString += s[sCount].text + '</div><p/>';
	outString += makeButtons(sCount+1);
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