import { MapPin, Mail, Phone } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Contact Us
        </h2>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-xl text-gray-300 mb-8">
            Ready to start your project? Get in touch with us today for a free
            consultation and quote.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center">
              <Phone className="text-teal-400 mr-2" size={20} />
              <a
                href="tel:+917363961105"
                className="text-white mr-2"
              >
                +91-7363961105
              </a>
            </div>
            <div className="flex items-center justify-center md:ml-6">
              <span>
                <Mail className="text-teal-400 mr-2" size={20} />
              </span>
              <a
                href="mailto:swarnalifashions@gmail.com"
                className="text-white mr-2"
              >
                swarnalifashions@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="text-teal-400 mr-2" size={20} />
              <span className="text-white">Durgapur</span>
            </div>
          </div>
        </div>

        <a
          href="https://wa.me/+917363961105"
          target="_blank"
          rel="noopener noreferrer"
          className="w-2xs bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer flex justify-center items-center gap-2 mx-auto"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
          </svg>
          WhatsApp Us Now
        </a>
      </div>
    </section>
  );
};

export default Contact;
