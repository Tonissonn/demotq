print("start mail merging")

import csv

with open('Mail-merge-final-original-_1_.csv') as csv_in_file:
    with open('output.csv', 'w') as csv_out_file:
        reader = csv.reader(csv_in_file, delimiter = ',')
        writer = csv.writer(csv_out_file, lineterminator='\n')

        columns=[]
        lines = []
        # newData = []
        isLine = False
        rowsToWrite = []

        for row in reader:
            if not isLine:
                columns.append(row)
                isLine = True
            else:
                lines.append(row)

        newColumns = columns[0]
        newColumns = [i for i in newColumns if i]
        columns = columns[0]

        columns = [i for i in columns if i]
        newColumns.append("Judet")
        newColumns.append("Localitate")
        newColumns.append("Strada")
        newColumns.append("Numar")
        newColumns.append("Bloc")
        newColumns.append("Scara")
        newColumns.append("Apartament")


        dataSiLoculNasteriiIndex = columns.index("Data si locul nasterii")
        adresaDomiciliuIndex = columns.index("Adresa domiciliu")

        rowsToWrite.append(newColumns)


        # print(dataSiLoculNasteriiIndex,adresaDomiciliuIndex)
        index = 0
        for row in lines:
            newData = []
            newRowToWrite = []
            for i in range(len(columns)):
                newRowToWrite.append(row[i])

            index=index+1
            field = row[adresaDomiciliuIndex].split(",")
            # print(line)
            judet = [i for i in field if ("Jud" in i or "JUD" in i)]
            municipiu = [i for i in field if ("Mun" in i or "Com" in i or "Oras" in i or "MUN" in i or "Sat " in i or "SAT" in i)]
            strada = [i for i in field if ("Str" in i or "Ale" in i or "Prl" in i or "Bd" in i or "Ulc" in i or "Sos" in i or "ALE" in i or "Bld" in i or "Cal" in i or "str" in i or "Pta" in i)]
            numar = [i for i in field if ("Nr" in i or "nr" in i)]
            bloc = [i for i in field if ("Bl" in i or "bl" in i)]
            scara = [i for i in field if ("Sc" in i)]
            apartament = [i for i in field if ("Ap." in i or "AP." in i or "ap." in i)]

            # print(index, judet, municipiu,strada,numar,bloc,scara,apartament)
            # print(strada, index)

            # if len(bloc) == 1:
            #     if not  len(apartament) == 1:
            #             print(line)
            #             print(apartament)
            # print(index)
            # print(line)

            newData.append(judet)
            newData.append(municipiu)
            newData.append(strada)
            newData.append(numar)
            newData.append(bloc)
            newData.append(scara)
            newData.append(apartament)
            for data in newData:
                if(len(data)==0):
                    newRowToWrite.append('')
                elif (len(data) == 1):
                    newRowToWrite.append(data[0])
                else:
                    newRowToWrite.append(data[0]+data[1])
            # print(newRowToWrite)
            rowsToWrite.append(newRowToWrite)
        # print(newData)
        # for info in newData:
        #     if (len(info) == 0):
        #         print(index)

        # print(newData)

        # print(columns)

        writer.writerows(rowsToWrite)


# import csv
#
# with open('C:/test/test.csv','r') as csvinput:
#     with open('C:/test/output.csv', 'w') as csvoutput:
#         writer = csv.writer(csvoutput, lineterminator='\n')
#         reader = csv.reader(csvinput)
#
#         all = []
#         row = next(reader)
#         row.append('Berry')
#         all.append(row)
#
#         for row in reader:
#             row.append(row[0])
#             all.append(row)
#
#         writer.writerows(all)