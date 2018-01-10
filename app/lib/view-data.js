const data = {};

const createFor = (sessionId) => {
  data[sessionId] = {};
};

const getFor = (sessionId) => {
  if (data[sessionId]) {
    return data[sessionId];
  }

  throw new Error(`No data for session id: '${sessionId}'`);
};

const setFor = (sessionId, key, value) => {
  const sessionData = getFor(sessionId);

  sessionData[key] = value;
};

const wrapFor = (sessionId, passedData = {}) => {
  const sessionData = getFor(sessionId);

  return { viewData: sessionData, ...passedData };
};

const wrapForRequest = (request, passedData) => {
  if (!request.session) {
    throw new Error('request object does not have session property');
  }

  if (!request.session.id) {
    throw new Error('session within request object does not have id property');
  }

  return wrapFor(request.session.id, passedData);
};

const destroyFor = (sessionId) => {
  delete data[sessionId];
};

export default {
  setFor,
  getFor,
  wrapFor,
  createFor,
  destroyFor,
  wrapForRequest,
};
