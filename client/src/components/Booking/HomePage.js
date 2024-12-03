import React, {useEffect, useState} from "react";
import {AutocompleteInput} from "../../shared/AutoComplete";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function HomePage() {
    const [roundTrip, setRoundTrip] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [passengers, setPassengers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });
    const total_seats = passengers.adults + passengers.children;

    const navigate = useNavigate();
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [error, setError] = useState("");

    // Hàm tăng/giảm số lượng hành khách
    const handlePassengerChange = (type, operation) => {
        setPassengers((prev) => {
            const newCount =
                operation === "increment"
                    ? prev[type] + 1
                    : Math.max(0, prev[type] - 1);

            if (type === "adults" && prev.infants > newCount) {
                return { ...prev, [type]: newCount, infants: newCount };
            }
            return { ...prev, [type]: newCount };
        });
    };

    // Tạo chuỗi hiển thị hành khách
    const getPassengerSummary = () => {
        const { adults, children, infants } = passengers;
        return `${adults} người lớn, ${children} trẻ em, ${infants} trẻ sơ sinh`;
    };

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/airportAircraft/allAirports");
                setSuggestions(response.data.map((airport) => ({
                    name: airport.name,
                    city: airport.city,
                    airport_code: airport.airport_code
                })));
            } catch (error) {
                console.error("Error fetching airports info:", error);
            }
        };

        fetchSuggestions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!departure || !destination || !departureDate) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            let response;

            const requestBody = {
                departCity: departure,
                arriveCity: destination,
                departDate: departureDate
            };

            if (roundTrip === true) {
                requestBody.arriveDate = returnDate;
            }

            if (roundTrip === false) {
                response = await axios.post("http://localhost:3001/api/flights/oneway", requestBody);
            } else {
                response = await axios.post("http://localhost:3001/api/flights/roundtrip", requestBody);
            }

            if (response.status === 200) {
                navigate("/booking/flight-selection", {
                    state: {
                        flights: response.data,
                        tripType: roundTrip ? "round-trip" : "one-way",
                        passengers: passengers,
                    }
                });
            } else {
                navigate("/booking/flight-selection", { state: { flights: [] } });
            }
        } catch (error) {
            navigate("/booking/flight-selection", { state: { flights: [] } });
        }
    };
    return (
        <div className="py-10" style={{backgroundImage: "url('https://wallpapercat.com/w/full/3/b/d/21204-1920x1200-desktop-hd-clouds-background-photo.jpg')"}}>
            <div className="border-4 mx-20 my-5 rounded-2xl shadow-lg">
                <div className="h-full flex flex-row p-5"
                     style={{backgroundColor: "#d9f2ff"}}>
                    <div style={{flex: 2}}>
                        <div className="max-w-md mx-auto my-10 bg-white rounded-xl shadow-lg p-6">
                            <form className="space-y-3" onSubmit={handleSubmit}>
                                <div className="space-x-5">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="trip-type"
                                            className="form-radio text-yellow-500"
                                            value="one-way"
                                            checked={roundTrip === true}
                                            onChange={() => setRoundTrip(true)}
                                        />
                                        <span className="ml-1 text-gray-600 text-sm font-medium">Khứ hồi</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="trip-type"
                                            className="form-radio text-yellow-500"
                                            value="round-trip"
                                            checked={roundTrip === false}
                                            onChange={() => setRoundTrip(false)}
                                        />
                                        <span className="ml-1 text-gray-600 text-sm font-medium">Một chiều</span>
                                    </label>
                                </div>

                                <div className="flex gap-2">
                                    <div style={{flex: 5}}>
                                        <label className="text-gray-600 text-sm font-medium"> Điểm khởi hành</label>
                                        <div className="relative">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                className="absolute pl-2 top-2"
                                            >
                                                <path
                                                    d="M3 18h18v2H3zm18.509-9.473a1.61 1.61 0 00-2.036-1.019L15 9 7 6 5 7l6 4-4 2-4-2-1 1 4 4 14.547-5.455a1.611 1.611 0 00.962-2.018z"/>
                                            </svg>
                                            <AutocompleteInput
                                                suggestions={suggestions}
                                                style="w-full pl-10 border-2 border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"
                                                value={departure}
                                                onChange={(e) => setDeparture(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div style={{flex: 3}}>
                                        <label className="text-gray-600 text-sm font-medium"> Ngày đi</label>
                                        <input
                                            type="date"
                                            className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"
                                            value={departureDate}
                                            onChange={(e) => setDepartureDate(e.target.value)}
                                        />
                                    </div>
                                </div>


                                <div className="flex gap-2">
                                    <div style={{flex: 5}}>
                                        <label className="text-gray-600 text-sm font-medium"> Điểm đến</label><br/>
                                        <div className="relative">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                className="absolute pl-2 top-2"
                                            >
                                                <path
                                                    d="M2.5 19h19v2h-19v-2m7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.79-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.03-1.93-.5v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"/>
                                            </svg>
                                            <AutocompleteInput
                                                suggestions={suggestions}
                                                style="w-full pl-10 border-2 border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {roundTrip && (
                                        <div style={{flex: 3}}>
                                            <label className="text-gray-600 text-sm font-medium"> Ngày về</label>
                                            <input
                                                type="date"
                                                className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"
                                                value={returnDate}
                                                onChange={(e) => setReturnDate(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="select-none">
                                    <label className="text-gray-600 text-sm font-medium"> Số hành khách</label>
                                    <div className="relative w-full mx-auto">
                                        <div
                                            className="border-2 w-full border-gray-300 rounded-lg py-2 px-5 mt-1 text-gray-700 text-sm flex justify-between items-center cursor-pointer"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <svg
                                                viewBox="0 0 640 512"
                                                fill="currentColor"
                                                height="1.5em"
                                                width="1.5em"
                                            >
                                                <path
                                                    d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/>
                                            </svg>
                                            <span className="text-gray-700 text-sm">{getPassengerSummary()}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 transform transition-transform ${
                                                    isOpen ? "rotate-180" : ""
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>

                                        {isOpen && (
                                            <div
                                                className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-2">
                                                <div className="flex items-center justify-between p-3">
                                                    <div className="flex flex-col items-center justify-between"
                                                         style={{flex: 1}}>
                                                        <p className="text-gray-700 font-semibold">Người lớn</p>
                                                        <p className="text-sm text-gray-500">12 tuổi trở lên</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("adults", "decrement")}
                                                            disabled={passengers.adults === 1}
                                                        >
                                                            −
                                                        </button>
                                                        <span>{passengers.adults}</span>
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("adults", "increment")}
                                                            disabled={total_seats === 9}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <div
                                                    className="flex items-center justify-between p-3 border-t border-gray-200">
                                                    <div className="flex flex-col items-center justify-between"
                                                         style={{flex: 1}}>
                                                        <p className="text-gray-700 font-semibold">Trẻ em</p>
                                                        <p className="text-sm text-gray-500">2-11 tuổi</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("children", "decrement")}
                                                            disabled={passengers.children === 0}
                                                        >
                                                            −
                                                        </button>
                                                        <span>{passengers.children}</span>
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("children", "increment")}
                                                            disabled={total_seats === 9}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>


                                                <div
                                                    className="flex items-center justify-between p-3 border-t border-gray-200">
                                                    <div className="flex flex-col items-center justify-between"
                                                         style={{flex: 1}}>
                                                        <p className="text-gray-700 font-semibold">Trẻ sơ sinh</p>
                                                        <p className="text-sm text-gray-500">Dưới 2 tuổi</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("infants", "decrement")}
                                                            disabled={passengers.infants === 0}
                                                        >
                                                            −
                                                        </button>
                                                        <span>{passengers.infants}</span>
                                                        <button
                                                            type="button"
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("infants", "increment")}
                                                            disabled={passengers.infants === passengers.adults}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <a href="#" className="hover:underline text-sm text-blue-700 mr-2">Mã khuyến mãi</a>
                                    <input type="text"
                                           className="border-2 border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg p-3"
                                >
                                    Tìm chuyến bay
                                </button>
                            </form>
                        </div>
                    </div>
                    <div
                        className="md:block lg:block hidden"
                        style={{flex: 2}}
                    >
                        <img
                            className=" w-full rounded-2xl object-cover object-center"
                            src="/images/intro.gif"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;