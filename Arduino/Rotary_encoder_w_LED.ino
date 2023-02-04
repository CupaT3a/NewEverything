int PinCLK = 4;
int PinDT = 5;
int PinSW = 0;
static long encoderPos = -1;
int PinCLKLast = LOW;
int totalSteps = 30;
int value = LOW;

int PinLED = 3;
float dutyCycle;

void setup() { 
  pinMode(PinCLK, INPUT);
  pinMode(PinDT, INPUT);
  pinMode(PinSW, INPUT);
  pinMode(PinLED, OUTPUT);
  Serial.begin(9600);
} 

void loop() { 
   if (!(digitalRead(PinSW))) {      
       encoderPos = 0;
       dutyCycle = 0;
   }
   
   value = digitalRead(PinCLK);
   
   if (value != PinCLKLast) {
       if (digitalRead(PinDT) != value) {
           encoderPos++;
           dutyCycle += 1.0 / totalSteps;
           Serial.print("Clockwise");
           Serial.print(encoderPos);
           Serial.println(dutyCycle);
       } else {
           encoderPos--;
           dutyCycle -= 1.0 / totalSteps;
           Serial.print("Anti-clockwise");
           Serial.print(encoderPos);
           Serial.println(dutyCycle);
       }
       if (encoderPos < 0) {
           encoderPos += totalSteps;
       }
       if (dutyCycle < 0) {
           dutyCycle = 0;
       } else if (dutyCycle > 1) {
           dutyCycle = 1;
       }
       encoderPos = encoderPos % totalSteps;
       
   }
   PinCLKLast = value;

   analogWrite(PinLED, (int)(dutyCycle * dutyCycle * 255));
 }
