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

csvToJson('units.csv', 'units.json')
csvToJson('countries.csv', 'countries.json')
XMLToJson('un_hdi.xml', 'un_hdi.json')
XMLToJson('data2012.xml', 'data.json')

print('Victory is mine!')