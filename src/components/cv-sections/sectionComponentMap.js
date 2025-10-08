import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import EditableListSection from './EditableListSection';
import ProfileSection from './ProfileSection';
import PhotoSection from './PhotoSection';
import ContactSection from './ContactSection';
import ReferenceSection from './ReferenceSection';
import LevelBarSection from './LevelBarSection';
import HeaderSection from './HeaderSection';
import StarSkillSection from './StarSkillSection';

export const sectionComponentMap = {
  header: HeaderSection,
  photo: PhotoSection,
  contact: ContactSection,
  experience: ExperienceSection,
  education: EducationSection,
  languages: LevelBarSection,
  skills: LevelBarSection,
  softwareSkills: StarSkillSection, // New entry for the star-based skills
  references: ReferenceSection,
  interests: EditableListSection,
  strengths: EditableListSection,
  achievements: EditableListSection,
  certifications: EditableListSection,
  hobbies: EditableListSection,
  passions: EditableListSection, // Passions will use the generic list editor
  profile: ProfileSection,
};
