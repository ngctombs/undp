import csv, json, xmltodict


def dataXMLFilter (s):
	undp2012str, temp = '<DocumentElement>', ''
	keep = False
	for x in s:
		if x[:10] == '    <year>' :
			if x[10:14] == '2012':
				keep = True
			else :
				keep = False

		if x[:8] == '  <Table':
			if keep == True:
				undp2012str += temp
			keep = False
			temp = ''
		temp += x
	undp2012str += '</DocumentElement>'
	return undp2012str

# FILTER DATA.XML TO BE 2012 SET ONLY
dataInput = open('data.xml', 'r')
dataOutput = open('data2012.xml', 'w')
dataOutput.write(dataXMLFilter(dataInput.readlines()))
dataOutput.close()

# CSV CONVERSION TO JSON
def csvToJson (inp, outp) :
	csvInput = open( inp )
	csvOutput = open( outp, 'w')
	csvOutput.write(json.dumps( [ x for x in csv.DictReader( csvInput ) ] ))
	csvOutput.close()

# XML CONVERTER TO JSON
def XMLToJson (inp, outp) :
	xmlInput = open( inp )
	xmlOutput = open( outp, 'w')
	xmlOutput.write(json.dumps(xmltodict.parse( xmlInput )))
	xmlOutput.close()


print('Victory is mine!')

dataInput2012 = open( 'data2012.xml' )
data = xmltodict.parse( dataInput2012 )
countriesInput = open( 'countries.csv' )
countries = [ x for x in csv.DictReader( countriesInput ) ]
indicatorInput = open( 'un_hdi.xml' )
indicators = xmltodict.parse( indicatorInput )

print(data['DocumentElement']['Table1'][0]['country'])
#STEP 1 : link UN Country codes to their data sets (tuples)
countrySet = {data['DocumentElement']['Table1'][z]['country'] : [(x, data['DocumentElement']['Table1'][z][x]) for x in data['DocumentElement']['Table1'][z] if data['DocumentElement']['Table1'][z][x] != None and x[0:4] == 'indi'] for z in range(len(data['DocumentElement']['Table1']))}

#STEP 2 : replace UN Country codes by ISO-2 codes (eg. CA, US, etc.)
isoSet = {countries[z]['iso2']:countrySet[countries[z]['country']] for z in range(len(countries)) if countries[z]['country'] in countrySet }

#STEP 3 : change from country:[(indicator, value), ..] to indicator:[(country, value), ...]
indicatorDict = dict()
for x in isoSet:
	for y in isoSet[x]:
		if y[0] in indicatorDict :
			indicatorDict[y[0]].append((x, y[1]))
		else :
			indicatorDict[y[0]] = [(x, y[1])]

#STEP 4 : write clean sets to files
for x in indicatorDict.keys():
	#indicatorFile = open( x + '.json', 'w' )
	y = json.dumps( indicatorDict )
	#indicatorFile.close()
print(y)