#include <iostream>
#include <cmath>

using namespace std;

void rectangleOption() {
    double height, width;
    cout << "Enter the height of the rectangle: ";
    cin >> height;
    cout << "Enter the width of the rectangle: ";
    cin >> width;

        if (fabs(width - height) >5) {
            cout << "Area of the rectangle: " << height * width << endl;
        }
        else {
            cout << "Perimeter of the rectangle: " << 2 * (height + width) << endl;
        }
    }



void triangleOption() {
    int base;
    double height;
    cout << "Enter the base length of the triangle: ";
    cin >> base;
    cout << "Enter the height of the triangle: ";
    cin >> height;
    double power = pow((base / 2),2) + pow(height,2);
    double perimeter=sqrt(power)*2+base;
        cout << "Perimeter of the triangle: " << perimeter << endl;
 
}

int checkNumOfOdd(int width) {
    int counter=0;
    for (int i = 3; i < width; i+=2)
    {
        counter++;
    }
    return counter;
}

void printTriangle(int width, int height) {
    int numOfStarsRows, placeInRow, numOfStars=1, numOfLeftRows, counter=0,anotherForFirstRows=0, numOfRowsEveryTime;
        numOfStarsRows = checkNumOfOdd(width);
        numOfLeftRows = height - 2;
        numOfRowsEveryTime = numOfLeftRows / numOfStarsRows;
        if (numOfLeftRows % numOfStarsRows != 0)
            anotherForFirstRows= numOfLeftRows % numOfStarsRows;
        placeInRow = (width - numOfStars) / 2;
        for (int i = 1; i <= placeInRow; i++)
            cout << ' ';
        cout << '*' << endl;
        numOfStars += 2;
    for (int i = 2; i <= height;i++)
    {
        placeInRow = (width - numOfStars) / 2;

        for (int j = 1; j <= placeInRow; j++)
            cout << ' ';
        for (int j = 1; j <= numOfStars; j++)
            cout << '*';
        cout << endl;
        counter++;
        if (counter == numOfRowsEveryTime + anotherForFirstRows)
        {
            numOfStars += 2;
            counter -= (numOfRowsEveryTime+ anotherForFirstRows);
            anotherForFirstRows = 0;
        }
    }

}

void trianglePrintOption() {
    int width, height;
    cout << "Enter the width of the triangle: ";
    cin >> width;
    cout << "Enter the height of the triangle: ";
    cin >> height;

    if (width % 2 != 0 && width < 2 * height) {
        printTriangle(width, height);
    }
    else {
        cout << "Invalid input! Width should be odd and less than 2 times the height." << endl;
    }
}

int main()
{
    int choice;
    do {
        cout << "Menu:" << endl;
        cout << "1. Rectangle" << endl;
        cout << "2. Triangle" << endl;
        cout << "3. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
        case 1:
            rectangleOption();
            break;
        case 2:
            int triangleChoice;
            cout << "Triangle Options:" << endl;
            cout << "1. Calculate perimeter" << endl;
            cout << "2. Print triangle" << endl;
            cout << "Enter your choice: ";
            cin >> triangleChoice;
            switch (triangleChoice) {
            case 1:
                triangleOption();
                break;
            case 2:
                trianglePrintOption();
                break;
            default:
                cout << "Invalid choice!" << endl;
                break;
            }
            break;
        case 3:
            cout << "Exiting..." << endl;
            break;
        default:
            cout << "Invalid choice!" << endl;
            break;
        }
    } while (choice != 3);

    return 0;
}