import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import testCsv from '../constants/PaymentAcc.csv';
import Papa from 'papaparse';
import emailjs from "emailjs-com";
import loadingVd from "../assets/Loading2.mp4";
import { useNavigate } from 'react-router-dom';
export default function Payment() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const total_price = params.get('total');
    const finel_price = total_price - total_price*0.1;
    const orderdMeals = JSON.parse(params.get('orderdMeals'));
    const [fullName, setFullName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [errormsg,seterrormsg]= useState('')
    const [success,setsuccess] = useState('')
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        Papa.parse(testCsv, {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data); 
                
            },
            error: (error) => {
                console.error("Error reading CSV:", error);
            },
        });
    }, []);

    const sendOrderConfirmation = (name, email, summary, total) => {
        const templateParams = {
            name: name,
            email: email,
            orderSummary: summary,
            total: total,
        };

        emailjs
            .send(
                "service_jjhvo7i", 
                "template_zm0mq9e", 
                templateParams,
                "fMHjqUSy_ixME3rTP" 
            )
            .then(
                (response) => {
                    console.log("Email sent successfully!", response.status, response.text);
                },
                (error) => {
                    console.error("Failed to send email:", error);
                }
            );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment Info:', { fullName, cardNumber, cardExpiration, cvv });

        if (data.length > 0) {
            let isValid = false;

            data.forEach((item) => {
                if (
                    item.FullName === fullName &&
                    item.CardNumber === cardNumber &&
                    item.Expiration === cardExpiration &&
                    item.CVV === cvv
                ) {
                    isValid = true;
                }
            });

            if (isValid) {
                setShowLoading(true);

                setTimeout(() => {
                    const reserve_info = JSON.parse(localStorage.getItem('reserve_info'));
                    const url = "http://localhost/riadapis/index.php?action=reserve";
                    let fdata = new FormData();
                    fdata.append('guests', reserve_info.guests);
                    fdata.append('date', reserve_info.date);
                    fdata.append('time', reserve_info.time);
                    fdata.append('username', reserve_info.username);
                    fdata.append('table_id', reserve_info.table_id);
                    fdata.append("total_price",finel_price);
                    fdata.append('meals', JSON.stringify(orderdMeals));

                    axios.post(url, fdata, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                        .then((response) => {
                            console.log(response.data);
                            if (response.data.status === "success") {
                                console.log("Payment successful!");
                                setsuccess("Payment successful!");
                                seterrormsg("")
                                const clientInfo = response.data.data;
                                console.log(clientInfo);

                                // sendOrderConfirmation(
                                //     clientInfo.first_name,
                                //     clientInfo.email,
                                //     orderdMeals.map((meal) => `${meal.qt} x ${meal.name}`).join(", "),
                                //     finel_price
                                // );
                                navigate("/");
                            }
                        })
                        .catch((error) => {
                            console.error("Error in request:", error);
                           
                        });

                    setShowLoading(false);
                    setShowThankYouMessage(true);
                }, 3000);
            } else {
                console.log('Invalid payment information.');
                seterrormsg('Invalid payment information.');
                setsuccess("")
            }
        }
    };

    return (
        <div className="bg-zinc-100 min-h-screen py-16 flex items-center justify-center flex-col">
        <div className="lg:absolute lg:top-20">
            {showLoading && (
                <div className="flex flex-col items-center">
                    <video src={loadingVd} autoPlay playsInline muted width={100} />
                    <p className="text-center mt-4">Processing Payment...</p>
                </div>
            )}
            {showThankYouMessage && (
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-semibold text-green-600">Thank You!</h2>
                    <h3>Your order has been successfully processed!</h3>
                    <p>You will receive order information in your email shortly.</p>
                </div>
            )}
        </div>
    
        <section className="bg-white shadow-2xl rounded-xl p-8 mt-28 max-w-4xl w-full">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                Complete Your Payment
            </h2>
            <div className="lg:flex lg:gap-12 flex-col md:flex-row">
                {/* Form Section */}
                <form
                    className="lg:w-1/2 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 mb-8 md:mb-0"
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
                    {errormsg && <div className="text-red-500 text-sm mt-4 text-center">{errormsg}</div>}
                    {success && <div className="text-green-700 text-sm mt-4 text-center">{success}</div>}
                    <button
                        className="flex py-2 text-black border hover:bg-neutral-900 hover:text-white focus:outline-none text-xl px-5 text-center border-neutral-900 mx-auto mt-5 font-semibold rounded-lg transition-all duration-200"
                        type="submit"
                    >
                        Pay Now
                    </button>
                </form>
    
                {/* Summary Section */}
                <div className="lg:w-1/2 bg-gradient-to-tl from-[#eafde3] to-white rounded-lg shadow-lg border border-gray-200 p-6">
                    <div className="space-y-4">
                        <dl className="flex justify-between">
                            <dt className="text-sm font-semibold text-gray-600">Original price</dt>
                            <dd className="text-sm font-semibold">{total_price} DH</dd>
                        </dl>
                        <dl className="flex justify-between">
                            <dt className="text-sm font-semibold text-gray-600">Savings</dt>
                            <dd className="text-sm font-semibold text-green-600">- 10 %</dd>
                        </dl>
                        <hr />
                        <dl className="flex justify-between">
                            <dt className="text-xl font-semibold text-gray-900">Total</dt>
                            <dd className="text-xl font-semibold text-gray-900">{finel_price} DH</dd>
                        </dl>
                    </div>
                    <div className="flex items-center justify-center gap-10 mt-6">
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
