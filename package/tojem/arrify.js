module.exports = (data) => {
  if (!data) {
    return [];
  }

  return Array.isArray(data) ? data : [data];
};
