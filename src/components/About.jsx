import React from 'react';
import { useTranslation } from 'react-i18next';  
import about from '../assets/about.jpeg';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useTranslation(); 

  return (
    <section className="container mx-auto mb-8" id="about">
      <h2 className="text-center text-4xl tracking-tighter mb-11 lg:text-5xl">
        About Us
      </h2>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <img src={about} alt="#" className="rounded-3xl lg:rotate-3" />
        </div>
        <div className="w-full lg:w-1/2 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl tracking-tighter ml-11 mb-9 mt-5 sm:mt-5 md:mt-0"
          >
            {t('ABOUT.header')}  {/* Use the translation here */}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateY: "180deg" }}
            whileInView={{ opacity: 1, y: 0, rotateY: "0deg" }}
            transition={{ duration: 0.9, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-rose-300 lg:rotate-3 w-36 rounded-3xl h-4 absolute top-16 left-14 md:top-12 lg:top-16"
          ></motion.div>
          <div className="ml-11 rounded-lg">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              viewport={{ once: true }}
              className="text-2xl tracking-tight leading-snug"
            >
              {t('ABOUT.content')}  {/* Use the translation here */}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
