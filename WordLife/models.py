from django.db.models import *

# Create your models here.
class Words(Model):
	word = CharField(max_length=200, blank = False)
	definition = CharField(max_length=200, blank = False)
	photo = ImageField(upload_to='photos', blank = False)
	
	def __str__(self):
		return self.word
