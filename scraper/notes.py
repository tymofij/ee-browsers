"""
Install wireshark
Filter AMF packages http.content_type contains "x-amf"
got two, yay! Pick one.
Right click on Media Type(application/x-amf) and "export selected packet bytes" as file1

Install PyAMF - currently does not work with python 2.7
"""

import pyamf
pyamf.remoting.decode(file('file1').read())

<Envelope amfVersion=3>
 (u'/1', <Request target=u'Data.getDatesFromTo'>[u'1', u'13', u'webBrowsersEngines', u'en']</Request>)
 (u'/2', <Request target=u'Data.getDataForStat'>[u'1', u'13', u'webBrowsersEngines', u'en']</Request>)
 (u'/3', <Request target=u'Data.getStrings'>[u'1', u'13', u'webBrowsersEngines', u'en']</Request>)
</Envelope>

pyamf.remoting.decode(file('file2').read())
<Envelope amfVersion=3>
 (u'/4', <Request target=u'Data.getDataForChart'>[u'1', u'13', u'webBrowsersEngines', u'en', True, 1167609600, 1290902400]</Request>)
 (u'/5', <Request target=u'Data.getDataForTableForAllColumns'>[u'1', u'13', u'webBrowsersEngines', u'en', True, [1290384000.0, 1289779200.0, 1289174400.0]]</Request>

countries = {0:'',1:'', 2:'poland', 3:'lithuania', 4:'latvia', 5:'estonia', 6:'czech_republic', 7:'hungary', 8:'ukraine', 9:'russia', 10:'bulgaria',
#11:'denmark', 12:'bosnia and hertzegovina',
13:'slovakia',
#14:'slovenia', 15:'belarus', 16:'croatia',
17:'turkey',}

####################################################
from pyamf.remoting.client import RemotingService

client = RemotingService('http://www.ranking.com.ua/en/sfGemAmfPhpGateway/AmfRanking.html', amf_version=pyamf.AMF3)
s = client.getService('Data')

s.getDatesFromTo(u'1', u'2', u'webBrowsersEngines', u'en') # interval
s.getDataForStat(u'1', u'2', u'webBrowsersEngines', u'en') # browser coding
s.getDataForChart(u'1', u'2', u'webBrowsersEngines', u'en', True, 1167609600, 1290902400) # request

# misc # UI strings
s.getStrings(u'1', u'2', u'webBrowsersEngines', u'en')

# table below
s.getDataForTableForAllColumns(u'1', u'2', u'webBrowsersEngines', u'en', True, [1290384000.0, 1289779200.0, 1289174400.0])
