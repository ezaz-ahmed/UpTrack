"use client";

import Container from "@mui/material/Container";
import { useState } from "react";
import Header from "~/components/ui/Header";
import { useRoomCategory } from "~/hooks/useRoomCategory";
import { DateRangeType, DateValueType } from "~/types/common.types";

const startDate = new Date("2024-06-23");
const endDate = new Date("2024-08-23");

function Home() {
  const [value, setValue] = useState<DateRangeType>([startDate, endDate]);

  let startDateValue: DateValueType = null;
  let endDateValue: DateValueType = null;

  if (Array.isArray(value)) {
    [startDateValue, endDateValue] = value;
  }

  const { isLoading, error, data } = useRoomCategory(
    startDateValue,
    endDateValue
  );

  console.log({
    isLoading,
    error,
    data,
  });

  const onChange = (newDates: DateRangeType) => {
    setValue(newDates);
  };

  return (
    <Container maxWidth="xl">
      <Header dateValues={value} onChange={onChange} />
    </Container>
  );
}

export default Home;
