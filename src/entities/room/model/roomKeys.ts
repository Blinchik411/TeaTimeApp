export const roomKeys = {
  all: ['rooms'] as const,
  byId: (id?: string) => ['rooms', id] as const,
}
