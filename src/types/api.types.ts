export type RoomCategoryResponseType = {
  code: string;
  message: string;
  data: IRoomCategory[];
};

export type ErrorResponseType = {
  code: string;
  message: string;
  reason: string;
  error: { key: string; message: string }[];
};

export type IRoomCategory = {
  id: string;
  name: string;
  occupancy: number;
  inventory_calendar: IRoomInventoryCalender[];
  rate_plans: IRatePlan[];
};

export type IRoomInventoryCalender = {
  id: null | string;
  date: Date;
  available: number | null;
  status: boolean | null;
  booked: number | null;
};

export type IRatePlan = {
  id: number;
  name: string;
  calendar: IRateCalendar[];
};

export type IRateCalendar = {
  id: null | string;
  date: Date;
  rate: number | null;
  min_length_of_stay: number | null;
  reservation_deadline: number | null;
};
