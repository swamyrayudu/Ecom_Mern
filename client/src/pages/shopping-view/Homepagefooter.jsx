// import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Dumbbell, Facebook, GitFork, TableProperties } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for quality products at unbeatable prices. We
              are committed to delivering a seamless shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Label className="hover:text-gray-200 transition-colors">
                  About Us
                </Label>
              </li>
              <li>
                <Label className="hover:text-gray-200 transition-colors">
                  Contact Us
                </Label>
              </li>
              <li>
                <Label className="hover:text-gray-200 transition-colors">
                  FAQs
                </Label>
              </li>
              <li>
                <Label className="hover:text-gray-200 transition-colors">
                  Terms & Conditions
                </Label>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: swamyrayudu7288@gmail.com</li>
              <li>Phone: 7288819391</li>
              <li>Address: India,hydrabad </li>
            </ul>
          </div>

          {/* Social Media and Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Stay Connected
            </h3>
            <div className="flex space-x-4 mb-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fa-brands fa-facebook text-xl"></i>
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fa-brands fa-instagram text-xl"></i>
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fa-brands fa-x-twitter text-xl"></i>
              </Link>
              <Link
                to="https://www.linkedin.com/in/rayudu-veera-venkata-swamy"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fa-brands fa-linkedin text-xl"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-600 pt-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 E-Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
