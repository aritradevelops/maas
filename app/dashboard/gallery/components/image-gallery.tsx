import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from 'lucide-react'
import prisma from '@/lib/db'



export default async function ResponsiveGallery() {
  const cats = await prisma.cat.findMany({})
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cats.map(({ image }, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="relative aspect-[3/2] cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={'jsld'}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[720px]">
              <div className="relative aspect-[3/2] w-full">
                <img
                  src={image}
                  alt={'jklfs'}
                  sizes="(max-width: 720px) 100vw, 720px"
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}