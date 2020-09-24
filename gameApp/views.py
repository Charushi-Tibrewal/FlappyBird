from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login
from boto3.dynamodb.conditions import Key
import boto3

def index(request):
	return render(request, 'gameApp/index.html', )

def game(request):
	return render(request, 'gameApp/game.html', )

def login(request):
    if request.method == 'POST':
        s3 = boto3.resource('s3')
        bucket = s3.Bucket('user-image-flappyyou')
        dynamodb_client = boto3.client('dynamodb')
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username)

        if user_exists(username, dynamodb_client, password):
            with open('image', 'wb') as data:
                bucket.download_fileobj(username, data)
                print(data)

            return HttpResponseRedirect('/home')
        else:
            context = {
                "error" : "Error - Please Sign up"
            }
            return render(request, 'gameApp/login.html', context)
    else:
        return render(request, 'gameApp/login.html', {})

def signup(request):
    print("im here")
    print(request.method)

    if request.method == 'POST':
        s3 = boto3.resource('s3')
        bucket = s3.Bucket('user-image-flappyyou')
        dynamodb_client = boto3.client('dynamodb')
        username = request.POST.get('username')
        email = request.POST.get('email')
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')
        password = request.POST.get('password')
        image = request.FILES['filename']

        print(image)

        if user_exists(username, dynamodb_client):
            context = {
                "error" : "Error - User exists"
            }
            return render(request, 'gameApp/signup.html', context)

        else:

            # Create user


            # Fields are case sensitive
            item = {
                'Username': {'S': username},
                'Email': {'S': email},
                'FirstName': {'S': firstname},
                'LastName': {'S': lastname},
                'Password': {'S': password}
            }

            response = dynamodb_client.put_item(
                TableName='Users', 
                Item=item
            )

            bucket.upload_fileobj(image, username)

            print(response)

            context = {
                "error" : "User created !!"
            }

            return render(request, 'gameApp/index.html', context)


    return render(request, 'gameApp/signup.html', )

#if password value not provided, it will be initialized as none.
def  user_exists(username, dynamodb_client, password=None):
    response = dynamodb_client.get_item(
        TableName='Users',
        Key={
            'Username': {'S': username}
        }
    )

    # Empty dictionaries are false in python
    if response.get("Item"):
        if password:
            return response.get("Item").get("Password").get("S") == password
        return True
    else:
        return False 

# Create your views here.
