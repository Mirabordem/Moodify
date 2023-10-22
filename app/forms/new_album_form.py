from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, IntegerField, SubmitField


class CreateAlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    release_date = IntegerField("Release Date", validators=[DataRequired()])
    artist = StringField("Artist", validators=[DataRequired()])
    cover_image_url = StringField("Cover Image URL")
    submit = SubmitField("Submit")
