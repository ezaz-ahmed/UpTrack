import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const RateCalendar = () => {
  const activities = [
    {
      name: "study",
      rates: [
        "y",
        "n",
        "y",
        "y",
        "...",
        "y",
        "y",
        "n",
        "...",
        "y",
        "y",
        "n",
        "...",
      ],
    },
    {
      name: "practice",
      rates: [
        "y",
        "n",
        "y",
        "y",
        "...",
        "y",
        "y",
        "n",
        "...",
        "y",
        "y",
        "n",
        "...",
      ],
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={31}>January</TableCell>
            <TableCell colSpan={28}>February</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Property</TableCell>
            {[...Array(31).keys()].map((day) => (
              <TableCell key={day}>{day + 1}</TableCell>
            ))}
            {[...Array(28).keys()].map((day) => (
              <TableCell key={day + 31}>{day + 1}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.name}>
              <TableCell>{activity.name}</TableCell>
              {activity.rates.map((rate, index) => (
                <TableCell key={index}>{rate}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RateCalendar;
