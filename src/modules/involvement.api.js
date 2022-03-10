const getLikes = async () => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`);
  const likes = await response.json();
  return likes;
};

const setLikes = async (movieID) => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const options = {
    method: 'POST',
    body: JSON.stringify({ item_id: movieID }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`, options);
  const response = await result.text();
  return response;
};

const getComments = async (movieID) => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${movieID}`);
  const comments = await res.json();
  return comments;
};

const setComment = async (movieID, comment, name) => {
  const data = {
    item_id: movieID,
    username: name,
    comment,
  };
  const appID = 'YUqI88f5a8VwBEjald5b';
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const status = await res.json();
  return status;
};

export {
  getLikes, getComments, setComment, setLikes,
};
