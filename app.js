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

  const calcScoreForAssignment = (
    AssignmentGroupData,
    currentLearnerSubmissionScore,
    isAssignmentLate,
    currentAssignmentId
  ) => {
    const points_possibleForAssignment = AssignmentGroupData.assignments.find(
      (assignment) => assignment.id === currentAssignmentId
    ).points_possible;

    const scoreForAssignment = +(
      (isAssignmentLate
        ? currentLearnerSubmissionScore - points_possibleForAssignment * 0.1
        : currentLearnerSubmissionScore) / points_possibleForAssignment
    ).toFixed(3);

    return scoreForAssignment;
  };

  const getLearnerIdAndSubmission = () => {
    for (let i = 0; i < LearnerSubmissions.length; i++) {
      let currentLearner = {};

      const currentLearner_id = LearnerSubmissions[i].learner_id;
      const currentLearnerSubmissionScore =
        LearnerSubmissions[i].submission.score;
      const currentAssignmentId = LearnerSubmissions[i].assignment_id;

      //isAssignmentLateCheck
      const due_at = new Date(
        AssignmentGroup.assignments.find(
          (assignment) => assignment.id === currentAssignmentId
        ).due_at
      );

      const submitted_at = new Date(
        LearnerSubmissions[i].submission.submitted_at
      );

      const isAssignmentLate = due_at < submitted_at;

      const isNotYetAssignmentDue = Date.now() < due_at;

      if (isNotYetAssignmentDue) continue;

      const scoreForAssignment = calcScoreForAssignment(
        AssignmentGroup,
        currentLearnerSubmissionScore,
        isAssignmentLate,
        currentAssignmentId
      );

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
        };

        continue;
      }

      currentLearner = {
        id: currentLearner_id,
        [currentAssignmentId]: scoreForAssignment,
      };

      result.push(currentLearner);

      currentLearner = {};
    }
  };

  getLearnerIdAndSubmission();

  return result;
};

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
