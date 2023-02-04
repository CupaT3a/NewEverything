#include <LiquidCrystal.h>

/*
 * https://www.arduino.cc/reference/en/libraries/liquidcrystal/
 * LiquidCrystal()
begin()
clear()
home()
setCursor()
write()
print()
cursor()
noCursor()
blink()
noBlink()
display()
noDisplay()
scrollDisplayLeft()
scrollDisplayRight()
autoscroll()
noAutoscroll()
leftToRight()
rightToLeft()
createChar()
 */

//Defining Pins
int pinCLK = 10;
int pinDT = 9;
int pinSW = 8;
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;

//LCD init
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

//Classes
class Option {
};
class Volume: public Option { 
  public:
    String text = "Volume";
    int value = 0;
};
class Frequency: public Option {
  public:
    String text = "Frequency";
    float value = 0.0;
};

//Variables
int pinCLKLast = LOW;
int pinSWLast = LOW;
Option* menuList[2] {
  new Volume,
  new Frequency
};

byte rightArrowHollow[8] {
  B11000,
  B10100,
  B10010,
  B10001,
  B10001, 
  B10010,
  B10100,
  B11000,
};
byte rightArrow[8] {
  B11000,
  B11100,
  B11110,
  B11111,
  B11111,
  B11110,
  B11100,
  B11000,
};
/*
char menuList[][16] = {
  "Option 1" , "Option 2", "Option 3"
};
*/

void setup() {
  //Pin inits
  pinMode(pinCLK, INPUT);
  pinMode(pinDT, INPUT);
  pinMode(pinSW, INPUT);

  //Pull Pins HIGH
  digitalWrite(pinSW, HIGH);

  //Change variables
  pinCLKLast = digitalRead(pinCLK);
  pinSWLast = digitalRead(pinSW);
  
  //LCD setup
  lcd.createChar(0, rightArrowHollow);
  lcd.createChar(1, rightArrow);
  lcd.begin(16, 2);
  
  //Debugging stuff
  lcd.cursor();
  lcd.blink();

  //Serial
  Serial.begin(9600);

  menuDisplay(0);
}

/*
char* cycleDownArray(char **input) {
  char *top = input[0];
  return top;
  
}
*/

int detectRotEnc() {
  //local variables
  int output = 0;
  int value;
  //Loops to Check Encoder
  while(true) {
    //For the Push Down
    //Checks if state of button has changed
    if((digitalRead(pinSW)) != pinSWLast) {
      if((digitalRead(pinSW)) == LOW) {
        //Pushed Down
        pinSWLast = LOW;
        Serial.print("Pushed down! ");
        output = 3;
        break;
      } else {
        //Released
        pinSWLast = HIGH;
      }
      delay(10);
    }
    //Finds if it is Clock or Anti-Clock
    value = digitalRead(pinCLK);

    if(value != pinCLKLast && value == HIGH) {
      if(digitalRead(pinDT) != value) {
        //Clockwise
        Serial.print("Clockwise! ");
        output = 1;
      } else {
        //Anticlockwise
        Serial.print("Anti-clockwise! ");
        output = 2;
      }
    }
    //Sets the Last CLK & SW value
    pinCLKLast = value;
    //Checks if output code has changed
    if(output != 0) {
      break;
    }
  }
  //Return exit code
  return output;
}

void cycleDownMenu() {
  //Get the array size
  size_t n = sizeof(menuList)/sizeof(menuList[0]);
  //Get the top of the list
  String top = menuList[0].text;
  int i;
  //Shifts Item 1 > Pos 2
  for (i = 0; i < n-1; i++) {
    menuList[i] = menuList[i+1];
  }
  //Puts the first Item to last Pos
  menuList[n-1] = top;
}

void cycleUpMenu() {
  //Get the array size
  size_t n = sizeof(menuList)/sizeof(menuList[0]);
  //Get the bottom of the list
  String bottom = menuList[n-1].text;
  int i;
  //Shifts puts 2nd last Item > last Pos
  for (i = n-1; i > 0; i--) {
    menuList[i] = menuList[i-1];
  }
  //Put Last Item to first Pos
  menuList[0] = bottom;
}

void menuDisplay(int cursorPos) {
  lcd.clear();
  if(cursorPos == 0) {
    lcd.setCursor(0,0);
    lcd.write(byte(1));
    lcd.setCursor(0,1);
    lcd.write(byte(0));
  } else if(cursorPos == 1) {
    lcd.setCursor(0,0);
    lcd.write(byte(0));
    lcd.setCursor(0,1);
    lcd.write(byte(1));
  } else {
    Serial.println("Cursor position out of bounds");
  }
  lcd.setCursor(1,0);
  lcd.print(menuList[0]);
  lcd.setCursor(1,1);
  lcd.print(menuList[1]);
}

void menu() {
  
}

void loop() {
  int value = detectRotEnc();
  if(value == 1) {
    cycleDownMenu();
    menuDisplay(0);
  } else if(value == 2) {
    cycleUpMenu();
    menuDisplay(1);
  } else if(value == 3) {
    lcd.print("Pushed!");
  }
  
}
