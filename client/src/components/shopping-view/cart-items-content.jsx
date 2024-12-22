


import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem } from '@/store/shopslice/cartSlice'

export default function CartItemContent({cartItems}) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  function handledeleteCart(getCartItem){
    // console.log(getCartItem);
      dispatch(deleteCartItem({ userId : user?.id, productId : getCartItem?.productId }))
  }
  return (
    <div className='flex items-center space-x-4'>
        <img src={cartItems?.image} alt={cartItems?.title} className='w-20 h-20 rounded object-cover' />
        <div className='flex-1'>
          <h3 className='font-extrabold'>{cartItems?.title}</h3>
          <div className='flex items-center mt-1 gap-2'>
            <Button variant='outline' size='icon' className='w-8 h-8 rounded-full'>
              <Minus className='w-4 h-4'/>
              <span className='sr-only'>Decrese</span>
            </Button>
            <span>{cartItems?.quantity}</span>
            <Button variant='outline' size='icon' className='w-8 h-8 rounded-full'>
              <Plus className='w-4 h-4'/>
              <span className='sr-only'>increse</span>
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-end'>
            <p className='font-bold'>
                {((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}₹
            </p>
            <Trash onClick={()=>{handledeleteCart(cartItems)}} className=' cursor-pointer mt-2' size={20}/>
        </div>
    </div>
  )
}
