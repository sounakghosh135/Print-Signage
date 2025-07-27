import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-gray-400">GSTIN- 19BGHPD4925M1Z2</span>
        <p className="text-gray-400">
          © 2025 Print & Signage Company. All rights reserved.
        </p>
      </div>
      <div className="mt-4 md:mt-0 ml-auto text-right pr-4">
        <p className="text-gray-400 text-sm">
          Designed & Developed by{" "}
          <span className="text-teal-400 font-medium">Sounak Kumar Ghosh</span>{" "}
          & <span className="text-teal-400 font-medium">Sandip Dutta</span>
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Contact:{" "}
          <a
            href="tel:+917001356906"
            className="text-teal-400 font-medium hover:underline"
          >
            +91-7001356906
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
