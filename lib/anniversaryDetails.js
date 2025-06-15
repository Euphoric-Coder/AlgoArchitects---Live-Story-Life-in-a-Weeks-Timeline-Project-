export function getAnniversaryDetails(eventDateStr) {
  const today = new Date();
  const eventDate = new Date(eventDateStr);

  let nextAnniversary = new Date(
    today.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate()
  );

  if (nextAnniversary < today) {
    nextAnniversary.setFullYear(today.getFullYear() + 1);
  }

  const diffInMs = nextAnniversary.getTime() - today.getTime();
  const diffInWeeks = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));

  return {
    nextAnniversaryDate: nextAnniversary.toISOString().split("T")[0],
    weeksLeft: diffInWeeks,
  };
}
