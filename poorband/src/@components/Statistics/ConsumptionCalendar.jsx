import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { styled } from "styled-components";
import moment from "moment";
import { getStatCalendar } from "../../../api/getStatCalendar";
import { useMutation } from "react-query";

export default function ConsumptionCalendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [data, setData] = useState([]);
  const [date, setDate] = useState({ year: year, month: month + 1 });
  const [monthDate, setmonthDate] = useState(new Date());
  const [monthAmount, setMonthAmount] = useState(0);

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  useEffect(() => {
    date.year && date.month && loadCalendar(date);
  }, [date]);

  useEffect(() => {
    setDate({ year: year, month: month + 1 });
  }, [monthDate]);

  useEffect(() => {
    setmonthDate(new Date(year, month, 1));
  }, [month]);

  const { mutate: loadCalendar } = useMutation(getStatCalendar, {
    onSuccess: (response) => {
      setMonthAmount(response.monthAmount);
      setData(response.data);
    },
    onError: () => {
      console.log("error");
    },
  });

  function increaseMonth() {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  }
  function decreaseMonth() {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  }
  console.log(data);
  return (
    <>
      <Year>
        <p>{year}년</p>
      </Year>

      <Body>
        <Month>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              decreaseMonth();
            }}>
            arrow_back_ios
          </span>
          <p>{month + 1}월</p>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              increaseMonth();
            }}>
            arrow_forward_ios
          </span>
        </Month>
        <Amount>
          <p className="small">이번 달 지출 금액 </p>
          <p className="big">{monthAmount ? monthAmount?.toLocaleString("en-US") : 0}원</p>
        </Amount>
        <CalendarWrapper>
          <Calendar
            locale={"en"}
            calendarType={"US"}
            // formatDay={(locale, date) => moment(date).format("DD")}
            formatShortWeekday={(locale, monthDate) => ["S", "M", "T", "W", "T", "F", "S"][monthDate.getDay()]}
            activeStartDate={monthDate}
            showNavigation={false}
            showNeighboringMonth={false}
            className="mx-auto w-full text-sm border-b"
            tileContent={(monthDate) => {
              const arr = moment(monthDate)._i.date.toString();
              const idx = Number(arr[8] + arr[9]) - 1;
              const amount = data[idx]?.amount;
              const price = amount ? amount : 0;
              return <>{<div className="price">{price?.toLocaleString("en-US")}</div>}</>;
            }}
          />
        </CalendarWrapper>
      </Body>
    </>
  );
}

const Year = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  p {
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.fonts.medium};
    font-size: 2rem;
    margin: 1.5rem 0;
  }
`;

const Month = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
  ${({ theme }) => theme.fonts.medium};
  span {
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  font-size: 1.8rem;
  span:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 1rem;
  padding: 0 2rem;
  ${({ theme }) => theme.fonts.medium};
  p {
    margin: 0.3rem;
    color: ${({ theme }) => theme.colors.black};
  }
  .big {
    font-size: 2.3rem;
  }
  .small {
    font-size: 1.8rem;
  }
`;
const Body = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 3rem;
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  .react-calendar {
    border: none;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    ${({ theme }) => theme.fonts.medium};
  }
  .react-calendar__month-view {
    // 날짜
    abbr {
      color: ${({ theme }) => theme.colors.black};
    }
  }
  .react-calendar__month-view__weekdays {
    // 요일
    abbr {
      color: ${({ theme }) => theme.colors.darkgrey_1};
      ${({ theme }) => theme.fonts.regular};
      font-size: 1.6rem;
      text-decoration: none;
    }
  }
  .react-calendar__tile {
    text-align: center;
    height: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  /*hover, focus, 선택됐을 시 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${({ theme }) => theme.colors.white};
    outline: none;
    cursor: default;
  }
  /* 오늘 날짜 */
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus,
  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colors.lightpurple};
    border-radius: 14px;
  }
  /* 금액 */
  .price {
    color: ${({ theme }) => theme.colors.mainpurple};
    ${({ theme }) => theme.fonts.regular};
  }
`;
