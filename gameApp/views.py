from django.shortcuts import render
from django.http import HttpResponse 

def index(request):
	return render(request, 'gameApp/index.html', )

def game(request):
	return render(request, 'gameApp/game.html', )

# Create your views here.
