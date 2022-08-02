import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/index'
import { v4 as uuidv4 } from 'uuid'

const ImageUploader = ({
  name = '',
  id = '',
  text = 'Tải lên hình ảnh',
  value = '',
  onChange = null,
}) => {
  const [imageUrl, setImageUrl] = useState('')
  const imageInputRef = useRef(null)

  useEffect(() => {
    setImageUrl(value)
  }, [value])

  const handleChangeImageInput = async () => {
    const selectedFile = imageInputRef.current.files[0]

    const metadata = {
      contentType: selectedFile.type,
    }

    const filenameArr = selectedFile.name.split('.')
    const fileNameArrLength = filenameArr.length
    const fileExtension = filenameArr[fileNameArrLength - 1]

    try {
      const imageRef = ref(storage, `images/${uuidv4()}.${fileExtension}`)
      const snapshot = await uploadBytes(imageRef, selectedFile, metadata)
      const downloadUrl = await getDownloadURL(snapshot.ref)
      setImageUrl(downloadUrl)
      if (typeof onChange === 'function') {
        onChange(downloadUrl)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white border-dashed border-gray-300 border rounded-lg w-[300px] h-[300px] overflow-hidden relative">
      <input
        ref={imageInputRef}
        className="hidden"
        type="file"
        name={name}
        id={id}
        onChange={handleChangeImageInput}
      />
      {imageUrl ? (
        <Image className="object-cover w-full h-full" src={imageUrl} layout="fill" />
      ) : (
        <label
          className="h-full w-full space-y-6 flex flex-col items-center justify-center"
          htmlFor={id}
        >
          <div className="fill-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Zm2.8-4.85h24.45l-7.35-9.8-6.6 8.55-4.65-6.35ZM9 39V9v30Z" />
            </svg>
          </div>
          <div className="text-gray-500 font-medium">{text}</div>
          <div className="flex items-center px-4 py-2 gap-x-2 border border-gray-300 rounded-lg cursor-pointer text-blue-700 font-medium hover:shadow hover:shadow-gray-300 transition-shadow">
            <div className="fill-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M10.8 20.85H6.575q-2.625 0-4.488-1.8-1.862-1.8-1.862-4.4 0-2.2 1.213-3.962Q2.65 8.925 4.725 8.45 5.5 6.05 7.5 4.6q2-1.45 4.5-1.45 3.05 0 5.25 2.062 2.2 2.063 2.475 5.088 1.8.475 2.925 1.937 1.125 1.463 1.125 3.338 0 2.2-1.537 3.737Q20.7 20.85 18.5 20.85h-5.3v-6.775l1.775 1.775 1.675-1.65L12 9.525 7.35 14.2l1.675 1.65 1.775-1.775Z" />
              </svg>
            </div>
            Tải lên
          </div>
        </label>
      )}
    </div>
  )
}

export default ImageUploader
