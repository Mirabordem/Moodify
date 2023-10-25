from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import StringField,IntegerField, SubmitField,DateField
from wtforms.validators import DataRequired


class CreateAlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    release_date = DateField("Release Date", validators=[DataRequired()])
    artist = StringField("Artist", validators=[DataRequired()])
    cover_image_url = FileField("Image File")
