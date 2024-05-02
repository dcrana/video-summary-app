'use client'
import { useState, useRef } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StrapiImage } from '../StrapiImag'

interface ImagePickerProps {
  id: string
  name: string
  label: string
  showCard?: boolean
  defaultValue?: string
}

const generateDataUrl = (file: File, callback: (imageUrl: string) => void) => {
  const reader = new FileReader()
  reader.onload = () => callback(reader.result as string)
  reader.readAsDataURL(file)
}

const ImagePreview = ({ dataUrl }: { readonly dataUrl: string }) => {
  return (
    <StrapiImage
      src={dataUrl}
      alt="preview"
      height={200}
      width={200}
      className="rounded-lg w-full object-cover"
    />
  )
}

const ImageCard = ({
  dataUrl,
  fileInput,
}: {
  readonly dataUrl: string
  readonly fileInput: React.RefObject<HTMLInputElement>
}) => {
  console.log('dataUrl', dataUrl)
  const imagePreview = dataUrl ? (
    <ImagePreview dataUrl={dataUrl} />
  ) : (
    <p>No image selected</p>
  )

  return (
    <div className="w-full relative">
      <div className=" flex items-center space-x-4 rounded-md border p-4">
        {imagePreview}
      </div>
      <button
        onClick={() => fileInput.current?.click()}
        className="w-full absolute inset-0"
        type="button"
      ></button>
    </div>
  )
}

const ImagePicker = ({
  id,
  name,
  label,
  defaultValue,
}: Readonly<ImagePickerProps>) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [dataUrl, setDataUrl] = useState<string | null>(defaultValue ?? null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) generateDataUrl(file, setDataUrl)
  }

  return (
    <>
      <div className="hidden">
        <Label htmlFor={name}>{label}</Label>
        <Input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          ref={fileInput}
          accept="image/*"
        />
      </div>
      <ImageCard dataUrl={dataUrl ?? ''} fileInput={fileInput} />
    </>
  )
}

export default ImagePicker