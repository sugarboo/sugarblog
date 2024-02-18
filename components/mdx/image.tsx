'use client'

import {
  ComponentPropsWithoutRef,
  ImgHTMLAttributes,
  useState
} from 'react'
import Image from 'next/image'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & ComponentPropsWithoutRef<typeof Image>

const MDXImage = ({
  src,
  alt,
}: ImageProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Image
          src={src}
          alt={alt}
          // full width & auto height
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          draggable={false}
          className='my-4 rounded-lg hover:cursor-pointer'
        />
      </DialogTrigger>
      <DialogContent hideclose className='max-w-full max-h-[90vh] p-0 bg-transparent border-transparent overflow-hidden'>
        <Image
          src={src}
          alt={alt}
          // full width & auto height
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', maxHeight: '90vh' }}
          draggable={false}
          className='object-scale-down cursor-pointer'
          onClick={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
 
export default MDXImage
