const roomSelect = document.getElementById('room');
const dateInput = document.getElementById('date');
const checkButton = document.getElementById('check-availability');
const timeSlotsDiv = document.getElementById('time-slots');

const hours = {
  "Zoom Room": [7, 21],
  "Ruang Rapat 1": [7, 19],
  "Ruang Rapat 2": [7, 19],
  "Ruang Rapat 3": [7, 19]
};

async function fetchBookings() {
  const response = await fetch('data.json');
  return response.json();
}

checkButton.addEventListener('click', async () => {
  const room = roomSelect.value;
  const date = dateInput.value;

  if (!date) {
    alert('Please select a date');
    return;
  }

  const data = await fetchBookings();
  const bookings = data[room] || [];
  const bookedHours = bookings.filter(b => b.date === date).map(b => b.time);

  const availableHours = [];
  for (let hour = hours[room][0]; hour < hours[room][1]; hour++) {
    const timeSlot = `${hour}:00-${hour + 1}:00`;
    if (!bookedHours.includes(timeSlot)) availableHours.push(timeSlot);
  }

  timeSlotsDiv.innerHTML = `<h3>Available Slots for ${room} on ${date}:</h3>`;
  availableHours.forEach(slot => {
    const button = document.createElement('button');
    button.textContent = slot;
    button.onclick = () => alert(`Booked ${room} on ${date} at ${slot}`);
    timeSlotsDiv.appendChild(button);
  });
});
