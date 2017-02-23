// 接口导出文件

import DimensManager from './data'
import AlignManager from './align'
import MultiSelect from './multiselect'

// 所有元素的位置及尺寸信息
const data = new DimensManager()
export const elementAdd = data.add.bind(data)
export const elementUpdate = data.update.bind(data)
export const elementRemove = data.remove.bind(data)
export const elementsMove = data.moveElements.bind(data)

// 对齐操作
const alignManager = new AlignManager(data)
export const alignBegin = alignManager.alignBegin.bind(alignManager)
export const alignNext = alignManager.alignNext.bind(alignManager)
export const alignSearch = alignManager.alignSearch.bind(alignManager)
export const alignEnd = alignManager.alignEnd.bind(alignManager)

// 多个框选操作
const selector = new MultiSelect(data)
export const multiSelect = selector.select.bind(selector)
export const getMulti = selector.get.bind(selector)
