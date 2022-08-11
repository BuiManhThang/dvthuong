import React, { useState, useEffect } from 'react'
import baseApi from '../../api/BaseApi'
import { DataTypeEnum } from '../../enums/DataTypeEnum'
import { ComboboxLabelPositionEnum } from '../../enums/ComboboxEnum'

import Head from 'next/head'
import Button from '../../components/Button/Button'
import ManufacturerInfoPopup from '../../components/ManufacturerPopup/ManufacturerInfoPopup'
import Table from '../../components/Table/Table'
import InputField, { TypeStyle } from '../../components/InputField/InputField'
import Combobox from '../../components/Combobox/Combobox'
import Paging from '../../components/Paging/Paging'

const HEADERS = [
  {
    caption: 'Mã hãng sản xuất',
    fieldName: 'code',
    dataType: DataTypeEnum.Text,
    width: '170px',
    minWidth: '170px',
  },
  {
    caption: 'Tên hãng sản xuất',
    fieldName: 'name',
    dataType: DataTypeEnum.Text,
    minWidth: '200px',
  },
  {
    caption: 'Số lượng SP',
    fieldName: 'number',
    dataType: DataTypeEnum.Number,
    width: '150px',
    minWidth: '150px',
  },
]

const SORT_OPTIONS = [
  {
    _id: 'code|1',
    name: 'Mã nhà cung cấp tăng dần',
  },
  {
    _id: 'code|-1',
    name: 'Mã nhà cung cấp giảm dần',
  },
  {
    _id: 'name|1',
    name: 'Tên nhà cung cấp tăng dần',
  },
  {
    _id: 'name|-1',
    name: 'Tên nhà cung cấp giảm dần',
  },
]

const ManufacturersAdmin = () => {
  const [isActivePopupAdd, setIsActivePopupAdd] = useState(false)
  const [manufacturers, setManufacturers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedSortOption, setSelectedSortOption] = useState('code|1')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState('30')
  const [totalRecords, setTotalRecords] = useState(0)
  const [edittingManufacturerId, setEdittingManufacturerId] = useState('')

  useEffect(() => {
    getPagingManufacturers(generateQuery({ PageIndex: 1 }))
  }, [])

  const getManufacturers = async () => {
    setIsLoading(true)
    try {
      const res = await baseApi.get('/manufacturers/query')

      setManufacturers([...res.data.data.pageData])
      setTotalRecords(res.data.data.totalRecords)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const handleEditRow = (manufacturerId) => {
    console.log(manufacturerId)
    setEdittingManufacturerId(manufacturerId)
    setIsActivePopupAdd(true)
  }

  const handleDeleteRow = (manufacturerId) => {
    console.log(manufacturerId)
  }

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const handleChangeSort = (e) => {
    getPagingManufacturers(generateQuery({ Sort: e }))
    setPageIndex(1)
    setSelectedSortOption(e)
  }

  const handleChangePageIndex = (newPageIdx) => {
    setPageIndex(newPageIdx)
    getPagingManufacturers(generateQuery({ PageIndex: newPageIdx }))
  }

  const handleChangePageSize = (newPageSize) => {
    setPageSize(newPageSize)
    setPageIndex(1)
    getPagingManufacturers(generateQuery({ PageSize: newPageSize }))
  }

  const getPagingManufacturers = async (query = '') => {
    setIsLoading(true)
    try {
      const res = await baseApi.get(`/manufacturers/query?${query}`)
      setManufacturers([...res.data.data.pageData])
      setTotalRecords(res.data.data.totalRecords)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const generateQuery = ({ PageSize = null, PageIndex = null, Sort = null }) => {
    const query = `pageSize=${PageSize || pageSize}&pageIndex=${PageIndex || pageIndex}&sort=${
      Sort || selectedSortOption
    }`
    return query
  }

  const handleClosePopup = (isReload) => {
    setIsActivePopupAdd(false)
    setEdittingManufacturerId('')
    if (isReload) {
      getPagingManufacturers(generateQuery({ PageIndex: 1 }))
    }
  }

  return (
    <div className="container mx-auto px-6 mt-6">
      <Head>
        <title>Nhà cung cấp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <div className="flex items-center justify-between">
          <div className="w-96">
            <InputField
              id="search-text"
              name="search-text"
              placeholder="Tìm kiếm theo tên, mã sản phẩm..."
              typeStyle={TypeStyle.Normal}
              startIcon={
                <div>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              }
              value={searchText}
              onInput={handleChangeSearchText}
            />
          </div>
          <div className="flex items-center gap-x-3">
            <div className="w-72">
              <Combobox
                id="sort-option"
                name="sort-option"
                items={SORT_OPTIONS}
                value={selectedSortOption}
                label="Sắp xếp theo"
                labelPosition={ComboboxLabelPositionEnum.Left}
                onChange={handleChangeSort}
              />
            </div>
            <Button
              style={{
                height: '40px',
                borderRadius: '6px',
                padding: '0 16px',
                fontWeight: '500',
                fontSize: '14px',
              }}
              onClick={() => setIsActivePopupAdd(true)}
            >
              <span className="leading-none pr-2 text-white">
                <i className="fa-solid fa-plus"></i>
              </span>
              <span className="leading-none">Thêm nhà cung cấp</span>
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <Table
            headers={HEADERS}
            data={manufacturers}
            hasCheckbox={true}
            allowEdit={true}
            allowDelete={true}
            checkedRows={selectedRows}
            isLoading={isLoading}
            height="calc(100vh - 200px)"
            onCheckRow={(e) => setSelectedRows(e)}
            onEdit={handleEditRow}
            onDelete={handleDeleteRow}
          />
        </div>
        <div>
          <Paging
            totalRecords={totalRecords}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onChangePageIndex={handleChangePageIndex}
            onChangePageSize={handleChangePageSize}
          />
        </div>
      </main>

      <ManufacturerInfoPopup
        isActive={isActivePopupAdd}
        edittingId={edittingManufacturerId}
        onClose={handleClosePopup}
      />
    </div>
  )
}

export default ManufacturersAdmin
