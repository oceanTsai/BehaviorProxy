import {hasVal, toStr}  from 'general-util'
import {prefixCreate} from 'enum-factory'
/**
 * @author ocean
 * @name 		
 * @module
 * @description behavior proxy of toggle 、 select 、 checked .
 */

const self = this

const defaultSelectKey='checked'
const defaultSelectVal='checked'
const defaultSelectEmpty=''

//TILE  : list 內之 item 沒有使用 Decorator 包覆
//WRAPPER : list 內之 item 有使用  Decorator 包覆
export const TYPE = prefixCreate(['TILE', 'WRAPPER',], 'BEHAVIOR_PROXY')

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


const equal=(item, idField, behaviorVal, type, originalDataKey='source')=>{
	switch(type){
		case TYPE.TILE:
			return toStr(item[idField]) === toStr(behaviorVal)
		case TYPE.WRAPPER:
			return toStr(item[originalDataKey][idField]) === toStr(behaviorVal)
	}
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
export const singleToggleItem=(item, idField, behaviorVal, type, opt={})=>{
	let param = {
		toggleField : defaultSelectKey,
		activeVal : defaultSelectVal,
		unActiveVal : defaultSelectEmpty,
		...opt
	}
	hasVal(item) && (
			!equal(item, idField, behaviorVal, type)
			? item[param.toggleField] !== param.unActiveVal && (item[param.toggleField]=param.unActiveVal)
			: (
					item[param.toggleField] = item[param.toggleField] === param.activeVal 
					? param.unActiveVal
					: param.activeVal
				)
	)
}

export const multiToggleItem=(item, idField, behaviorVal, type, opt={})=>{
	let param = {
		toggleField : defaultSelectKey,
		activeVal : defaultSelectVal,
		unActiveVal : defaultSelectEmpty,
		...opt
	}
	hasVal(item) && equal(item, idField, behaviorVal, type) &&
		(item[param.toggleField] = item[param.toggleField]===param.activeVal ? param.unActiveVal : param.activeVal)	
}

export const radioItem=(item, idField, behaviorVal, type, opt={})=>{
	let param = {
		toggleField : defaultSelectKey,
		activeVal : defaultSelectVal,
		unActiveVal : defaultSelectEmpty,
		...opt
	}
	hasVal(item) && (
		item[param.toggleField] = !equal(item, idField, behaviorVal, type)
			? param.unActiveVal
			: param.activeVal
	)
}

const around=(fun, type, list, idField, behaviorVal, toggleField, activeVal, unActiveVal)=>{
	hasVal(list) && list.forEach(item=>{
		fun(item, idField, behaviorVal, type, {toggleField : toggleField, activeVal : activeVal, unActiveVal : unActiveVal})
	})	
}

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
export const singleToggle=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	around(singleToggleItem, TYPE.WRAPPER, list, idField, behaviorVal, toggleField, activeVal, unActiveVal)
}

//多項 toggle
export const mutilToggle=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	around(multiToggleItem, TYPE.WRAPPER, list, idField, behaviorVal, toggleField, activeVal, unActiveVal)
}

export const radio=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	around(radioItem, TYPE.WRAPPER, list, idField, behaviorVal, toggleField, activeVal, unActiveVal)
}

export const singleToggleByTile=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	around(singleToggleItem, TYPE.TILE, list, idField, behaviorVal, toggleField, activeVal, unActiveVal)
}
export const mutilToggleByTile=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	around(multiToggleItem, TYPE.TILE, list, idField, behaviorVal, toggleField, activeVal, unActiveVal)
}
export const radioByTile=(list, idField, behaviorVal, toggleField=defaultSelectKey, activeVal=defaultSelectVal, unActiveVal=defaultSelectEmpty)=>{
	around(radioItem, TYPE.TILE, list, idField, behaviorVal, toggleField, activeVal, unActiveVal)
}


//filter active item (找出 active 項目 非wrapp物件)
export const filterChecked=(list, toggleField=defaultSelectKey, activeVal=defaultSelectVal)=>{
	return hasVal(list) && list.filter((item)=>(item[toggleField]==activeVal)) || null
}

//convter active item list to special list
export const toSpecialList=(list, specificKey, toggleField=defaultSelectKey)=>{
	let activeList = filterChecked(list)
	return hasVal(activeList) &&  hasVal(specificKey) ? activeList.map((item)=>(item[specificKey])) : null
 
}

//convter active item lsit to special list of Decorator Data List
export const toSpecialListOfDecorator=(list, specificKey, toggleField=defaultSelectKey)=>{
	let activeList = filterChecked(list)
	return hasVal(activeList) &&  hasVal(specificKey) ? activeList.map((item)=>(item.source[specificKey])) : null
}

	
const behaviorProxy = {
	selectAll : selectAll,
	unSelectAll : unSelectAll,
	singleToggle : singleToggle,
	mutilToggle : mutilToggle,
	radio: radio,
	singleToggleByTile : singleToggleByTile,
	mutilToggleByTile : mutilToggleByTile,
	radioByTile : radioByTile,
	filterChecked : filterChecked,
	toSpecialList : toSpecialList,
	toSpecialListOfDecorator : toSpecialListOfDecorator
}

if(!window.behaviorProxy){
		window.behaviorProxy = behaviorProxy
}

export default behaviorProxy
