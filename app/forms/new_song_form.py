from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length
from ..api.aws_helpers import ALLOWED_AUDIO_EXTENSIONS


class CreateSongForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,50)])
    album_id = IntegerField("Album Id")
    track_number = IntegerField("Track Nr", validators=[DataRequired(), NumberRange(1,200)])
    audio_url = FileField("Audio", validators=[FileAllowed(list(ALLOWED_AUDIO_EXTENSIONS)), FileRequired()])
    song_length = IntegerField("Duration", validators=[DataRequired(), NumberRange(1,1000)])
