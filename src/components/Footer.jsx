import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-purple-600 to-blue-500 text-white py-8">
      <div className="container mx-auto text-center space-y-4">
        {/* Navigation Links */}
        <div className="space-x-10 mb-6">
          <a
            href="/about"
            className="hover:text-blue-200 transition duration-300"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="hover:text-blue-200 transition duration-300"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-blue-200 transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-blue-200 transition duration-300"
          >
            Terms of Service
          </a>
        </div>

        {/* Copyright and Tagline */}
        <p className="text-sm mb-5 ">
          &copy; {new Date().getFullYear()} Fitness Tracker | All Rights
          Reserved.
        </p>
        <p className="text-sm italic">
          "Your journey to a healthier life begins here."
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition duration-300"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition duration-300"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition duration-300"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition duration-300"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
