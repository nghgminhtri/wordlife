import os
import sys
import time
from PIL import Image
from urllib import FancyURLopener
import urllib2
try:
    import simplejson
except ImportError:
    import json as simplejson


# Start FancyURLopener with defined version
class MyOpener(FancyURLopener):
    version = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11'


def get_google_image(keyword):
    myopener = MyOpener()

    # Replace spaces ' ' in search term for '%20' in order to comply with request
    keyword = keyword.replace(' ', '%20')

    url = ('https://ajax.googleapis.com/ajax/services/search/images?' + 'v=1.0&q='+keyword+'&start=0&imgsz=medium&userip=MyIP')
    print url
    request = urllib2.Request(url, None, {'Referer': 'testing'})
    response = urllib2.urlopen(request)

    # Get results using JSON
    filepath = ''
    flag = False
    i = -1
    results = simplejson.load(response)
    data = results['responseData']
    datainfo = data['results']
    while not flag:
        i += 1
        img_url = datainfo[i]
        filepath = img_url['imageId'] + '.jpg'
        myopener.retrieve(img_url['unescapedUrl'], filepath)

        # Check image valid
        try:
            im = Image.open(filepath)
            im.verify()
            flag = True
        except IOError:
            pass

    return filepath