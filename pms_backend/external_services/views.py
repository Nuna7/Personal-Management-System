from django.views.decorators.csrf import ensure_csrf_cookie
from newsapi import NewsApiClient
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework import status
import json
from rest_framework.decorators import api_view
import worldnewsapi
from worldnewsapi.rest import ApiException
import random
import requests
from django.http import JsonResponse
from datetime import date, timedelta
import environ
import os

countryOptions = [
    { "value": 'ae', "label": 'United Arab Emirates' },
    { "value": 'ar', "label": 'Argentina' },
    { "value": 'at', "label": 'Austria' },
    { "value": 'au', "label": 'Australia' },
    { "value": 'be', "label": 'Belgium' },
    { "value": 'bg', "label": 'Bulgaria' },
    { "value": 'br', "label": 'Brazil' },
    { "value": 'ca', "label": 'Canada' },
    { "value": 'ch', "label": 'Switzerland' },
    { "value": 'cn', "label": 'China' },
    { "value": 'co', "label": 'Colombia' },
    { "value": 'cu', "label": 'Cuba' },
    { "value": 'cz', "label": 'Czech Republic' },
    { "value": 'de', "label": 'Germany' },
    { "value": 'eg', "label": 'Egypt' },
    { "value": 'fr', "label": 'France' },
    { "value": 'gb', "label": 'United Kingdom' },
    { "value": 'gr', "label": 'Greece' },
    { "value": 'hk', "label": 'Hong Kong' },
    { "value": 'hu', "label": 'Hungary' },
    { "value": 'id', "label": 'Indonesia' },
    { "value": 'ie', "label": 'Ireland' },
    { "value": 'il', "label": 'Israel' },
    { "value": 'in', "label": 'India' },
    { "value": 'it', "label": 'Italy' },
    { "value": 'jp', "label": 'Japan' },
    { "value": 'kr', "label": 'South Korea' },
    { "value": 'lt', "label": 'Lithuania' },
    { "value": 'lv', "label": 'Latvia' },
    { "value": 'ma', "label": 'Morocco' },
    { "value": 'mx', "label": 'Mexico' },
    { "value": 'my', "label": 'Malaysia' },
    { "value": 'ng', "label": 'Nigeria' },
    { "value": 'nl', "label": 'Netherlands' },
    { "value": 'no', "label": 'Norway' },
    { "value": 'nz', "label": 'New Zealand' },
    { "value": 'ph', "label": 'Philippines' },
    { "value": 'pl', "label": 'Poland' },
    { "value": 'pt', "label": 'Portugal' },
    { "value": 'ro', "label": 'Romania' },
    { "value": 'rs', "label": 'Serbia' },
    { "value": 'ru', "label": 'Russia' },
    { "value": 'sa', "label": 'Saudi Arabia' },
    { "value": 'se', "label": 'Sweden' },
    { "value": 'sg', "label": 'Singapore' },
    { "value": 'si', "label": 'Slovenia' },
    { "value": 'sk', "label": 'Slovakia' },
    { "value": 'th', "label": 'Thailand' },
    { "value": 'tr', "label": 'Turkey' },
    { "value": 'tw', "label": 'Taiwan' },
    { "value": 'ua', "label": 'Ukraine' },
    { "value": 'us', "label": 'United States' },
    { "value": 've', "label": 'Venezuela' },
    { "value": 'za', "label": 'South Africa' }
]

categoryOptions = [
    { "value": 'business', "label": 'Business' },
    { "value": 'entertainment', "label": 'Entertainment' },
    { "value": 'health', "label": 'Health' },
    { "value": 'science', "label": 'Science' },
    { "value": 'sports', "label": 'Sports' },
    { "value": 'technology', "label": 'Technology' },
    { "value": 'general', "label": 'General'}
]

languageOptions = [
    { "value": 'ar', "label": 'Arabic' },
    { "value": 'de', "label": 'German' },
    { "value": 'en', "label": 'English' },
    { "value": 'es', "label": 'Spanish' },
    { "value": 'fr', "label": 'French' },
    { "value": 'he', "label": 'Hebrew' },
    { "value": 'it', "label": 'Italian' },
    { "value": 'nl', "label": 'Dutch' },
    { "value": 'no', "label": 'Norwegian' },
    { "value": 'pt', "label": 'Portuguese' },
    { "value": 'ru', "label": 'Russian' },
    { "value": 'sv', "label": 'Swedish' },
    { "value": 'ud', "label": 'Urdu' },
    { "value": 'zh', "label": 'Chinese' }
]

sortByOptions = [
    { "value": 'relevance', "label": 'Relevance' },
    { "value": 'popularity', "label": 'Popularity' },
    { "value": 'publishedAt', "label": 'Published Date' },
]

all_category = ['age','alone','amazing','anger','art','attitude','beauty','best','business','change','communication','cool','courage',
                'dating','death','dreams','education','environmental','equality','experience','failure','faith','family','famous',
                'fear','fitness','food','forgiveness','freedom','friendship','funny','future','god','good','government','graduation',
                'great','happiness','health','history','home','hope','humor','imagination','inspirational','intelligence',
                'jealousy''knowledge','leadership','learning','legal','life','love','marriage','medical','men','mom','money',
                'morning','movies','success']

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
front_end_url = 'http://localhost:3000/'
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

NEWSAPI_API = env('NEWSAPI_API')
QUOTE_API = env('QUOTE_API')
newsapi = NewsApiClient(api_key=NEWSAPI_API)

@ensure_csrf_cookie
@login_required
def headlines(request):
    """
    View to get top headlines from News API based on query parameters.
    """

    if request.method == "GET":

        params = request.GET
        
        keywords = params.get('keywords', '')
        category = params.get('category', '')
        language = params.get('language', '')
        country = params.get('country', '')

        try:
            top_headlines = newsapi.get_top_headlines(
                q=keywords,
                category=category,
                language=language,
                country=country
            )

            all_news = {}
            if top_headlines['totalResults'] >= 1:
                for i, article in enumerate(top_headlines['articles'], start=1):
                    all_news[f'news_{i}'] = {
                        "source": article['source']['name'],
                        "author": article['author'],
                        "title": article['title'],
                        "description": article['description'],
                        "publishedAt": article['publishedAt'],
                    }

            else:
                all_news['message'] = 'No articles found'

            return JsonResponse(all_news)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@ensure_csrf_cookie
@login_required
def articles(request):
    """
    View to get news articles from News API based on query parameters.
    """
    if request.method == "GET":
        params = request.GET
        
        keywords = params.get('keywords', '')
        sources = params.get('sources', '')
        country = params.get('country', '')
        from_date = params.get('from_date', '')
        to_date = params.get('to_date', '')
        sort_by = params.get('sort_by', '')
        language = params.get('language', '')

        try:
            all_articles = newsapi.get_everything(q=keywords,
                                      sources=sources,
                                      from_param=from_date,
                                      to=to_date,
                                      language=language,
                                      sort_by=sort_by)

            all_news = {}
            if all_articles['totalResults'] >= 1:
                for i, article in enumerate(all_articles['articles'], start=1):
                    all_news[f'news_{i}'] = {
                        "source": article['source']['name'],
                        "author": article['author'],
                        "title": article['title'],
                        "description": article['description'],
                        "publishedAt": article['publishedAt'],
                    }

            else:
                all_news['message'] = 'No articles found'

            return JsonResponse(all_news)

        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def sources(request):
    """
    View to get available news sources from News API.
    """
    try:
        sources_response = newsapi.get_sources()
        sources_options = [{"value": source['id'], "label": source['name']} for source in sources_response['sources']]
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    options = {
        "countryOptions": countryOptions,
        "categoryOptions": categoryOptions,
        "languageOptions": languageOptions,
        "sourceOptions": sources_options,
        "sortByOptions": sortByOptions
    }

    return JsonResponse(options)

@api_view(['GET'])
@ensure_csrf_cookie
def quote(request):
    """
    View to get a random quote from the Quotes API.
    """
    category = random.choice(all_category)
    api_url = f'https://api.api-ninjas.com/v1/quotes?category={category}'
    response = requests.get(api_url, headers={'X-Api-Key': QUOTE_API})
    
    if response.status_code == requests.codes.ok:
        response_data = json.loads(response.text)
        if response_data:
            data = {
                "quote": response_data[0]['quote'],
                "author": response_data[0]['author']
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No quotes found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Failed to fetch quotes'}, status=status.HTTP_400_BAD_REQUEST)