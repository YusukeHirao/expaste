# expaste
Parser for pasted data that is copied from spreadsheet on Excel and Google Drive

[![npm version](https://badge.fury.io/js/expaste.svg)](http://badge.fury.io/js/expaste)
[![Bower version](https://badge.fury.io/bo/expaste.svg)](http://badge.fury.io/bo/expaste)
[![Build Status](https://travis-ci.org/YusukeHirao/expaste.svg)](https://travis-ci.org/YusukeHirao/expaste)
[![Dependency Status](https://david-dm.org/YusukeHirao/expaste.svg)](https://david-dm.org/YusukeHirao/expaste)
[![devDependency Status](https://david-dm.org/YusukeHirao/expaste/dev-status.svg)](https://david-dm.org/YusukeHirao/expaste#info=devDependencies)

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

### unsupport

- Internet Explorer

> Partial support in IE refers using a non-standard method of interacting with the clipboard.
[Can I use](http://caniuse.com/#feat=clipboard)


