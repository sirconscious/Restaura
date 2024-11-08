import React, { useState } from 'react';
import { REVIEW } from '../constants/index';
import xaviour from '../assets/xaviour.jpeg';
import customer1 from '../assets/customer1.jpeg';
import customer2 from '../assets/customer2.jpeg';
import customer3 from '../assets/customer3.jpeg';
import customer4 from '../assets/customer4.jpeg';
import { motion } from 'framer-motion';

export default function Review() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
        transition: {
            staggerChildren: 0.8,
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        show: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5
        }
    };
    const [reviewF, setReviewF] = useState(REVIEW);
    const [newReview, setNewReview] = useState('');

    function handleReview(e) {
        setNewReview(e.target.value);
    }

    function handleAddReview() {
        if (newReview !== "") {
            setReviewF([...reviewF, { content: newReview, name: 'New Reviewer', profession: 'Reviewer' }]);
            setNewReview('');
        }

    }

    return (
        <section className='container mx-auto mb-8 mt-12' >
            <div className="flex">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex flex-col"
                >
                    {reviewF.map((review, index) => (
                        <div key={index} className="mb-10">
                            <p className='text-2xl font-light leading-normal lg:mx-40 lg:text-[2.5rem]'>
                                &quot; {review.content} &quot;
                            </p>
                            <div className="flex items-center justify-center gap-6">
                                <img src={xaviour} width={80} height={80} className='rounded-full border' />
                                <div className="tracking-tighter">
                                    <h6>{review.name}</h6>
                                    <p className='text-sm text-neutral-500'>{review.profession}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
                <div className="flex items-center gap-4 mt-8">
                    <input
                        type="text"
                        onChange={handleReview}
                        value={newReview}
                        className="p-2 border text-neutral-800 border-gray-300 rounded-lg w-full md:w-auto focus:outline-none focus:border-blue-500 transition duration-200"
                        placeholder="Write your review here..."
                    />
                    <button
                        onClick={handleAddReview}
                        className="px-4 py-2 bg-neutral-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 re bottom-0"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="mt-14 flex flex-col items-center justify-center gap-2 md:flex-row">
                {[customer1, customer2, customer3, customer4].map((customer, index) => (
                    <img
                        key={index}
                        src={customer}
                        className='h-[350px] w-[250px] rounded-br-3xl rounded-tl-3xl object-cover'
                    />
                ))}
            </div>
        </section>
    );
}
