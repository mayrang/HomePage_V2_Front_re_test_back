import dayjs from "dayjs";

const ReservationTimeZone = ({ start, end, reservationList, selectDate }) => {
  const checkReservattion = reservationList.find((post) => {
    return (
      dayjs(`${selectDate} ${start}`, "YYYYMMDD HH:mm").isSameOrAfter(dayjs(post.date), "m") &&
      dayjs(`${selectDate} ${start}`, "YYYYMMDD HH:mm").isSameOrBefore(
        dayjs(post.date).add(post.time, "millisecond"),
        "m"
      )
    );
  });
  console.log(checkReservattion);

  return (
    <tr>
      <td className="w-1/12 text-center">
        <input type="checkbox" disabled={checkReservattion && checkReservattion.content} />
      </td>
      <td className="w-5/12 text-center">
        {start} ~ {end}
      </td>
      <td className="w-3/12 text-center">{checkReservattion && checkReservattion.content ? "예약불가" : "예약가능"}</td>
      <td className="w-3/12 text-center">{checkReservattion?.content || " "}</td>
    </tr>
  );
};

export default ReservationTimeZone;
