import {hasVal, toStr}  from 'general-util'

/**
 * @author ocean
 * @name 		
 * @module
 * @description behavior proxy of toggle 、 select 、 checked .
 */

const defaultSelectKey='checked'
const defaultSelectVal='checked'
const defaultSelectEmpty=''

export const selectAll=(list, key=defaultSelectKey, val=defaultSelectVal)=>{
	hasVal(list) && list.forEach(item=>{
		item[key] = val
	})
}

export const unSelectAll=(list, key=defaultSelectKey, val=defaultSelectEmpty)=>{
	hasVal(list) && list.forEach(item=>{
		item[key] = val
	})
}

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
export const singleToggleItem=(item, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	hasVal(item) && (
		toStr(item.source[idField]) !== toStr(behaviorVal)
			? item[toggleField] !== unActiveVal && (item[toggleField]=unActiveVal)
			: (
					item[toggleField] = item[toggleField] === activeVal 
					? unActiveVal
					: activeVal
				)
	)
}

export const multiToggleItem=(item, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	hasVal(item) && toStr(item.source[idField]) === toStr(behaviorVal) &&
		(item[toggleField] = item[toggleField]===activeVal ? unActiveVal : activeVal)	
}

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
export const singleToggle=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	hasVal(list) && list.forEach(item=>{
		singleToggle(item, idField, behaviorVal, toggleField, activeVal, unActiveVal)
	})
}

export const mutilToggle=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	hasVal(list) && list.forEach(item=>{
		multiToggleItem(item, idField, behaviorVal, toggleField, activeVal, unActiveVal)
	})
}

const behaviorProxy = {
	selectAll : selectAll,
	unSelectAll : unSelectAll,
	singleToggle : singleToggle,
	mutilToggle : mutilToggle
}

if(!window.behaviorProxy){
		window.behaviorProxy = behaviorProxy
}

export default behaviorProxy