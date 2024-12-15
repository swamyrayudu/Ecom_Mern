import ShoppingFilter from '@/components/shopping-view/filter'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ShoppingListing() {

  // fetch list of products

  return (
    <div className='grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 p-6'>
      {/* Sidebar Filter */}
      <div className='shadow-md rounded-lg p-4 bg-white'>
        <ShoppingFilter/>
      </div>

      {/* Products Listing */}
      <div className='bg-white rounded-lg shadow-md w-full'>
        {/* Header Section */}
        <div className='p-4 border-b flex items-center justify-between bg-gray-50 rounded-t-lg'>
          <h2 className='font-semibold text-xl text-gray-800'>All Products</h2>
          <div className='flex items-center gap-4'>
            <Button variant='outline' className='cursor-text bg-gray-100'>
              10 Products
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size="sm" className='flex items-center gap-2 bg-gray-100'>
                  <ArrowUpDownIcon className='w-4 h-4'/>
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white shadow-lg rounded-md py-2'>
                <DropdownMenuLabel className='px-4 py-2 text-sm text-gray-600'>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator className='border-gray-200'/>
                <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Date</DropdownMenuItem>
                <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Popularity</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Products Content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
          
        </div>
      </div>
    </div>
  )
}
