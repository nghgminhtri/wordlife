from django.db.models import *
from django.contrib.auth.models import User


# Create your models here.
class Word(Model):
    word = CharField(max_length=200, blank=False)
    definition = CharField(max_length=200, blank=False)
    photo = ImageField(upload_to='photos', blank=False)

    def __str__(self):
        return self.word


# class WLUser(User):
#     def __init__(self):
#         super(User, self).__init__()


class WordList(Model):
    user = ForeignKey(User)
    words = ManyToManyField(Word, through='WordListWord', blank=True)
    listName = CharField(max_length=200, blank=False)


class WordListWord(Model):
    word = ForeignKey(Word)
    wordList = ForeignKey(WordList)
