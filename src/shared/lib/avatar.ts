export const getAvatarUrl = (authorName: string): string =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`
