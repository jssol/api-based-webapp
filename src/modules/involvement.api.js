const getLikes = async () => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`);
  const likes = await response.json();
  return likes;
};

const getComments = async (movieID) => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${movieID}`);
  const comments = await res.json();
  return comments;
};

const setComment = async (movieID, comment) => {
  const getUser = () => {
    const users = ['Juan', 'Rachel', 'Jena', 'Marcos', 'Alfred', 'Luc', 'Emma', 'Robert'];
    const user = users[Math.floor(Math.random() * users.length)];
    return user;
  };

  const data = {
    "item_id": movieID,
    "username": getUser(),
    "comment": comment
  }
  const appID = 'YUqI88f5a8VwBEjald5b';
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const status = await res.json();
  return status;
}

export { getLikes, getComments, setComment };
