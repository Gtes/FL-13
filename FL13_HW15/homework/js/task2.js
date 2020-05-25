function Vehicle(parameters) {
    this.timer;

    this.color = parameters.color ? parameters.color : '';
    this.engine = parameters.engine;

    this.maxSpeed = 70;

    this.isDriving = false;
    this.isSlowsDown = false;

    this.currentSpeed = 0;
}

Vehicle.prototype.upgradeEngine = function (newEngine, maxSpeed) {
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
}

Vehicle.prototype.getInfo = function () {
    const getInfo = {}

    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            getInfo[key] = this[key]
        }
    }

    return getInfo;
}

Vehicle.prototype.drive = function () {
    const DRIVE_INTERVAL = 2000;
    const VEHICLE_TYPE = this.constructor.name;
    const MOTOR_HEAT_DIF = 30;

    if (this.isDriving) {
        return console.log('Already driving!');
    } else {
        clearTimeout(this.timer);
        this.isDriving = true;
        this.isSlowsDown = false;

        VEHICLE_TYPE === 'Motorcycle' ? console.log('Lets drive!') : '';

        const increaseSpeed = () => {
            this.currentSpeed += 20;

            console.log(this.currentSpeed);

            if (this.currentSpeed > this.maxSpeed) {
                console.log('speed is too high, SLOW DOWN!');
            }

            if (VEHICLE_TYPE === 'Motorcycle' && this.currentSpeed > this.maxSpeed + MOTOR_HEAT_DIF) {
                console.log('Engine overheating')
                this.stop()
            }
        }

        this.timer = setInterval(() => {
            increaseSpeed();
        }, DRIVE_INTERVAL);
    }

}

Vehicle.prototype.stop = function () {
    const STOP_INTERVAL = 1500;
    const VEHICLE_TYPE = this.constructor.name;


    if (this.isSlowsDown) {
        return console.log('Already slows down!');
    } else if (!this.isDriving || this.currentSpeed === 0) {
        return console.log('Already stopped!');
    } else {
        clearTimeout(this.timer);

        this.isDriving = false;
        this.isSlowsDown = true;

        let onStopPressedSpeed = this.currentSpeed;

        let maxSpeed = this.currentSpeed > onStopPressedSpeed ? this.currentSpeed : onStopPressedSpeed;

        const decreaseSpeed = () => {
            this.currentSpeed -= 20;

            if (this.currentSpeed === 0) {
                if (VEHICLE_TYPE === 'Motorcycle') {
                    console.log(`Motorcycle ${this.model} is stopped. Good drive`)
                } else {
                    console.log(VEHICLE_TYPE + ' ' + (this.model ? this.model : '') +
                        ' is stopped. Maximum speed during the drive was ' + maxSpeed);
                }

                this.isSlowsDown = false;

                clearTimeout(this.timer);
            } else {
                console.log(this.currentSpeed);
            }
        }

        this.timer = setInterval(() => {
            decreaseSpeed();
        }, STOP_INTERVAL);
    }
}

function Car(parameters) {
    Vehicle.apply(this, arguments);

    this.model = parameters.model;
    this.maxSpeed = 80;
}

Car.prototype = Object.create(Vehicle.prototype)

Object.defineProperty(Car.prototype, 'constructor', {
    value: Car,
    enumerable: false,
    writable: true
});

Car.prototype.changeColor = function (color) {
    switch (true) {
        case this.isDriving:
            return console.log('Cannot paint cars is moving!')

        case this.color === color:
            return console.log('The selected color is the same as the previous, please choose another one')

        default:
            this.color = color;
    }
}

function Motorcycle(parameters) {
    Vehicle.apply(this, arguments);

    this.model = parameters.model;
    this.maxSpeed = 80;

    this.isPainted = false
}

Motorcycle.prototype = Object.create(Vehicle.prototype)

Object.defineProperty(Motorcycle.prototype, 'constructor', {
    value: Motorcycle,
    enumerable: false,
    writable: true
});



//just in case

// const bimmer = new Vehicle({
//     color: 'black',
//     engine: 'v8'
// })

// const test = new Car({
//     color: 'red',
//     engine: 'v8',
//     model: 'vaz'
// });

// const motor = new Motorcycle({
//     color: 'blue',
//     engine: 'v8',
//     model: 'honda'
// })


// console.log(bimmer)
// console.log(test)
// console.log(motor)