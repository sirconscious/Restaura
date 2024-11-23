import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import testCsv from '../assets/PaymentAcc.csv';
import Papa from 'papaparse';
export default function Payment() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const total_price = params.get('total');
    const finel_price = total_price - 50;
    const orderdMeals = JSON.parse(params.get('orderdMeals'));
    const [fullName, setFullName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cvv, setCvv] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        Papa.parse(testCsv, {
            download: true,
            header: true, // Parse as JSON objects
            complete: (results) => {
                setData(results.data); // Parsed data
            },
            error: (error) => {
                console.error("Error reading CSV:", error);
            },
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment Info:', { fullName, cardNumber, cardExpiration, cvv });

        if (data.length > 0) {
            let isValid = false; // Track validity

            data.forEach((item) => {

                if (
                    item.FullName === fullName &&
                    item.CardNumber === cardNumber &&
                    item.Expiration === cardExpiration &&
                    item.CVV === cvv
                ) {
                    isValid = true; // Found a valid match
                }
            });

            if (isValid) {
                
                const reserve_info = JSON.parse(localStorage.getItem('reserve_info'));
                const url = "http://localhost/riadapis/index.php?action=reserve";
                let fdata = new FormData();
                fdata.append('guests', reserve_info.guests);
                fdata.append('date', reserve_info.date);
                fdata.append('time', reserve_info.time);
                fdata.append('username', reserve_info.username);
                fdata.append('table_id', reserve_info.table_id);
                fdata.append("total_price", orderdMeals.reduce((acc, meal) => acc + meal.price * meal.qt, 0));
                fdata.append('meals', JSON.stringify(orderdMeals));

                axios.post(url, fdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.status === "success") {
                            console.log(response);
                            console.log('Payment successful!');
                            alert('Payment successful!');
                            console.log(data);
            
                        }
                    })
                    .catch((error) => {
                        console.error("Error in request:", error);
                    });

            } else {
                console.log('Invalid payment information.');
                alert('Invalid payment information.');
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-white to-[#e1f4ff] min-h-screen py-16 flex items-center justify-center">
            <section className="bg-gradient-to-br from-white to-[#77afe7] shadow-lg rounded-xl p-8 max-w-5xl w-full">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                    Complete Your Payment
                </h2>
                <div className="lg:flex lg:gap-12">
                    {/* Form Section */}
                    <form
                        className="lg:w-1/2 bg-white rounded-lg shadow-md border border-gray-200 p-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="full_name"
                                    className="block text-sm font-semibold text-gray-600"
                                >
                                    Full name (as displayed on card)*
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition hover:shadow-sm"
                                    placeholder="Bonnie Green"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="card-number-input"
                                    className="block text-sm font-semibold text-gray-600"
                                >
                                    Card number*
                                </label>
                                <input
                                    type="text"
                                    id="card-number-input"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition hover:shadow-sm"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="card-expiration-input"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Expiration*
                                    </label>
                                    <input
                                        type="text"
                                        id="card-expiration-input"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition hover:shadow-sm"
                                        placeholder="MM/YY"
                                        value={cardExpiration}
                                        onChange={(e) => setCardExpiration(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label
                                        htmlFor="cvv-input"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        CVV*
                                    </label>
                                    <input
                                        type="text"
                                        id="cvv-input"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition hover:shadow-sm"
                                        placeholder="123"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="flex py-2 text-black border hover:bg-neutral-900 hover:text-white focus:outline-none text-xl px-5 text-center border-neutral-900 mx-auto mt-5 font-semibold rounded-lg transition-all duration-200"
                            type="submit"
                        >
                            Pay Now
                        </button>
                    </form>

                    {/* Summary Section */}
                    <div className="lg:w-1/2 bg-gradient-to-tl from-[#e3f2fd] to-white rounded-lg shadow-lg border border-gray-200 p-6 mt-6 lg:mt-0">
                        <div className="space-y-4">
                            <dl className="flex justify-between">
                                <dt className="text-sm font-semibold text-gray-600">
                                    Original price
                                </dt>
                                <dd className="text-sm font-semibold">{total_price} DH</dd>
                            </dl>
                            <dl className="flex justify-between">
                                <dt className="text-sm font-semibold text-gray-600">Savings</dt>
                                <dd className="text-sm font-semibold text-green-600">
                                    - 50 DH
                                </dd>
                            </dl>
                            <dl className="flex justify-between border-t pt-4">
                                <dt className="font-semibold text-gray-800">Total</dt>
                                <dd className="font-semibold">{finel_price} DH</dd>
                            </dl>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <img
                                className="h-8"
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                                alt="Visa"
                            />
                            <img
                                className="h-8"
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                                alt="Mastercard"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
