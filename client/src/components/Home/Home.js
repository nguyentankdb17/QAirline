import './Home.css';
import {useState} from "react";

function Home() {
    const [activeForm, setActiveForm] = useState("booking_form");
    const [roundTrip, setRoundTrip] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [passengers, setPassengers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });
    const total_seats = passengers.adults + passengers.children;

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

    return (
        <div className="Home">
            <div className="section1 flex flex-wrap items-center bg-cover bg-center"
                 style={{backgroundImage: "url('/images/background.png')", height: "600px"}}>
                <div className="pl-6 pr-6 pb-6 flex justify-center items-center" style={{flex:6}}>
                    <div className="mx-auto mt-8 bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-around text-center mb-4">
                            <button
                                className={`text-gray-500 font-bold pb-2 ${
                                    activeForm === "booking_form" ? "text-blue-700 border-b-4 border-blue-700" : "lg:hover:text-blue-700 lg:hover:border-blue-700"
                                }`}
                                onClick={() => setActiveForm("booking_form")}
                            >✈️ Đặt vé
                            </button>
                            <button
                                className={`text-gray-500 font-bold pb-2 ${
                                    activeForm === "myBooking_form" ? "text-blue-700 border-b-4 border-blue-700" : "lg:hover:text-blue-700 lg:hover:border-blue-700"
                                }`}
                                onClick={() => setActiveForm("myBooking_form")}
                            >🎫 Quản lý đặt chỗ
                            </button>
                        </div>

                        {activeForm === "booking_form" && (
                            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-x-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="trip-type" className="form-radio text-yellow-500" onClick={() => setRoundTrip(true)}
                                               checked={roundTrip === true}/>
                                        <span className="ml-1 text-gray-600 text-sm font-medium">Khứ hồi</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="trip-type" className="form-radio text-yellow-500" onClick={() => setRoundTrip(false)}
                                               checked={roundTrip === false}/>
                                        <span className="ml-1 text-gray-600 text-sm font-medium">Một chiều</span>
                                    </label>
                                </div>

                                <div className="flex gap-2">
                                    <div style={{flex: 5}}>
                                        <label className="text-gray-600 text-sm font-medium"> Điểm khởi hành</label>
                                        <input type="text"
                                               className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                    </div>
                                    <div style={{flex: 3}}>
                                        <label className="text-gray-600 text-sm font-medium"> Ngày đi</label>
                                        <input type="date"
                                               className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                    </div>
                                </div>


                                <div className="flex gap-2">
                                    <div style={{flex: 5}}>
                                        <label className="text-gray-600 text-sm font-medium"> Điểm đến</label>
                                        <input type="text"
                                               className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                    </div>
                                    {roundTrip && (
                                        <div style={{flex: 3}}>
                                            <label className="text-gray-600 text-sm font-medium"> Ngày về</label>
                                            <input type="date"
                                                   className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                        </div>
                                    )}
                                </div>

                                <div className="select-none">
                                    <label className="text-gray-600 text-sm font-medium"> Số hành khách</label>
                                    <div className="relative w-full max-w-sm mx-auto">
                                        <div
                                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm flex justify-between items-center cursor-pointer"
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
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("adults", "decrement")}
                                                            disabled={passengers.adults === 1}
                                                        >
                                                            −
                                                        </button>
                                                        <span>{passengers.adults}</span>
                                                        <button
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
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("children", "decrement")}
                                                            disabled={passengers.children === 0}
                                                        >
                                                            −
                                                        </button>
                                                        <span>{passengers.children}</span>
                                                        <button
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
                                                            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                            onClick={() => handlePassengerChange("infants", "decrement")}
                                                            disabled={passengers.infants === 0}
                                                        >
                                                            −
                                                        </button>
                                                        <span>{passengers.infants}</span>
                                                        <button
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
                                    <div className="flex items-center bg-white rounded p-1 text-gray-700">
                                        <input type="text"
                                               className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                        <button className="absolute right-2 top-1.5 text-gray-500">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1.5em"
                                                width="1.5em"
                                            >
                                                <path
                                                    d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
                                            </svg>
                                        </button>

                                    </div>
                                </div>

                                <button
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg p-3">
                                    Tìm chuyến bay
                                </button>
                            </form>
                        )}

                        {activeForm === "myBooking_form" && (
                            <form className="space-y-6 p-12" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-gray-600 text-sm font-medium">Họ và tên</label>
                                    <input type="text"
                                           className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                </div>
                                <div>
                                    <label className="text-gray-600 text-sm font-medium"> Mã đặt chỗ</label>
                                    <input type="text"
                                           className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-gray-700 text-sm"/>
                                </div>
                                <button
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg p-3">
                                    Tra cứu
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                <div style={{flex: 5}}>
                </div>
            </div>

            <div className="section3 max-w-screen-xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-black mb-4">
                    ✈️ Chuyến Bay Ưa Thích Hàng Đầu
                </h1>

                <div className="domestic">
                    <h2 className="text-3xl font-bold text-purple-700 mb-4 mt-4">Nội Địa</h2>
                    <div className="flex space-x-4 mb-6">
                        {['Hanoi', 'Da Nang', 'Da Lat', 'Ho Chi Minh City', 'Phu Quoc'].map(
                            (country) => (
                                <button
                                    key={country}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full hover:bg-blue-200 focus:bg-blue-300"
                                >
                                    {country}
                                </button>
                            )
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                route: 'Hanoi - Ho Chi Minh City',
                                destination: 'Ho Chi Minh City',
                                date: '9 November 2024',
                                price: '1.193.005 VND',
                                type: 'MỘT CHIỀU',
                            },
                            {
                                route: 'Ho Chi Minh City - Phu Quoc',
                                destination: 'Phu Quoc',
                                date: '28 November 2024',
                                price: '691.525 VND',
                                type: 'KHỨ HỒI',
                            },
                            {
                                route: 'Hanoi - Da Nang',
                                destination: 'Da Nang',
                                date: '28 November 2024',
                                price: '691.525 VND',
                                type: 'MỘT CHIỀU',
                            },
                            {
                                route: 'Ho Chi Minh City - Hanoi',
                                destination: 'Hanoi',
                                date: '9 November 2024',
                                price: '1.193.005 VND',
                                type: 'KHỨ HỒI',
                            },
                        ].map((flight, index) => (
                            <div
                                key={index}
                                className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer lg:hover:scale-105"
                                style={{backgroundColor: "#ececec"}}
                            >
                                <img src={`images/places/${flight.destination}.jpg`} alt={flight.route}
                                     className="w-full h-48 object-cover"/>
                                <div className="p-4">
                  <span className="text-xs font-bold text-white bg-green-600 px-2 py-1 rounded-md">
                    {flight.type}
                  </span>
                                    <h2 className="mt-1 text-lg font-bold text-gray-800">{flight.route}</h2>
                                    <p className="text-sm text-gray-500">{flight.date}</p>
                                    <p className="mt-1 text-red-600 font-semibold">{flight.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            className="bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded flex items-center hover:bg-blue-700">
                            Xem thêm
                            <span className="ml-2">&rarr;</span>
                        </button>
                    </div>
                </div>

                <div className="foreign">
                    <h2 className="text-3xl font-bold text-purple-700 mb-4 mt-4">Quốc Tế</h2>
                    <div className="flex space-x-4 mb-6">
                        {['Tokyo', 'Singapore', 'Paris', 'Seoul', 'London'].map(
                            (country) => (
                                <button
                                    key={country}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full hover:bg-blue-200 focus:bg-blue-300"
                                >
                                    {country}
                                </button>
                            )
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                route: 'Hanoi - Tokyo',
                                destination: 'Tokyo',
                                date: '9 November 2024',
                                price: '1.193.005 VND',
                                type: 'MỘT CHIỀU',
                            },
                            {
                                route: 'Hanoi - Singapore',
                                destination: 'Singapore',
                                date: '1 December 2024',
                                price: '647.745 VND',
                                type: 'MỘT CHIỀU',
                            },
                            {
                                route: 'Ho Chi Minh City - Seoul',
                                destination: 'Seoul',
                                date: '9 November 2024',
                                price: '1.193.005 VND',
                                type: 'KHỨ HỒI',
                            },
                            {
                                route: 'Ho Chi Minh City - Paris',
                                destination: 'Paris',
                                date: '28 November 2024',
                                price: '691.525 VND',
                                type: 'KHỨ HỒI',
                            },
                        ].map((flight, index) => (
                            <div
                                key={index}
                                className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer lg:hover:scale-105"
                                style={{backgroundColor: "#ececec"}}
                            >
                                <img src={`images/places/${flight.destination}.jpg`} alt={flight.route}
                                     className="w-full h-48 object-cover"/>
                                <div className="p-4">
                  <span className="text-xs font-bold text-white bg-green-600 px-2 py-1 rounded-md">
                    {flight.type}
                  </span>
                                    <h2 className="mt-1 text-lg font-bold text-gray-800">{flight.route}</h2>
                                    <p className="text-sm text-gray-500">{flight.date}</p>
                                    <p className="mt-1 text-red-600 font-semibold">{flight.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className="bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded flex items-center hover:bg-blue-700">
                            Xem thêm
                            <span className="ml-2">&rarr;</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="section3 max-w-screen-xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-black mb-4">
                    📍Điểm Đến Hấp Dẫn
                </h1>
                <div className="slider flex items-center justify-center relative w-[1140px] h-[400px] overflow-hidden shadow-lg">
                    <div className="slide-track flex space-x-2 animate-scroll bg-cover relative" style={{width: 'calc(400px * 18)'}}>
                        <div className="w-[400px] h-[400px] bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Phu Quoc.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Phú Quốc</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Hanoi.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Hà Nội</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Da Nang.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Đà Nẵng</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Ho Chi Minh City.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">TP. Hồ Chí Minh</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Seoul.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Seoul</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Da Nang.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Đà Nẵng</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Moscow.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Moscow</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Singapore.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Singapore</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Paris.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Paris</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Phu Quoc.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Phú Quốc</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Da Lat.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Đà Lạt</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Tokyo.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Tokyo</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Da Lat.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Đà Lạt</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Paris.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Paris</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Hoi An.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Hội An</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Singapore.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Singapore</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Hanoi.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Hà Nội</p>
                            </div>
                        </div>
                        <div className="w-[400px] h-[400px] rounded-lg bg-cover bg-center relative"
                             style={{backgroundImage: "url('/images/places/Tokyo.jpg')"}}>
                            <div
                                className="absolute bottom-4 left-4 bg-red-600 bg-opacity-75 text-white px-3 py-1 rounded-lg">
                                <p className="text-lg font-semibold">Tokyo</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8 mb-2">
                    <button type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg lg:hover:scale-125 px-5 py-2.5 text-center">
                        Khám phá ngay
                        <span className="ml-2">&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home;