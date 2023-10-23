from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SubmitField
from wtforms.validators import DataRequired



class EditAlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    release_date = IntegerField("Release Date", validators=[DataRequired()])
    artist = StringField("Artist", validators=[DataRequired()])
    cover_image_url = StringField("Cover Image URL")
    
