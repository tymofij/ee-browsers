#!/usr/bin/env python2.6
import pyamf
from pyamf.remoting.client import RemotingService
import json

client = RemotingService('http://www.ranking.com.ua/en/sfGemAmfPhpGateway/AmfRanking.html', amf_version=pyamf.AMF3)
s = client.getService('Data')

country_codes = {
    2:'poland',
    3:'lithuania',
    4:'latvia',
    5:'estonia',
    6:'czech_republic',
    7:'hungary',
    8:'ukraine',
    9:'russia',
    10:'bulgaria',
    #11:'denmark', 12:'bosnia and hertzegovina',
    13:'slovakia',
    #14:'slovenia', 15:'belarus', 16:'croatia',
    17:'turkey'
}

for (code, country) in country_codes.items():
    with file('../json/'+country+'.json', 'w') as f:
        print country
        interval = s.getDatesFromTo(u'1', unicode(code), u'webBrowsersEngines', u'en')
        coding = s.getDataForStat(u'1', unicode(code), u'webBrowsersEngines', u'en') # browser coding
        data = s.getDataForChart(u'1', unicode(code), u'webBrowsersEngines', u'en', True, interval['from'], interval['to'])
        res = {
            'inverval': interval,
            'coding': coding,
            'data': data
        }
        f.write(json.dumps(res, indent=2, sort_keys=True))