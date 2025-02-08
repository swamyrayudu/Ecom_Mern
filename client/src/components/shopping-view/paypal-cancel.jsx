import React from 'react';
import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function PaypalCancel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 animate-fadeIn">
      <XCircle className="text-red-500 w-24 h-24 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-slideInDown">Payment Cancelled</h1>
      <p className="text-lg text-gray-600 mb-8 animate-slideInUp">Your payment was cancelled. Please try again or contact support if you need assistance.</p>
      <Button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 animate-slideInUp">
        Go to Home
      </Button>
    </div>
  );
}
