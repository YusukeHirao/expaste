(function () {
	'use strict';

	var Expaste = function (clipboardData) {
		if (this instanceof Expaste) {
			this.init(clipboardData);
		} else {
			return new Expaste(clipboardData);
		}
	};

	Expaste.prototype.init = function (clipboardData) {

		var text, html, img;

		if (clipboardData === String(clipboardData)) {
			text = clipboardData;
			html = clipboardData;
		} else {
			text = clipboardData.getData('text/plain');
			html = clipboardData.getData('text/html');
			img = clipboardData.files;
		}

		if (html) {
			this.origin = html;
		} else {
			this.origin = text;
		}

		var htmlDoc;
		var tableNodes;
		htmlDoc = Expaste.parseHTMLFromString(html, 'text/html');
		if (htmlDoc) {
			tableNodes = htmlDoc.getElementsByTagName('table');
		}

		if (tableNodes && tableNodes[0]) {
			this.rows = Expaste.toRows(tableNodes[0]);
		} else {
			this.rows = null;
			if (text) {
				this.text = text;
			}
		}

	};

	Expaste.parseHTMLFromString = function (html) {
		var parser = new DOMParser();
		var htmlDoc = parser.parseFromString(html, 'text/html');
		if (!htmlDoc) {
			// for Old Browser and phantomjs
			htmlDoc = document.implementation.createHTMLDocument('');
			htmlDoc.body.innerHTML = html;
		}
		return htmlDoc;
	};

	Expaste.prototype.toString = function () {
		return this.toCSV(' ');
	};

	Expaste.prototype.toTable = function () {
		// TODO: WIP
		// @return HTMLElement
		return;
	};

	Expaste.prototype.toTableStringify = function () {
		// TODO: WIP
		// @return string
		return;
	};

	Expaste.prototype.toJSON = function () {
		if (this.rows) {
			return this.rows;
		} else {
			return { text: this.text };
		}
	};

	Expaste.prototype.toJSONStringify = function (replacer, space) {
		return JSON.stringify(this.toJSON(), replacer, space);
	};

	Expaste.prototype.toMarkdown = function () {
		var headerCellDeafultName = 'name';
		var rows;
		var maxLengthList = [];
		var maxCols = 0;
		var header;
		var border;
		var result;
		if (this.rows) {
			rows = this.rows.concat();

			// count max cols
			rows.forEach(function (cols) {
				maxCols = Math.max(maxCols, cols.length);
			});

			// create header cells
			header = new Array(maxCols).join(',').split(',').map(function () {
				return {
					value: headerCellDeafultName
				};
			});

			rows.unshift(header);

			// count max string length from cells
			rows.forEach(function (cols) {
				cols.forEach(function (col, i) {
					if (maxLengthList[i] === void 0) {
						// |---|---| <- minimum length 3 of "-"
						maxLengthList[i] = 3;
					}
					maxLengthList[i] = Math.max(maxLengthList[i], Expaste.getWidth(col.value));
				});
			});
			result = rows.map(function (cols) {
				return cols.map(function (col, i) {
					var spaceCount = maxLengthList[i] - Expaste.getWidth(col.value) + 1;
					var space = '';
					if (0 < spaceCount) {
						space = new Array(spaceCount).join(' ');
					}
					// console.log(i, col.value, maxLengthList[i], spaceCount, space.replace(/\s/g, '･'));
					return col.value + space;
				}).join('|');
			});

			// create border
			border = maxLengthList.map(function (maxLength) {
				return new Array(maxLength + 1).join('-');
			}).join('|');

			// insert border
			result.splice(1, 0, border);

			return result.join('\n');;
		} else {
			return this.text;
		}
	};

	Expaste.prototype.toCSV = function (separator) {
		separator = separator || ',';
		if (this.rows) {
			return this.rows.map(function (row) {
				return row.map(function (col) {
					if (col.value.indexOf(separator) !== -1) {
						return '"' + col.value + '"';
					} else {
						return col.value;
					}
				}).join(separator);
			}).join('\n');
		} else {
			return this.text;
		}
	};

	Expaste.prototype.toTSV = function () {
		return this.toCSV('\t');
	};

	Expaste.getWidth = function (str) {
		var result = 0;
		str.split('').forEach(function (char) {
			var code = char.charCodeAt(0);
			if (code <= 0x02AF) {
				// narrow characters "ASCII" to "The Unicode Standard Version 6.2 IPA Extensions"
				result += 1;
			} else {
				result += 2;
			}
		});
		return result;
	}

	Expaste.toRows = function (tableNode) {
		var result = [];
		var resultRow;
		var rows = tableNode.getElementsByTagName('tr');
		var cols;
		var i = 0;
		var l = rows.length;
		var i2;
		var l2;
		for (; i < l; i++) {
			resultRow = [];
			cols = rows[i].querySelectorAll('th, td');
			l2 = cols.length;
			for (i2 = 0; i2 < l2; i2++) {
				resultRow.push(new Expaste.Cell(cols[i2]));
			}
			result.push(resultRow);
			resultRow = null;
		}
		return result;
	};

	Expaste.getDataByEvent = function (e) {
		if (e.clipboardData) {
			return new Expaste(e.clipboardData);
		} else {
			return null;
		}
	};

	Expaste.Cell = function (cellNode) {
		if (this instanceof Expaste.Cell) {
			this.init(cellNode);
		} else {
			return new Expaste.Cell(cellNodea);
		}
	};

	Expaste.Cell.prototype.init = function (cellNode) {
		cellNode = cellNode || {};
		this.value = cellNode.textContent || '';
		this.rowSpan = cellNode.rowSpan || 0;
		this.colSpan = cellNode.colSpan || 0;
		this.isHeader = cellNode.nodeName === 'TH';
	};

	Expaste.Cell.prototype.toString = function () {
		return this.value;
	};

	this.expaste = Expaste;

}).call(this);
