import dayjs from "dayjs";
import cls from "classnames";

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
      <td className={cls("w-5/12 text-center", { "text-red-500": checkReservattion && checkReservattion.content })}>
        {start} ~ {end}
      </td>
      <td className={cls("w-3/12 text-center", { "text-red-500": checkReservattion && checkReservattion.content })}>
        {checkReservattion && checkReservattion.content ? "예약불가" : "예약가능"}
      </td>
      <td className="w-3/12 text-center font-semibold">{checkReservattion?.content || " "}</td>
    </tr>
  );
};

export default ReservationTimeZone;
