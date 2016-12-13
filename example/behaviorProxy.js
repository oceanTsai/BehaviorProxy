(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toSpecialListOfDecorator = exports.toSpecialList = exports.filterChecked = exports.radioByTile = exports.mutilToggleByTile = exports.singleToggleByTile = exports.radio = exports.mutilToggle = exports.singleToggle = exports.radioItem = exports.multiToggleItem = exports.singleToggleItem = exports.unSelectAll = exports.selectAll = exports.TYPE = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _generalUtil = require('general-util');

var _enumFactory = require('enum-factory');

/**
 * @author ocean
 * @name 		
 * @module
 * @description behavior proxy of toggle 、 select 、 checked .
 */

var self = undefined;

var defaultSelectKey = 'checked';
var defaultSelectVal = 'checked';
var defaultSelectEmpty = '';

//TILE  : list 內之 item 沒有使用 Decorator 包覆
//WRAPPER : list 內之 item 有使用  Decorator 包覆
var TYPE = exports.TYPE = (0, _enumFactory.prefixCreate)(['TILE', 'WRAPPER'], 'BEHAVIOR_PROXY');

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

var equal = function equal(item, idField, behaviorVal, type) {
	var originalDataKey = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'source';

	switch (type) {
		case TYPE.TILE:
			return (0, _generalUtil.toStr)(item[idField]) === (0, _generalUtil.toStr)(behaviorVal);
		case TYPE.WRAPPER:
			return (0, _generalUtil.toStr)(item[originalDataKey][idField]) === (0, _generalUtil.toStr)(behaviorVal);
	}
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
var singleToggleItem = exports.singleToggleItem = function singleToggleItem(item, idField, behaviorVal, type) {
	var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

	var param = _extends({
		toggleField: defaultSelectKey,
		activeVal: defaultSelectVal,
		unActiveVal: defaultSelectEmpty
	}, opt);
	(0, _generalUtil.hasVal)(item) && (!equal(item, idField, behaviorVal, type) ? item[param.toggleField] !== param.unActiveVal && (item[param.toggleField] = param.unActiveVal) : item[param.toggleField] = item[param.toggleField] === param.activeVal ? param.unActiveVal : param.activeVal);
};

var multiToggleItem = exports.multiToggleItem = function multiToggleItem(item, idField, behaviorVal, type) {
	var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

	var param = _extends({
		toggleField: defaultSelectKey,
		activeVal: defaultSelectVal,
		unActiveVal: defaultSelectEmpty
	}, opt);
	(0, _generalUtil.hasVal)(item) && equal(item, idField, behaviorVal, type) && (item[param.toggleField] = item[param.toggleField] === param.activeVal ? param.unActiveVal : param.activeVal);
};

var radioItem = exports.radioItem = function radioItem(item, idField, behaviorVal, type) {
	var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

	var param = _extends({
		toggleField: defaultSelectKey,
		activeVal: defaultSelectVal,
		unActiveVal: defaultSelectEmpty
	}, opt);
	(0, _generalUtil.hasVal)(item) && (item[param.toggleField] = !equal(item, idField, behaviorVal, type) ? param.unActiveVal : param.activeVal);
};

var around = function around(fun, type, list, idField, behaviorVal, toggleField, activeVal, unActiveVal) {
	(0, _generalUtil.hasVal)(list) && list.forEach(function (item) {
		fun(item, idField, behaviorVal, type, { toggleField: toggleField, activeVal: activeVal, unActiveVal: unActiveVal });
	});
};

/**
 * @function
 * @description 單項toggle
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

	around(singleToggleItem, TYPE.WRAPPER, list, idField, behaviorVal, toggleField, activeVal, unActiveVal);
	/*
 hasVal(list) && list.forEach(item=>{
 	singleToggleItem(item, idField, behaviorVal, TYPE.WRAPPER, {toggleField : toggleField, activeVal : activeVal, unActiveVal : unActiveVal})
 })*/
};

//多項 toggle
var mutilToggle = exports.mutilToggle = function mutilToggle(list, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	around(multiToggleItem, TYPE.WRAPPER, list, idField, behaviorVal, toggleField, activeVal, unActiveVal);
	/*
 hasVal(list) && list.forEach(item=>{
 	multiToggleItem(item, idField, behaviorVal, TYPE.WRAPPER, {toggleField : toggleField, activeVal : activeVal, unActiveVal : unActiveVal})
 })
 */
};

var radio = exports.radio = function radio(list, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	around(radioItem, TYPE.WRAPPER, list, idField, behaviorVal, toggleField, activeVal, unActiveVal);
	/*
 hasVal(list) && list.forEach(item=>{
 	radioItem(item, idField, behaviorVal, TYPE.WRAPPER, {toggleField : toggleField, activeVal : activeVal, unActiveVal : unActiveVal})
 })
 */
};

var singleToggleByTile = exports.singleToggleByTile = function singleToggleByTile(list, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	around(singleToggleItem, TYPE.TILE, list, idField, behaviorVal, toggleField, activeVal, unActiveVal);
};
var mutilToggleByTile = exports.mutilToggleByTile = function mutilToggleByTile(list, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	around(multiToggleItem, TYPE.TILE, list, idField, behaviorVal, toggleField, activeVal, unActiveVal);
};
var radioByTile = exports.radioByTile = function radioByTile(list, idField, behaviorVal) {
	var toggleField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSelectKey;
	var activeVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultSelectVal;
	var unActiveVal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultSelectEmpty;

	around(radioItem, TYPE.TILE, list, idField, behaviorVal, toggleField, activeVal, unActiveVal);
};

//filter active item (找出 active 項目 非wrapp物件)
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
	radio: radio,
	singleToggleByTile: singleToggleByTile,
	mutilToggleByTile: mutilToggleByTile,
	radioByTile: radioByTile,
	filterChecked: filterChecked,
	toSpecialList: toSpecialList,
	toSpecialListOfDecorator: toSpecialListOfDecorator
};

if (!window.behaviorProxy) {
	window.behaviorProxy = behaviorProxy;
}

exports.default = behaviorProxy;

},{"enum-factory":2,"general-util":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.prefixCreate = exports.create = undefined;

var _generalUtil = require('general-util');

/**
 * @author ocean
 * @name enum factory
 * @module
 * @description 
 */

var create = exports.create = function create(array) {
	var ENUM = null;
	(0, _generalUtil.hasVal)(array) && (ENUM = {}) && array.forEach(function (value, index) {
		ENUM[value] = index + '';
	});
	return ENUM;
};

var prefixCreate = exports.prefixCreate = function prefixCreate(array) {
	var Prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	var ENUM = null;
	(0, _generalUtil.hasVal)(array) && (ENUM = {}) && array.forEach(function (value, index) {
		ENUM[value] = Prefix + '-' + index + '';
	});
	return ENUM;
};

var enumFactory_oc = {
	create: create,
	prefixCreate: prefixCreate
};

if (!window.enumFactory_oc) {
	window.enumFactory_oc = enumFactory_oc;
}

exports.default = enumFactory_oc;

},{"general-util":3}],3:[function(require,module,exports){
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
