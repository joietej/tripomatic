const searchHotels = async (
  lat,
  lon,
  checkin,
  checkout,
  local = "en-US",
  cur = "USD",
  rooms = 1
) => {
  const response = await fetch(
    `https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com?checkIn=${checkin}&checkOut=${checkout}&lat=${lat}&lon=${lon}&locale=${local}&rooms=${rooms}&currency=${cur}&pageNumber=1`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "db953f188cmshae2a73b6e027e2bp1531f0jsna562413c23de",
        "x-rapidapi-host": "hotels-com-free.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  return data;
};
export default searchHotels;