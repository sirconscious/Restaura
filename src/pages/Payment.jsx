import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import testCsv from "../assets/PaymentAcc.csv";

export default function Payment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const total_price = parseFloat(params.get("total"));
  const final_price = total_price - 50;
  const orderedMeals = JSON.parse(params.get("orderdMeals"));

  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(testCsv, {
      download: true,
      header: true,
      complete: (results) => setData(results.data),
      error: (error) => console.error("Error reading CSV:", error),
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidPayment = data.some(
      (item) =>
        item.FullName === fullName &&
        item.CardNumber === cardNumber &&
        item.Expiration === cardExpiration &&
        item.CVV === cvv
    );

    if (isValidPayment) {
      const reserve_info = JSON.parse(localStorage.getItem("reserve_info"));
      const url = "http://localhost/riadapis/index.php?action=reserve";

      const fdata = new FormData();
      fdata.append("guests", reserve_info.guests);
      fdata.append("date", reserve_info.date);
      fdata.append("time", reserve_info.time);
      fdata.append("username", reserve_info.username);
      fdata.append("table_id", reserve_info.table_id);
      fdata.append(
        "total_price",
        orderedMeals.reduce((acc, meal) => acc + meal.price * meal.qt, 0)
      );
      fdata.append("meals", JSON.stringify(orderedMeals));

      axios
        .post(url, fdata, { headers: { "Content-Type": "multipart/form-data" } })
        .then((response) => {
          if (response.data.status === "success") {
            alert("Payment successful!");
          }
        })
        .catch((error) => console.error("Error in request:", error));
    } else {
      alert("Invalid payment information.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#e1f4ff] min-h-screen py-16 flex items-center justify-center">
      <section className="bg-gradient-to-br from-white to-[#77afe7] shadow-lg rounded-xl p-8 max-w-5xl w-full">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Complete Your Payment
        </h2>
        <div className="lg:flex lg:gap-12">
          {/* Payment Form */}
          <form
            className="lg:w-1/2 bg-white rounded-lg shadow-md border border-gray-200 p-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <InputField
                label="Full name (as displayed on card)*"
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Bonnie Green"
                required
              />
              <InputField
                label="Card number*"
                id="card_number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                required
              />
              <div className="flex gap-4">
                <InputField
                  label="Expiration*"
                  id="card_expiration"
                  value={cardExpiration}
                  onChange={(e) => setCardExpiration(e.target.value)}
                  placeholder="MM/YY"
                  required
                  className="w-1/2"
                />
                <InputField
                  label="CVV*"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                  className="w-1/2"
                />
              </div>
            </div>
            <button
              className="flex py-2 text-black border hover:bg-neutral-900 hover:text-white focus:outline-none text-xl px-5 mx-auto mt-5 font-semibold rounded-lg transition-all duration-200"
              type="submit"
            >
              Pay Now
            </button>
          </form>

          {/* Summary Section */}
          <Summary total_price={total_price} final_price={final_price} />
        </div>
      </section>
    </div>
  );
}

function InputField({ label, id, value, onChange, placeholder, required, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition hover:shadow-sm"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function Summary({ total_price, final_price }) {
  return (
    <div className="lg:w-1/2 bg-gradient-to-tl from-[#e3f2fd] to-white rounded-lg shadow-lg border border-gray-200 p-6 mt-6 lg:mt-0">
      <dl className="space-y-4">
        <SummaryItem label="Original price" value={`${total_price} DH`} />
        <SummaryItem label="Savings" value="- 50 DH" isSaving />
        <SummaryItem label="Total" value={`${final_price} DH`} isTotal />
      </dl>
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
  );
}

function SummaryItem({ label, value, isSaving, isTotal }) {
  return (
    <div className={`flex justify-between ${isTotal ? "border-t pt-4 font-semibold text-gray-800" : ""}`}>
      <dt className={`text-sm font-semibold ${isSaving ? "text-green-600" : "text-gray-600"}`}>
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
