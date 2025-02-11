import React from "react";
import { useSelector } from "react-redux";
import { UserCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileShop() {
  const { user } = useSelector((state) => state.auth);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  console.log(user);
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border-4 border-blue-300">
        
        <div className="flex justify-center mb-6">
          <div className="h-28 w-28 bg-blue-500 text-white rounded-full flex items-center justify-center text-5xl font-extrabold shadow-md">
            {userInitial}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <UserCircle className="w-8 h-8 text-blue-500" />
          {user?.name || "Username"}
        </h1>

        <p className="text-lg text-gray-600 mb-4 flex items-center justify-center gap-2">
          <Mail className="w-6 h-6 text-purple-500" />
          {user?.email || "user@example.com"}
        </p>

        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.95 }} 
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300">
          Edit Profile
        </motion.button>
      </motion.div>
    </div>
  );
}
