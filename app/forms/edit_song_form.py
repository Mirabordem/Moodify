from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired
from ..api.aws_helpers import ALLOWED_AUDIO_EXTENSIONS



class EditSongForm(FlaskForm):
    name = StringField("Name")
    album_id = IntegerField("Album Id")
    track_number = IntegerField("Track Nr")
    audio_url = FileField("Audio", validators=[FileAllowed(list(ALLOWED_AUDIO_EXTENSIONS))])
    song_length = IntegerField("Duration")
