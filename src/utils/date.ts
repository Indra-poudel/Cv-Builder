/**
 *
 * @param dateString
 *
 * return the date in formatted form like Sep 14, 2020"
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
