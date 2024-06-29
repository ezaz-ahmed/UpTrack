import { ErrorResponseType, RoomCategoryResponseType } from "~/types/api.types";

export const fetchRoomCategory = async (
  startDate?: string,
  endDate?: string
): Promise<RoomCategoryResponseType> => {
  const response = await fetch(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
  );

  if (!response.ok) {
    let errorMessage = "Server Error";

    if (response.status === 400) {
      const errorResponse: ErrorResponseType = await response.json();
      errorMessage = errorResponse.message;
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};
