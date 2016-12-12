(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toSpecialListOfDecorator = exports.toSpecialList = exports.filterChecked = exports.mutilToggle = exports.singleToggle = exports.multiToggleItem = exports.singleToggleItem = exports.unSelectAll = exports.selectAll = undefined;

var _generalUtil = require('general-util');

/**
 * @author ocean
 * @name 		
 * @module
 * @description behavior proxy of toggle 、 select 、 checked .
 */

var defaultSelectKey = 'checked';
var defaultSelectVal = 'checked';
var defaultSelectEmpty = '';

var selectAll = exports.selectAll = function selectAll(list) {
	var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSelectKey;
	var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultSelectVal;

	(0, _generalUtil.hasVal)(list) && list.forEach(function (item) {
		item[key] = val;
	});
};

var unSelectAll = exports.unSelectAll = function unSelectAll(list) {
	var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSelectKey;
	var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultSelectEmpty;

	(0, _generalUtil.hasVal)(list) && list.forEach(function (item) {
		item[key] = val;
	});
};

/**
 * @function
 * @description 
 * @param  {Object} item
 * @param  {String} idField 		識別該物件的唯一值欄位
 * @param  {Object} behaviorVal 發生行為物件的唯一值
 * @param  {String} toggleField togle 旗標欄位名稱
 * @param  {Object} selectVal 	active value
 * @param  {Object} unActiveVal 
 */
var singleToggleItem = exports.singleToggleItem = function singleToggleItem(item, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	(0, _generalUtil.hasVal)(item) && ((0, _generalUtil.toStr)(item.source[idField]) !== (0, _generalUtil.toStr)(behaviorVal) ? item[toggleField] !== unActiveVal && (item[toggleField] = unActiveVal) : item[toggleField] = item[toggleField] === activeVal ? unActiveVal : activeVal);
};

var multiToggleItem = exports.multiToggleItem = function multiToggleItem(item, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	(0, _generalUtil.hasVal)(item) && (0, _generalUtil.toStr)(item.source[idField]) === (0, _generalUtil.toStr)(behaviorVal) && (item[toggleField] = item[toggleField] === activeVal ? unActiveVal : activeVal);
};

/**
 * @function
 * @description toggle 單選
 * @param  {Array}  list
 * @param  {String} idField 		識別該物件的唯一值欄位
 * @param  {Object} behaviorVal 發生行為物件的唯一值
 * @param  {String} toggleField togle 旗標欄位名稱
 * @param  {Object} selectVal 	active value
 * @param  {Object} unActiveVal 
 */
var singleToggle = exports.singleToggle = function singleToggle(list, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	(0, _generalUtil.hasVal)(list) && list.forEach(function (item) {
		singleToggle(item, idField, behaviorVal, toggleField, activeVal, unActiveVal);
	});
};

var mutilToggle = exports.mutilToggle = function mutilToggle(list, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	(0, _generalUtil.hasVal)(list) && list.forEach(function (item) {
		multiToggleItem(item, idField, behaviorVal, toggleField, activeVal, unActiveVal);
	});
};

//filter active item
var filterChecked = exports.filterChecked = function filterChecked(list) {
	var toggleField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSelectKey;
	var activeVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultSelectVal;

	return (0, _generalUtil.hasVal)(list) && list.filter(function (item) {
		return item[toggleField] == activeVal;
	}) || null;
};

//convter active item list to special list
var toSpecialList = exports.toSpecialList = function toSpecialList(list, specificKey) {
	var toggleField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultSelectKey;

	var activeList = filterChecked(list);
	return (0, _generalUtil.hasVal)(activeList) && (0, _generalUtil.hasVal)(specificKey) ? activeList.map(function (item) {
		return item[specificKey];
	}) : null;
};

//convter active item lsit to special list of Decorator Data List
var toSpecialListOfDecorator = exports.toSpecialListOfDecorator = function toSpecialListOfDecorator(list, specificKey) {
	var toggleField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultSelectKey;

	var activeList = filterChecked(list);
	return (0, _generalUtil.hasVal)(activeList) && (0, _generalUtil.hasVal)(specificKey) ? activeList.map(function (item) {
		return item.source[specificKey];
	}) : null;
};

var behaviorProxy = {
	selectAll: selectAll,
	unSelectAll: unSelectAll,
	singleToggle: singleToggle,
	mutilToggle: mutilToggle,
	filterChecked: filterChecked,
	toSpecialList: toSpecialList,
	toSpecialListOfDecorator: toSpecialListOfDecorator
};

if (!window.behaviorProxy) {
	window.behaviorProxy = behaviorProxy;
}

exports.default = behaviorProxy;

},{"general-util":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @author ocean
 * @name 一般工具 
 * @module
 */

//判斷有無數值
var hasVal = exports.hasVal = function hasVal(val) {
	return !(val === null || typeof val === 'undefined' || val === '' || val === false);
};

//數值轉字串
var toStr = exports.toStr = function toStr(number) {
	return hasVal(number) ? number + '' : null;
};

//字串轉10進數值
var toInt = exports.toInt = function toInt(numStr) {
	return hasVal(numStr) ? parseInt(numStr, 10) : NaN;
};

//取整數
var clearFloat = exports.clearFloat = function clearFloat(number) {
	return hasVal(number) && !isNaN(number) ? number | 0 : NaN;
};

var filterInt = exports.filterInt = function filterInt(value) {
	return (/^(\-|\+)?([0-9]+|Infinity)$/.test(value) ? Number(value) : NaN
	);
};

var filterFloat = exports.filterFloat = function filterFloat(value) {
	return (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value) ? Number(value) : NaN
	);
};

var generalUtil = {
	hasVal: hasVal,
	toStr: toStr,
	toInt: toInt,
	clearFloat: clearFloat,
	filterInt: filterInt,
	filterFloat: filterFloat
};

if (!window.generalUtil) {
	window.generalUtil = generalUtil;
}

exports.default = generalUtil;

},{}]},{},[1]);
