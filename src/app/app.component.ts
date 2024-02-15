import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-calculator';
  firstNumber: any = '';
  secondNumber: any = '';
  sign = '';
  result = false;
  out: number | string = 0;

  buttons = {};
  digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  action = ['ac', '+/-', '%', '/', 'X', '-', '+', '.', '='];

  //clear
  clearAll() {
    this.firstNumber = '';
    this.secondNumber = '';
    this.sign = '';
    this.result = false;
    this.out = 0;
    console.log('AC worked');
  }

  //calculate
  calculate(event: any) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('btn')) {
      const buttonText = clickedElement.textContent;

      if (buttonText === 'ac') {
        this.clearAll();
      } else if (buttonText === '+/-') {
        this.changeSign();
      } else if (buttonText === '%') {
        this.calculatePercentage();
      } else if (
        buttonText === '/' ||
        buttonText === 'X' ||
        buttonText === '-' ||
        buttonText === '+'
      ) {
        this.performOperation(buttonText);
      } else if (buttonText === '.') {
        this.addDecimal();
      } else if (buttonText === '=') {
        this.performCalculation();
      } else if (this.digits.includes(buttonText)) {
        this.addDigit(buttonText);
      }
    }
  }

  changeSign() {
    this.firstNumber = -this.firstNumber;
    this.out = this.firstNumber;
  }

  calculatePercentage() {
    this.secondNumber = 100;
    this.firstNumber = this.firstNumber / this.secondNumber;
    this.out = this.firstNumber;
  }

  performOperation(sign: string) {
    this.sign = sign;
    this.out = this.sign;
  }

  addDecimal() {
    if (!this.firstNumber.includes('.')) {
      this.firstNumber += '.';
      this.out = this.firstNumber;
    }
  }

  addDigit(digit: string) {
    if (this.secondNumber === '' && this.sign === '') {
      this.firstNumber += digit;
      this.out = this.firstNumber;
    } else if (
      this.firstNumber !== '' &&
      this.secondNumber !== '' &&
      this.result
    ) {
      this.secondNumber = digit;
      this.result = false;
      this.out = this.secondNumber;
    } else {
      this.secondNumber += digit;
      this.out = this.secondNumber;
    }
  }

  performCalculation() {
    if (this.secondNumber === '') {
      this.secondNumber = this.firstNumber;
    }

    switch (this.sign) {
      case '+':
        this.firstNumber = +this.firstNumber + +this.secondNumber;
        break;
      case '-':
        this.firstNumber = +this.firstNumber - +this.secondNumber;
        break;
      case 'X':
        this.firstNumber = +this.firstNumber * +this.secondNumber;
        break;
      case '/':
        if (this.secondNumber === '0') {
          this.out = 'Error: incorrect';
          this.firstNumber = '';
          this.secondNumber = '';
          this.sign = '';
          return;
        }
        this.firstNumber = +this.firstNumber / +this.secondNumber;
        break;
      case '%':
        this.calculatePercentage();
        break;
      case '+/-':
        this.changeSign();
        break;
    }

    this.result = true;
    this.out = this.firstNumber;
  }
}
