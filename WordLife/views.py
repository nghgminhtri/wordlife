from django.http.response import HttpResponse
from django.shortcuts import render, get_list_or_404
from django.shortcuts import get_object_or_404, redirect
from django.utils.decorators import method_decorator
from django.views.generic import *
from django.contrib.auth.decorators import login_required
from models import *


# Create your views here.

class HomeView(View):
    template_name = 'home.html'

    def get(self, request, *args, **kwargs):
        lists = None
        if request.user.is_authenticated():
            lists = WordList.objects.filter(user=request.user)

        return render(request, self.template_name, {'wordlists': lists})


class Word(View):
    def get(self, request, word, *args, **kwargs):

        return HttpResponse(word)


class WordListView(View):
    template_name = 'list-detail.html'

    def get(self, request, list_id, *args, **kwargs):
        if request.user.is_authenticated():
            list = get_object_or_404(WordList, id=list_id)
        else:
            return redirect('/accounts/login')

        return render(request, self.template_name, {'wordlist': list})
