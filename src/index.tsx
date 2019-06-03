import _ from 'lodash';

class Greeter {
    public greeting: string;
    constructor(greeting: string) {
        this.greeting = greeting;
    }

    greet(): string {
        return `Hello, this.greeting`;
    }
}

const greeter: Greeter = new Greeter('Adam');

const button = document.createElement('button');

button.textContent = 'say Hello';

button.onclick = function(): void {
    alert(greeter.greet());
};

console.log(_.join([1,2,3,4], '!'));

document.body.appendChild(button);

