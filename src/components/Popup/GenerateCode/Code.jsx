const generateMeetingCode = () => {
  const code = Math.floor(1000000 + Math.random() * 9000000);
  return code.toString();
};

export default generateMeetingCode;