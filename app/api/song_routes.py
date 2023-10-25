from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Song, likes, Album
from app.forms import EditSongForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import remove_file_from_s3

song_routes = Blueprint('song', __name__)



# @song_routes.route('/new', methods=['POST'])
# @login_required
# def create_new_song():
#     """
#     Creates a new song. Returns a song dictionary.
#     """
#     form = CreateSongForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         new_song = Song(
#             name = form.data['name'],
#             album_id = form.data['album_id'],
#             track_number = form.data['track_number'],
#             audio_url = form.data['audio_url'],
#             song_length = form.data['song_length']
#         )

#         db.session.add(new_song)
#         db.session.commit()
#         return new_song.to_dict()

#     return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    """
    Edits a song. Returns a new song dictionary.
    """
    form = EditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_song = Song.query.get(id)
    if current_song is None:
        return {'errors': 'Song not found'}, 404
    album_of_song = Album.query.get(current_song['album_id'])
    if album_of_song.user_owner != current_user.id:
        return {'errors': 'forbidden'}, 403


    if form.validate_on_submit():
        data = form.data
        if data["audio_url"]:
            # song = data["audio_url"]
            # song.filename = get_unique_filename(song.filename)
            # upload = upload_file_to_s3(song)
            # print(upload)
            # if 'url' not in upload:
            #     return { 'errors': 'upload error'}
            # current_song.audio_url = upload['url']

            current_song.audio_url = 'https://moodifybucket.s3.us-east-2.amazonaws.com/bubkas.mp3'

        current_song.name = data['name'],
        current_song.album_id = data['album_id'],
        current_song.track_number = data['track_number'],
        current_song.song_length = data['song_length']

        db.session.commit()

        updated_album_obj = Album.query.get(album_of_song['id']).to_dict()
        song_instances = [song.to_dict() for song in updated_album_obj['albumSongs']]
        updated_album_obj['albumSongs'] = [song['id'] for song in song_instances]
        current_song_obj = current_song.to_dict()

        return {'song': current_song_obj, 'album': updated_album_obj}


    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@song_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_song(id):
    """
    Deletes a song.
    """
    selected_song = Song.query.get(id)

    if selected_song.to_dict()['user_id'] != current_user.id:
        return { 'errors': 'Song not found' }, 404

    remove_file_from_s3(selected_song.to_dict()['audio_url'])

    db.session.delete(selected_song)
    db.session.commit()

    return { 'message': 'Deleted Successfully' }





@song_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def add_song_like(id):
    """
    Adds like to a selected song. Returns likes for the song as a list of like dictionaries.
    """
    song = Song.query.get(id).to_dict()


    for like in song["likes"]:
        if like["user_id"] == current_user.id:
            return { "errors": "User likes this song" }, 405

    like = likes(
        user_id=current_user.id,
        song_id=id
    )

    db.session.add(like)
    db.session.commit()
    return like.to_dict()




@song_routes.route('/<int:id>/unlike', methods=['DELETE'])
@login_required
def remove_song_like(id):
    """
    Removes like from a selected song. Returns a message if successful.
    """
    user_id = current_user.id
    song_id = id

    like = likes.query.filter(
        likes.c.user_id == user_id,
        likes.c.song_id == song_id
    ).first()

    if like:
        db.session.delete(like)
        db.session.commit()
        return {"message": "Like successfully deleted"}
    else:
        return { "errors": "User has never liked this song" }, 405
