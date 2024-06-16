<div align="center">
# JavaScript Fundamentals
</div>

## Objectives

- Employ basic JavaScript syntax accurately.
- Implement control flow structures such as conditionals and loops effectively.
- Use arrays and objects to organize and manage data.
- Develop functions to create reusable code.
- Utilize loops and iteration to navigate through data collections.
- Implement error handling to manage potential code failures gracefully.

## Functions created

- getLearnerData - accepts values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which is an array of objects

```
result: [
            { '1': 0.94, '2': 1, id: 125, avg: 0.985 },
            { '1': 0.78, '2': 0.833, id: 132, avg: 0.82 }
        ]
```

- getLearnerIdAndSubmission - function that adds to an result array objects as

```
    {
       id: number,
       currentAssignmentId: scoreForAssignment(number),
       totalScore: number,
       totalpointsPossible: points_possibleForAssignment(number)
    }
```

- addAvg - function that modifies result array objects, adds to each object avg property base on totalScore / totalpointsPossible values and deletes properties totalScore and totalpointsPossible. Example of an array object:

```
  {
    '1': 0.94,
    '2': 1,
    id: 125,
    avg: 0.985
  }
```

- greetBasedOnTime - function that generates a time-based greeting and prints it to the console using switch statement and new Date()

## Used in this project

- if, switch statements
- for and while loops
- functions to handle repeated tasks
- let and const variables
- operators to perform calculations on variables and literals
- strings, numbers, and Boolean values cached within variables
- try/catch statements to manage potential errors in the code
- utilize control keyword such as continue
- created and/or manipulated arrays and objects
- demonstrated the retrieval, manipulation, and removal of items in an array and properties in an object
