import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import ProductCard from '../../components/ProductCard/ProductCard'
import Gallery from '../../components/Gallery/Gallery'
import InputField from '../../components/InputField/InputField'
import Combobox from '../../components/Combobox/Combobox'
import Button from '../../components/Button/Button'

import baseApi from '../../api/BaseApi'
import { TypeStyle } from '../../enums/InputFieldEnum'
import { ComboboxLabelPositionEnum } from '../../enums/ComboboxEnum'
import { useDispatch, useSelector } from 'react-redux'
import { triggerScrollTop } from '../../slices/scrollSlice'
import { useRouter } from 'next/router'

const SORT_OPTIONS = [
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
]

const Products = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [manufacturers, setManufacturers] = useState([])
  const [selectedSortOption, setSelectedSortOption] = useState('price|-1')
  const [selectedManufacturer, setSelectedManufacturer] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState('16')
  const [searchText, setSearchText] = useState('')
  const [searchFunc, setSearchFunc] = useState(null)
  const [filterClass, setFilterClass] = useState(
    'flex items-center justify-between mt-6 py-3 z-10 backdrop-blur-lg transition-all duration-300'
  )

  const scrollVal = useSelector((state) => state.scroll.scrollVal)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    getInitData()
  }, [])

  useEffect(() => {
    if (scrollVal > 24) {
      setFilterClass(
        'flex items-center justify-between sticky top-0 py-3 px-2 z-10 bg-white transition-all duration-300 rounded-b-md shadow-md'
      )
    } else if (scrollVal) {
      setFilterClass(
        'flex items-center justify-between mt-6 py-3 px-2 z-10 bg-white transition-all duration-300 rounded-b-md'
      )
    }
  }, [scrollVal])

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value)
    clearTimeout(searchFunc)
    setSearchFunc(
      setTimeout(() => {
        getPaging(generateQuery({ SearchText: e.target.value }))
      }, 500)
    )
  }

  const handleChangeManufacturer = (e) => {
    getPaging(generateQuery({ Manufacturer: e, PageIndex: 1 }))
    setPageIndex(1)
    setSelectedManufacturer(e)
  }

  const handleChangeSort = (e) => {
    getPaging(generateQuery({ Sort: e, PageIndex: 1 }))
    setPageIndex(1)
    setSelectedSortOption(e)
  }

  const handleChangePageIndex = (newPageIdx) => {
    setPageIndex(newPageIdx)
    getPaging(generateQuery({ PageIndex: newPageIdx }))
  }

  const handleChangePageSize = (newPageSize) => {
    setPageSize(newPageSize)
    setPageIndex(1)
    getPaging(generateQuery({ PageSize: newPageSize, PageIndex: 1 }))
  }

  const getInitData = async () => {
    const query = router.query
    const apiQuery = {
      PageIndex: 1,
    }
    if (query.m) {
      setSelectedManufacturer(query.m)
      apiQuery.Manufacturer = query.m
    }

    try {
      getPaging(generateQuery(apiQuery))
      const res = await baseApi.get('manufacturers')
      setManufacturers([
        {
          _id: '',
          name: 'Tất cả',
        },
        ...res.data.data,
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoadMore = async () => {
    if (products.length < totalRecords) {
      const newPageIndex = pageIndex + 1
      setPageIndex(newPageIndex)
      getPaging(generateQuery({ PageIndex: newPageIndex }), true)
    }
  }

  const getPaging = async (query = '', isLoadMore = false) => {
    setIsLoading(true)
    try {
      const res = await baseApi.get(`/cars/query?${query}`)
      if (isLoadMore === true) {
        setProducts([...products, ...res.data.data.pageData])
      } else {
        setProducts([...res.data.data.pageData])
      }
      setTotalRecords(res.data.data.totalRecords)
      setIsLoading(false)
      if (isLoadMore === false) {
        dispatch(triggerScrollTop())
      }
      setFilterClass(
        'flex items-center justify-between mt-6 py-3 px-2 z-10 bg-white transition-all duration-300 rounded-b-md'
      )
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const generateQuery = ({
    SearchText = null,
    PageSize = null,
    PageIndex = null,
    Sort = null,
    Manufacturer = null,
  }) => {
    const query = `pageSize=${PageSize || pageSize}&pageIndex=${
      PageIndex || pageIndex
    }&manufacturer=${Manufacturer !== null ? Manufacturer : selectedManufacturer}&searchText=${
      SearchText !== null ? SearchText : searchText
    }&sort=${Sort || selectedSortOption}`
    return query
  }

  return (
    <div>
      <Head>
        <title>Sản phẩm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <div className="container mx-auto">
          <div className={filterClass}>
            <div className="w-96">
              <InputField
                id="search-text"
                name="search-text"
                placeholder="Tìm kiếm theo tên sản phẩm ..."
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
            </div>
          </div>
          <div className="mt-6">
            <Gallery>
              {products.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </Gallery>
            {products.length < totalRecords && (
              <div>
                <Button
                  className="mx-auto mt-10"
                  style={{
                    height: 44,
                    borderRadius: 6,
                  }}
                  isLoading={isLoading}
                  onClick={handleLoadMore}
                >
                  Tải thêm
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Products
