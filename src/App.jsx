import React, { useState, useEffect } from "react";

const App = () => {
  const [rooms] = useState(["Zoom Room", "Ruang Rapat 1", "Ruang Rapat 2", "Ruang Rapat 3"]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [date, setDate] = useState("");
  const [pic, setPic] = useState("");
  const [title, setTitle] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const hours = {
    "Zoom Room": [7, 21],
    "Ruang Rapat 1": [7, 19],
    "Ruang Rapat 2": [7, 19],
    "Ruang Rapat 3": [7, 19],
  };

  const fetchAvailableSlots = () => {
    if (!selectedRoom || !date) return;

    const allSlots = [];
    for (let i = hours[selectedRoom][0]; i < hours[selectedRoom][1]; i++) {
      allSlots.push(`${i}:00 - ${i + 1}:00`);
    }
    // Simulate fetching from backend
    setAvailableSlots(allSlots);
  };

  const handleBooking = (slot) => {
    if (!pic || !title) {
      alert("Please fill in PIC and Meeting Title");
      return;
    }
    alert(`Booked ${selectedRoom} on ${date} at ${slot}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Meeting Room Booking</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchAvailableSlots();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="room" className="block text-gray-600 font-medium mb-1">
              Select Room
            </label>
            <select
              id="room"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full border-gray-300 rounded focus:ring focus:ring-blue-200"
            >
              <option value="">Choose a room</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-600 font-medium mb-1">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="pic" className="block text-gray-600 font-medium mb-1">
              PIC Name
            </label>
            <input
              type="text"
              id="pic"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              className="w-full border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-gray-600 font-medium mb-1">
              Meeting Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-500"
          >
            Check Availability
          </button>
        </form>
        {availableSlots.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Available Slots</h2>
            <div className="grid grid-cols-2 gap-4">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleBooking(slot)}
                  className="block bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded shadow"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
