interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseExtendedPart extends CoursePartBase {
    description: string;
}
interface CourseNormalPart extends CourseExtendedPart {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
interface CourseSubmissionPart extends CourseExtendedPart {
    type: "submission";
    exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CourseExtendedPart {
    type: "special";
    requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export type { CoursePart }