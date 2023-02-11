{
  /* 요일 ui를 표시하는 부분 */
}
const CalendarDay = () => {
  return (
    <div className="flex items-center w-full  text-center">
      <div className="border flex-1 border-black bg-gray-200 grow">SUN</div>
      <div className="border flex-1 border-black bg-gray-200 grow">MON</div>
      <div className="border flex-1 border-black bg-gray-200 grow">TUE</div>
      <div className="border flex-1 border-black bg-gray-200 grow">WED</div>
      <div className="border flex-1 border-black bg-gray-200 grow">THU</div>
      <div className="border flex-1 border-black bg-gray-200 grow">FRI</div>
      <div className="border flex-1 border-black bg-gray-200 grow">SAT</div>
    </div>
  );
};

export default CalendarDay;
