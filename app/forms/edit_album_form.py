from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import StringField,IntegerField, SubmitField,DateField
from wtforms.validators import DataRequired



class EditAlbumForm(FlaskForm):
    title = StringField("Title")
    release_date = DateField("Release Date")
    artist = StringField("Artist")
    cover_image_url = FileField("Image File")
