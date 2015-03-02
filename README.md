# expaste
Parser for pasted data that is copied from spreadsheet on Excel and Google Drive

[![Build Status](https://travis-ci.org/YusukeHirao/expaste.svg)](https://travis-ci.org/YusukeHirao/expaste)

## demo

ex.) Markdown output

[Demo Page](http://yusukehirao.github.io/expaste/sample/expaste.html)

![demo](demo.gif)

## usage

### Vanilla

```javascript
document.getElementById('input').addEventListener('paste', function (e) {

	var ep = expaste.getDataByEvent(e);

	// output style
	var json = ep.toJSONStringify();
	var csv = ep.toCSV();
	var tsv = ep.toTSV();
	var md = ep.toMarkdown();

	// overwritten paste
	this.value = md;

	e.preventDefault();

}, false);
```

### jQuery

```javascript
$('#input').on('paste', function (e) {

	var ep = expaste.getDataByEvent(e.originalEvent);

	// output style
	var json = ep.toJSONStringify();
	var csv = ep.toCSV();
	var tsv = ep.toTSV();
	var md = ep.toMarkdown();

	// overwritten paste
	$(this).val(md);

	return false;

});
```

## Support

- Chrome
- Safari
- Firefox

### Not support yet

- IE9-11

