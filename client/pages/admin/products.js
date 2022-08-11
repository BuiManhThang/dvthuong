import React, { useEffect, useState } from 'react'
import baseApi from '../../api/BaseApi'
import { DataTypeEnum } from '../../enums/DataTypeEnum'
import { ComboboxLabelPositionEnum } from '../../enums/ComboboxEnum'

import Head from 'next/head'
import Button from '../../components/Button/Button'
import ProductInfoPopup from '../../components/ProductPopup/ProductInfoPopup'
import Table from '../../components/Table/Table'
import InputField, { TypeStyle } from '../../components/InputField/InputField'
import Combobox from '../../components/Combobox/Combobox'
import Paging from '../../components/Paging/Paging'

const HEADERS = [
  {
    caption: 'Mã sản phẩm',
    fieldName: 'code',
    dataType: DataTypeEnum.Text,
    width: '140px',
    minWidth: '140px',
  },
  {
    caption: 'Tên sản phẩm',
    fieldName: 'name',
    dataType: DataTypeEnum.Text,
    width: 'unset',
    minWidth: '200px',
  },
  {
    caption: 'Hãng sản xuất',
    fieldName: 'name',
    dataType: DataTypeEnum.Text,
    minWidth: '200px',
    parent: 'manufacturer',
  },
  {
    caption: 'Giá',
    fieldName: 'price',
    dataType: DataTypeEnum.Number,
    width: '200px',
    minWidth: '200px',
  },
  {
    caption: 'Số lượng',
    fieldName: 'number',
    dataType: DataTypeEnum.Number,
    width: '150px',
    minWidth: '150px',
  },
]

const SORT_OPTIONS = [
  {
    _id: 'code|1',
    name: 'Mã sản phẩm tăng dần',
  },
  {
    _id: 'code|-1',
    name: 'Mã sản phẩm giảm dần',
  },
  {
    _id: 'name|1',
    name: 'Tên sản phẩm tăng dần',
  },
  {
    _id: 'name|-1',
    name: 'Tên sản phẩm giảm dần',
  },
  {
    _id: 'manufacturer|1',
    name: 'Tên nhà sản xuất tăng dần',
  },
  {
    _id: 'manufacturer|-1',
    name: 'Tên nhà sản xuất giảm dần',
  },
  {
    _id: 'price|1',
    name: 'Giá tăng dần',
  },
  {
    _id: 'price|-1',
    name: 'Giá giảm dần',
  },
  {
    _id: 'number|1',
    name: 'Số lượng tăng dần',
  },
  {
    _id: 'number|-1',
    name: 'Số lượng giảm dần',
  },
]

const ProductsAdmin = () => {
  const [isActivePopupAdd, setIsActivePopupAdd] = useState(false)
  const [products, setProducts] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [edittingProductId, setEdittingProductId] = useState('')
  const [searchText, setSearchText] = useState('')
  const [selectedManufacturer, setSelectedManufacturer] = useState('')
  const [selectedSortOption, setSelectedSortOption] = useState('code|1')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState('30')
  const [totalRecords, setTotalRecords] = useState(0)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    setIsLoading(true)
    try {
      const [_, resManufacturer] = await Promise.all([
        getPagingProducts(generateQuery({ PageIndex: 1 })),
        baseApi.get('manufacturers'),
      ])

      setManufacturers([
        {
          _id: '',
          name: 'Tất cả',
        },
        ...resManufacturer.data.data,
      ])

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const handleEditRow = (productId) => {
    console.log(productId)
    setEdittingProductId(productId)
    setIsActivePopupAdd(true)
  }

  const handleDeleteRow = (productId) => {
    console.log(productId)
  }

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const handleChangeManufacturer = (e) => {
    getPagingProducts(generateQuery({ Manufacturer: e }))
    setPageIndex(1)
    setSelectedManufacturer(e)
  }

  const handleChangeSort = (e) => {
    getPagingProducts(generateQuery({ Sort: e }))
    setPageIndex(1)
    setSelectedSortOption(e)
  }

  const handleChangePageIndex = (newPageIdx) => {
    setPageIndex(newPageIdx)
    getPagingProducts(generateQuery({ PageIndex: newPageIdx }))
  }

  const handleChangePageSize = (newPageSize) => {
    setPageSize(newPageSize)
    setPageIndex(1)
    getPagingProducts(generateQuery({ PageSize: newPageSize }))
  }

  const generateQuery = ({
    PageSize = null,
    PageIndex = null,
    Manufacturer = null,
    Sort = null,
  }) => {
    const query = `pageSize=${PageSize || pageSize}&pageIndex=${
      PageIndex || pageIndex
    }&manufacturer=${Manufacturer === null ? selectedManufacturer : Manufacturer}&sort=${
      Sort || selectedSortOption
    }`
    return query
  }

  const getPagingProducts = async (query = '') => {
    setIsLoading(true)
    try {
      const resProduct = await baseApi.get(`/cars/query?${query}`)
      setProducts([...resProduct.data.data.pageData])
      setTotalRecords(resProduct.data.data.totalRecords)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const handleClosePopup = (isReload = false) => {
    setIsActivePopupAdd(false)
    setEdittingProductId('')
    if (isReload) {
      getPagingProducts(generateQuery({ PageIndex: 1 }))
    }
  }

  return (
    <div className="container mx-auto px-6 mt-6">
      <Head>
        <title>Sản phẩm</title>
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
                id="manufacturer"
                name="manufacturer"
                items={manufacturers}
                value={selectedManufacturer}
                label="Nhà cung cấp"
                labelPosition={ComboboxLabelPositionEnum.Left}
                onChange={handleChangeManufacturer}
              />
            </div>
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
              <span className="leading-none">Thêm sản phẩm</span>
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <Table
            headers={HEADERS}
            data={products}
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

      <ProductInfoPopup
        isActive={isActivePopupAdd}
        edittingProductId={edittingProductId}
        onClose={handleClosePopup}
      />
    </div>
  )
}

export default ProductsAdmin
