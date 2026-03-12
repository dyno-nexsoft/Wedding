import React from 'react';
import { motion } from 'motion/react';

export default function Gallery() {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5w71RBmGOTrVcsZ030B1z9WOEt3uX-eUILAhrQRUEf-kQfU5-h8CDToLZixQ0zbZ1dnXmjJRxOsdQoDNkndeQIPqrCE8HnLlkVUyp1XqupHRwR9yJQV8fztzPxzZDjbIoP2ZaJIC3zFHK8kNjqW8G3M-qO3ezfxrJv7UDRaIekYwjkfjv7U2R42Jaqnri62YnABilb8Q4P2OaLbYGXpd2FSlvny1d-oLrrAgZQ92PDX7w-5047V3vpHdN2mDEyE6QueRiGZQ-edM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDlK4kCGDjxZhs32vFYC0MrluopQXrKS4e0H-JtqfJ63NSGppop1MDsasJs9Tz089xJlXFmQSCi21qHFw30Nq6rDqzB6PGZzXSB7bxyw6j735ZqXi_vGrFqgAQuYQWfFmweU5_UC2hcBqYoLGnmWqgD7eWbpFl0IJb-oPQ6NFr67ViaVDFvwcJfQ6A5Qj3l3shtlzURtndtVgSfTM2Z0cO2WDFAckFclsESkqaHq_JKIBOfBVfOpWMKoReCqmhy0Gp-BmNb0E6saE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7cO3xjDRDcOiJpjTLwHolpEN4PmUjczQGWy_ZJCIwxmWGrubmyVfNGyBc-od1nZ0icKh9qdSp12lcKStVnWDBkDATEluMRLuDLDE3eSM-_iuV9Ude29HQEa1QGPjZSKbWKEBRHWIXXn1a3NPlyVU_cfQCu_CKbRXXq6i7p6z8gQ2GS4pprKqy5gMJJ-XCxpQMJaF5zxtG02Gl-fU_iDae1dFU2J-h6fJivnY5HSebD8O12_DzFoEBBmqqHflN0bit6kAbxCx-Nls",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAr7UWeDsd84goEQnrdMtT_EYYGfc2DU4KcRExDHSODtuOHUu7Iuk_opsP0dM9lVBDfhpDGBPBE63r-cyi7OAGAWz3kx8134bNPmHX0AQaDfm_zppl6f3opDM33DJV70IofYnHK5jEkm1f-w9X0ajjxGwGKm8h1C02vlSDpmJz9ccNhgkgyfMOL9iAg9JkkSnheiJ3CCpb3KlQ4GczbChbEqPtPZyrhn3UYwOFeHNvSBYVp0uYZ3On6aG8CNUTDRrb5YQjIoUtenPA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCXO9K7VXmzT3guwGcDZfErF9aOL3e39W2ObbSOjj_DarJYgUwirx3OJ8lFK7N5Cf2xFZVfP02dMxGYvkAGmuXq83eQ7iv4xfIB-yFaTgORaF0X-M3Mc8Ft30OlNO3-2J46R6dciRoxZdGC_I0q6thkmj0SmICPIt0aHOZ6CJCFYxXqzorLlClI4c0-uVZno5XAzonNX-yU6TnjDfqqSZNRVooiZ8DFGKrwAoXWFpsPh0pc1H5ajasTub7MOhadCqReCZHCkb8EC_8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA4paBZRyIs3mBVSUQpDbfocsjk89jHTi5Ilk5JB-TiifiYF5s_naSABXOY0YIKJjD6C8jufLmu-mlUfiau1S3bPGidj0OzaHxBCAYQRtG5NC6sdlCkTTt8yv12-gloJ5EpiJxF2R7MSG0CL2CJh2m_cM2W-a2YLDfE2PBiU7mlG5G1-mTKCFrBCHpQ9LobcMCwvC6zdJQDmfCkgZDTXnQfW4lehuqwithLMROmU3_uwMuPiNCKhExWmYh09TP32Kdm3PxDwFW55t0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCH8PHNJljmOAHYejLTK4hYzTBX7-wcJJn7xefUI6_WdCH8Zuj14XkbVCmfwUKIp-YTwEJ1iwlXEoHTZqz4rhazeEQNHPYd6-Kx0BATKvOXoj3r58dtX5nrslcMirwMWk7LglPmlLTEUecVTNlTiZSYdnc17Vgod-kRjWZkDYhmFsaOgZuENdGBP1WPRIIqen36NnCIkJ8w1EwzsUsVziT-Arhl5DzcTmldhLn44-zDf2Vhc-u2BjChReMOc5q_90bCFw50Aokz588",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBS6wjlRpH0OzaZCc9ap4frTxbXqfJWVenaZZzZEpB-T0veMStBuhebvX8gR9nnSR8KvdrWRlKDwwFhq8wO_tYpO9OFUOzWF0-5dIgrKwwYQYfnTypGL3QE3pog9-IYoxNrVMWQRWtmYMGZVbyxAXpF3RE4W2ODnXOacKOWjzD9rC99qMMvJ9FQFK_2haQrupy3U_g9pWZf7ZVgVSMHhKE7iqU2s8I985Iyk0IUDTFx49VKlNskp1RzoRwnKP8rlRzG20b9QTGG4gQ"
  ];

  return (
    <section id="gallery" className="py-24 px-6 bg-[#FFFAF5]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-5xl font-cursive text-roseGold mb-4">Thư Viện Ảnh</h2>
        <div className="w-24 h-1 bg-champagne mx-auto"></div>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
        {images.map((img, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="overflow-hidden h-40 sm:h-48 md:h-64 shadow-md rounded-lg"
          >
            <img 
              src={img} 
              alt={`Wedding Gallery ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
