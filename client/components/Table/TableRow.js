import React from 'react'
import { DataTypeEnum } from '../../enums/DataTypeEnum'
import Checkbox from '../Checkbox/Checkbox'
import { numberWithCommas } from '../../js/commonFn'

const TableRow = ({
  rowData = {},
  headers = [],
  hasCheckbox = false,
  checked = false,
  allowEdit = false,
  allowDelete = false,
  rowHeight = '48px',
  onChangeChecked = () => {},
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const handleChangeChecked = (e) => {
    onChangeChecked(rowData._id, e)
  }

  return (
    <tr className="group">
      {hasCheckbox && (
        <td
          style={{
            height: rowHeight,
          }}
          className="w-12 h-12 border-b border-gray-300 bg-transparent group-hover:bg-primary/10 transition-colors"
        >
          <div className="flex items-center justify-center w-12">
            <Checkbox
              id={rowData._id}
              name={rowData._id}
              checked={checked}
              onChange={handleChangeChecked}
            />
          </div>
        </td>
      )}
      {headers.map((header) => {
        let tdClass =
          'text-base h-12 border-b border-gray-300 px-5 bg-transparent group-hover:bg-primary/10 transition-colors whitespace-nowrap text-ellipsis overflow-hidden'
        let rowValue = ''
        let key = header.fieldName
        if (header.parent) {
          rowValue = rowData[header.parent][header.fieldName]
          key = `${header.parent}.${header.fieldName}`
        } else {
          rowValue = rowData[header.fieldName]
        }

        if (header.dataType === DataTypeEnum.Number) {
          rowValue = numberWithCommas(rowValue)
          tdClass += ' text-right'
        } else if (header.dataType === DataTypeEnum.Date || header.dataType === DataTypeEnum.Code) {
          tdClass += ' text-center'
        } else {
          tdClass += ' text-left'
        }

        return (
          <td
            style={{
              height: rowHeight,
            }}
            className={tdClass}
            key={key}
            title={rowValue}
          >
            {rowValue}
          </td>
        )
      })}

      {allowEdit && (
        <td
          style={{
            height: rowHeight,
          }}
          className="w-12 h-12 border-b border-gray-300 bg-transparent group-hover:bg-primary/10 transition-colors"
        >
          <div
            className="flex items-center justify-end text-gray-500 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onEdit(rowData._id)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </td>
      )}
      {allowDelete && (
        <td
          style={{
            height: rowHeight,
          }}
          className="w-12 h-12 border-b border-gray-300 bg-transparent group-hover:bg-primary/10 transition-colors"
        >
          <div
            className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-red-600 transition-colors"
            onClick={() => onDelete(rowData._id)}
          >
            <i className="fa-solid fa-trash"></i>
          </div>
        </td>
      )}
    </tr>
  )
}

export default TableRow
