import { useQuery } from "@tanstack/react-query";
import { fetchRoomCategory } from "~/app/api/room";
import { RoomCategoryResponseType } from "~/types/api.types";
import { DateValueType } from "~/types/common.types";
import { formatDateToString } from "~/utils/formatDateToString";

export const useRoomCategory = (
  unFormattedStartDate: DateValueType,
  unFormattedEndDate: DateValueType,
  enabled: boolean = true
) => {
  const startDate = unFormattedStartDate
    ? formatDateToString(unFormattedStartDate)
    : undefined;
  const endDate = unFormattedEndDate
    ? formatDateToString(unFormattedEndDate)
    : undefined;

  const { isLoading, isError, error, data } =
    useQuery<RoomCategoryResponseType>({
      queryKey: ["rate-calendar", startDate, endDate],
      queryFn: () => fetchRoomCategory(startDate, endDate),
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 6000, // 1 minute
    });

  return {
    isLoading,
    isError,
    error,
    data,
  };
};
