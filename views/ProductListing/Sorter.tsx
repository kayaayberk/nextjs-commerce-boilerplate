'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { Icons } from '@/components/Icons/Icons'
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'

export enum Sorting {
  PRICE_DESC = 'minPrice:desc',
  PRICE_ASC = 'minPrice:asc',
  DATE_ASC = 'updatedAtTimestamp:asc',
  DATE_DESC = 'updatedAtTimestamp:desc',
  RELEVANCY = '',
}

const LABELS = {
  [Sorting.PRICE_DESC]: 'Price: High to Low',
  [Sorting.PRICE_ASC]: 'Price: Low to High',
  [Sorting.DATE_ASC]: 'Newest',
  [Sorting.DATE_DESC]: 'Oldest',
  [Sorting.RELEVANCY]: 'Relevancy',
}

interface SorterProps {
  className?: string
}

export function Sorter({ className }: SorterProps) {
  const [sortBy, setSortBy] = useQueryState('sortBy', {
    ...parseAsStringEnum<Sorting>(Object.values(Sorting)).withDefault(Sorting.RELEVANCY),
    shallow: false,
    history: 'push',
  })

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger aria-expanded={undefined} asChild>
          <div className='flex cursor-pointer items-center justify-center gap-0.5 whitespace-nowrap text-[15px] text-black'>
            Sort by: <span className='text-black'>{LABELS[sortBy]}</span>
            <Icons.ChevronDown className='size-4' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-[240px] rounded-b-md bg-white px-0 text-neutral-500 shadow-lg'
          align='end'
        >
          {Object.entries(LABELS).map(([key, label]) => (
            <DropdownMenuItem
              key={label}
              className='cursor-pointer border-b border-neutral-200 py-2 last:border-b-0 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50'
              onClick={() => setSortBy(key as Sorting)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
