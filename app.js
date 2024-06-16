// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

const getLearnerData = (CourseInfo, AssignmentGroup, LearnerSubmissions) => {
  const result = [];

  //If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error
  if (AssignmentGroup.course_id !== CourseInfo.id) {
    throw new Error(
      "Assignment Group does not belong to its course! Invalid input data!"
    );
  }

  const addAvg = () => {
    for (let i = 0; i < result.length; i++) {
      result[i].avg = result[i].totalScore / result[i].totalpointsPossible;
      delete result[i].totalScore;
      delete result[i].totalpointsPossible;
    }
  };

  const getLearnerIdAndSubmission = () => {
    for (let i = 0; i < LearnerSubmissions.length; i++) {
      let currentLearner = {};

      const currentLearner_id = LearnerSubmissions[i].learner_id;
      const currentLearnerSubmissionScore =
        LearnerSubmissions[i].submission.score;
      const currentAssignmentId = LearnerSubmissions[i].assignment_id;

      const points_possibleForAssignment = AssignmentGroup.assignments.find(
        (assignment) => assignment.id === currentAssignmentId
      ).points_possible;

      //if points_possible is 0
      if (points_possibleForAssignment <= 0) {
        throw new Error("Points possible must be larger than 0");
      }

      //If an assignment is not yet due, do not include it in the results or the average.
      const due_at = new Date(
        AssignmentGroup.assignments.find(
          (assignment) => assignment.id === currentAssignmentId
        ).due_at
      );

      const isNotYetAssignmentDue = Date.now() < due_at;

      if (isNotYetAssignmentDue) continue;
      // --------------------------------------------------

      //if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
      const submitted_at = new Date(
        LearnerSubmissions[i].submission.submitted_at
      );

      const isAssignmentLate = due_at < submitted_at;

      //deduct 10 percent of the total points currentLearnerSubmissionScore - points_possibleForAssignment * 0.1
      const score = isAssignmentLate
        ? currentLearnerSubmissionScore - points_possibleForAssignment * 0.1
        : currentLearnerSubmissionScore;

      const scoreForAssignment = +(
        score / points_possibleForAssignment
      ).toFixed(3);
      //------------------------------------------------------

      //if we have learner in our result array, check by learner id and currentLearner_id
      const isLearnerExistData = result.find(
        (learner) => learner.id === currentLearner_id
      );

      if (isLearnerExistData) {
        const indexExistingLearner = result.findIndex(
          (learner) => learner.id === currentLearner_id
        );

        result[indexExistingLearner] = {
          ...result[indexExistingLearner],
          [currentAssignmentId]: scoreForAssignment,
          totalScore: (result[indexExistingLearner].totalScore += score),
          totalpointsPossible: (result[
            indexExistingLearner
          ].totalpointsPossible += points_possibleForAssignment),
        };

        continue;
      }

      // if we don`t have learner in our result array, creating new one and adding to array result
      currentLearner = {
        id: currentLearner_id,
        [currentAssignmentId]: scoreForAssignment,
        totalScore: score,
        totalpointsPossible: points_possibleForAssignment,
      };

      result.push(currentLearner);

      currentLearner = {};
    }
  };

  //Use try/catch and other logic to handle these types of errors gracefully.
  try {
    getLearnerIdAndSubmission();
    addAvg();
  } catch (error) {
    console.log(error);
    console.log(
      "An error occurred. Please ensure that the data is entered correctly."
    );
  }

  return result;
};

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
