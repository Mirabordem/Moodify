from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField,IntegerField, SubmitField,DateField
from wtforms.validators import DataRequired, Length
from ..api.aws_helpers import ALLOWED_IMG_EXTENSIONS


class CreateAlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(1,100)])
    release_date = DateField("Release Date", validators=[DataRequired()])
    artist = StringField("Artist", validators=[DataRequired(), Length(1,100)])
    cover_image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS)), FileRequired()])
