function Student(data) {
    this.getName = () => data.name;
    this.getEmail = () => data.email;

    const homeworkResults = [];

    this.addHomeworkResult = (topic, success) => {
        homeworkResults.push({
            topic: topic,
            success: success
        })
    }

    this.getHomeworkResults = () => homeworkResults;
}

function FrontendLab(listOfStudents, fails) {
    const studentsList = createStudents(listOfStudents);

    let failedHomeworksLimit = fails;

    function createStudents(data) {
        const studentsList = [];

        for (let student of data) {
            studentsList.push(new Student(student))
        }
        return studentsList;
    }

    this.addHomeworkResults = function (data) {
        for (let i = 0; i < data.results.length; i += 1) {
            const findStudent = studentsList.find(student => {
                return student.getEmail() === data.results[i].email;
            })

            findStudent.addHomeworkResult(data.topic, data.results[i].success);
        }

    }

    this.printStudentsList = function () {
        for (let student of studentsList) {
            console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
            console.log(student.getHomeworkResults());
        }
    }

    this.printStudentsEligibleForTest = function () {
        for (let student of studentsList) {
            let failsCounter = 0;

            for (let topic of student.getHomeworkResults()) {
                !topic.success ? failsCounter += 1 : failsCounter;
            }

            if (failsCounter <= failedHomeworksLimit) {
                console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
            }
        }
    }
}


//just in case
// const student1 = new Student({
//     name: 'John',
//     email: 'john@gmail.com'
// })

// const lab = new FrontendLab(listOfStudents, 3)

// lab.addHomeworkResults(homeworkResults[0])