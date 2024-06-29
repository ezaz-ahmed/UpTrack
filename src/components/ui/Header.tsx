import { Dispatch, FC } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { type DateRangeType } from "~/types/common.types";

type HeaderProps = {
  dateValues: DateRangeType;
  onChange: Dispatch<any>;
};

const Header: FC<HeaderProps> = ({ dateValues, onChange }) => {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "transparent",
        marginBottom: -3,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: 70,
          left: 24,
          zIndex: 2,
        }}
      >
        <DateRangePicker
          onChange={onChange}
          value={dateValues}
          calendarIcon={null}
        />
      </Box>
      <Card
        sx={{
          padding: 3,
          paddingBottom: 9,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Rate Calendar
        </Typography>
      </Card>
    </Box>
  );
};

export default Header;
