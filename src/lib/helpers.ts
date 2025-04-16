export const calculateAge = (dob: Date) => {
  return new Date().getFullYear() - dob.getFullYear();
};
