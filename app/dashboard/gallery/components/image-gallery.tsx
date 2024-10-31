'use client'
import { Cat } from '@prisma/client'


export default function ResponsiveGallery({ cats }: { cats: Cat[] }) {
  return (
    <div className="gap-x-3 gap-y-2 columns-1 md:columns-2 lg:columns-3 xl:columns-4 p-4">
      {cats.map(({ image, name }, idx) => {

        return (
          <div className='rounded-md border-slate-800 overflow-hidden cursor-pointer'>
            <img src={image!} alt={name} className='aspect-auto rounded-lg hover:scale-[110%] transform transition-transform duration-300' />
          </div>
        )
      })}
    </div>
  )
}