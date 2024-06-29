"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "~/components/ui/Header";
import { useRoomCategory } from "~/hooks/useRoomCategory";
import { DateRangeType, DateValueType } from "~/types/common.types";

const startDate = new Date("2024-06-23");
const endDate = new Date("2024-08-23");

function Home() {
  const [value, setValue] = useState<DateRangeType>([startDate, endDate]);
  const [open, setOpen] = useState(false); // State for Snackbar

  let startDateValue: DateValueType = null;
  let endDateValue: DateValueType = null;

  if (Array.isArray(value)) {
    [startDateValue, endDateValue] = value;
  }

  const shouldFetchData = startDateValue !== null && endDateValue !== null;

  const { isLoading, isError, error, data } = useRoomCategory(
    startDateValue,
    endDateValue,
    shouldFetchData
  );

  // Change date range picker value
  const onChange = (newDates: DateRangeType) => {
    setValue(newDates);
  };

  // Close Snackbar
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Header dateValues={value} onChange={onChange} />

      {isLoading && <CircularProgress />}

      <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.message || "There is an error while fetching"}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;
