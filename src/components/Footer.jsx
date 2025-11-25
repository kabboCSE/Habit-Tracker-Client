import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              🎯 HabitTracker
            </h3>
            <p className="text-gray-400">
              Build better habits, one day at a time. Track your progress and
              achieve your goals.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: support@habittracker.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-blue-400 transition">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaLinkedin />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 HabitTracker. All rights reserved. |{" "}
            <a href="#" className="hover:text-blue-400">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
