import { FC } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { type IRoomCategory } from "~/types/api.types";

type RoomCategorySectionProps = {
  roomData: IRoomCategory[];
};

const RoomCategorySection: FC<RoomCategorySectionProps> = ({ roomData }) => {
  return (
    <>
      {roomData.map((room) => (
        <Box key={room.id} my={4}>
          <Typography variant="h4" gutterBottom>
            {room.name}
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rooms to Sell</TableCell>
                  <TableCell>Net Booked</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {room.inventory_calendar.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>
                      {new Date(inv.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {inv.status ? "Sellable" : "Not Sellable"}
                    </TableCell>
                    <TableCell>
                      {inv.available !== null ? inv.available : "N/A"}
                    </TableCell>
                    <TableCell>
                      {inv.booked !== null ? inv.booked : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {room.rate_plans.map((plan) => (
            <Box key={plan.id} mt={4}>
              <Typography variant="h6" gutterBottom>
                Rate Plan: {plan.name}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell>Min Length of Stay</TableCell>
                      <TableCell>Reservation Deadline</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plan.calendar.map((cal) => (
                      <TableRow key={cal.id}>
                        <TableCell>
                          {new Date(cal.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {cal.rate !== null ? cal.rate : "N/A"}
                        </TableCell>
                        <TableCell>
                          {cal.min_length_of_stay !== null
                            ? cal.min_length_of_stay
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {cal.reservation_deadline !== null
                            ? cal.reservation_deadline
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

export default RoomCategorySection;
