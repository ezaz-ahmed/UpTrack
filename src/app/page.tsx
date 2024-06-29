"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Header from "~/components/ui/Header";
import { useRoomCategory } from "~/hooks/useRoomCategory";
import { DateRangeType, DateValueType } from "~/types/common.types";
import RoomCategorySection from "~/components/ui/RoomCategorySection";
import RateCalendar from "~/components/ui/RateCalendar";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 3,
          marginBottom: 9,
          gap: 6,
        }}
      >
        <Header dateValues={value} onChange={onChange} />

        <Card
          sx={{
            height: "100%",
            minHeight: 300,
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                height: "100%",
                minHeight: 300,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
              <Typography variant="body1">Fetching data</Typography>
            </Box>
          ) : (
            <Box>
              {/* {data && data.data ? (
                <RoomCategorySection roomData={data.data} />
              ) : (
                <Alert severity="info">No Data to show</Alert>
              )} */}

              <RateCalendar />
            </Box>
          )}
        </Card>
      </Box>

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
