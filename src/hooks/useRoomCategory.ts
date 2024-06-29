import { useQuery } from "@tanstack/react-query";
import { type RoomCategoryResponseType } from "~/types/api.types";
import { DateValueType } from "~/types/common.types";
import { formatDateToString } from "~/utils/formatDateToString";

const fetchRoomCategory = async (
  startDate: string,
  endDate: string
): Promise<RoomCategoryResponseType[]> => {
  const response = await fetch(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
  );

  if (!response.ok) {
    throw new Error("Server Error");
  }

  const data = await response.json();
  return data;
};

export const useRoomCategory = (
  startDate: DateValueType,
  endDate: DateValueType
) => {
  const formattedStartDate = startDate
    ? formatDateToString(startDate)
    : undefined;
  const formattedEndDate = endDate ? formatDateToString(endDate) : undefined;

  const queryEnabled = formattedStartDate && formattedEndDate;

  return useQuery({
    queryKey: ["rate-calendar", startDate, endDate],
    queryFn: queryEnabled
      ? () => fetchRoomCategory(formattedStartDate, formattedEndDate)
      : undefined,
  });
};
