-- Migration: Create bookings table with RLS policies

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref TEXT NOT NULL UNIQUE,
  room_id UUID NOT NULL REFERENCES public.tea_rooms(id) ON DELETE CASCADE,
  booking_date TEXT NOT NULL,
  booking_time TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  cardholder_name TEXT,
  card_last_four TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON public.bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON public.bookings(booking_ref);

-- Включаем Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Разрешаем анонимным пользователям и клиентам создавать бронирования
CREATE POLICY "Allow public insert into bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (true);

-- Разрешаем чтение бронирований
CREATE POLICY "Allow public select bookings"
  ON public.bookings
  FOR SELECT
  USING (true);
