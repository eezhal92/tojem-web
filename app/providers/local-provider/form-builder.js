export default {
  csrfToken: request => () => request.csrfToken(),
  csrfField: request => () => {
    const csrfToken = request.csrfToken();

    return `<input type="hidden" name="_csrf" value="${csrfToken}">`;
  },
};
