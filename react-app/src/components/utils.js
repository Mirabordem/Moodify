

const fetchAll = (dispatch, getAllAlbums, getAllPlaylists, getAllSongs) => {
  fetch("/api/all")
    .then((res) => res.json())
    .then((data) => {
      dispatch(getAllAlbums(data.albums));
      dispatch(getAllPlaylists(data.playlists));
      dispatch(getAllSongs(data.songs));
    });
};

export default fetchAll;
