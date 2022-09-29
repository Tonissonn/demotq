# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


def most_frequent_pixel(List):
    max_occ = 0
    num = List[0]
    setList = list(set(List))
    for i in setList:
        current_frequency = List.count(i)
        if (current_frequency > max_occ):
            max_occ = current_frequency
            num = i

    return num

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    from PIL import Image
    from numpy import asarray

    img = Image.open('C:\proiecte\demotq\exercitii html\header.png')
    imgAsData = asarray(img)

    pixels = []

    for lines in imgAsData:
        for cells in lines:
            pixels.append(str(cells[0])+" "+str(cells[1])+" "+str(cells[2]))

    # pixels.sort(key=lambda ar:ar)

    headerPixel = most_frequent_pixel(pixels)
    print(headerPixel)
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
