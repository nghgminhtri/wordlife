from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render, get_list_or_404
from django.shortcuts import get_object_or_404, redirect
from django.utils.decorators import method_decorator
from django.views.generic import *
from django.contrib.auth.decorators import login_required
from models import *
from utils import get_google_image
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings


# Create your views here.

class HomeView(View):
    template_name = 'home.html'

    def get(self, request, *args, **kwargs):
        lists = None
        if request.user.is_authenticated():
            lists = WordList.objects.filter(user=request.user)

        return render(request, self.template_name, {'wordlists': lists})


class WordView(View):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            print request.body
            request_params = json.loads(request.body)
            check_keys = ('word', 'word_list_id')
            print settings.MEDIA_ROOT

            # validate key
            if all(param in request_params for param in check_keys):
                try:
                    new_word = Word.objects.get(word=request_params.get('word'))
                except ObjectDoesNotExist:
                    # get word photo
                    imagepath = get_google_image(request_params.get('word'))

                    # create word if not exist
                    new_word = Word(word=request_params.get('word'), photo=imagepath)
                    new_word.save()

                wordlist = WordList.objects.get(id=request_params.get('word_list_id'))
                # remove old word if exists
                if 'old_word' in request_params:
                    old_word = Word.objects.get(word=request_params.get('old_word'))
                    WordListWord.objects.get(word=old_word, wordList=wordlist).delete()
                # save word to word list
                wordlistword = WordListWord(word=new_word, wordList=wordlist)
                wordlistword.save()

                return JsonResponse({'image':new_word.photo.url})

        return JsonResponse({})

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(WordView, self).dispatch(*args, **kwargs)


class WordListView(View):
    template_name = 'list-detail.html'

    def get(self, request, list_id, *args, **kwargs):
        if request.user.is_authenticated():
            wordlist = get_object_or_404(WordList, id=list_id)
            from django.contrib.sites.models import get_current_site
            imagepath = 'http://' + get_current_site(request).domain + '/photos/'
        else:
            return redirect('/accounts/login')

        return render(request, self.template_name, {
            'wordlist': wordlist,
            'imagepath': imagepath
        })

class LearnView(View):
    template_name = 'hoctu.html'
    
    def get(self, request, list_id, *args, **kwargs):
        if request.user.is_authenticated():
            wordlist = get_object_or_404(WordList, id=list_id)
            from django.contrib.sites.models import get_current_site
            imagepath = 'http://' + get_current_site(request).domain + '/photos/'
        else:
            return redirect('/accounts/login')

        return render(request, self.template_name, {
            'wordlist': wordlist,
            'imagepath': imagepath
        })