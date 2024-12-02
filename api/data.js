let bookings = {
  "Zoom Room": [],
  "Ruang Rapat 1": [],
  "Ruang Rapat 2": [],
  "Ruang Rapat 3": [],
};

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    // Fetch all bookings
    res.status(200).json(bookings);
  } else if (method === "POST") {
    // Create a new booking
    const { room, date, time, pic, title } = req.body;

    if (!room || !date || !time || !pic || !title) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!bookings[room]) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Check for conflicts
    const isConflict = bookings[room].some(
      (b) => b.date === date && b.time === time
    );
    if (isConflict) {
      return res.status(409).json({ error: "Time slot already booked" });
    }

    // Add the booking
    bookings[room].push({ date, time, pic, title });
    res.status(201).json({ message: "Booking successful" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
