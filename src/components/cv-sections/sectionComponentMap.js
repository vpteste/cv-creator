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
import AwardsSection from './AwardsSection';
import HobbiesSection from './HobbiesSection';
import LanguageDotSection from './LanguageDotSection';
import InfoTagsSection from './InfoTagsSection';
import CategorizedSkillsSection from './CategorizedSkillsSection';
import FlaggedLanguageSection from './FlaggedLanguageSection';
import IconContactSection from './IconContactSection';
import MixedHobbiesSection from './MixedHobbiesSection';
import SidebarSkillSection from './SidebarSkillSection';

export const sectionComponentMap = {
  // Atomic components
  Header: HeaderSection,
  Photo: PhotoSection,
  Contact: ContactSection,
  Profile: ProfileSection,
  InfoTags: InfoTagsSection,

  // List-based components
  Experience: ExperienceSection,
  Education: EducationSection,
  Awards: AwardsSection,
  References: ReferenceSection,
  
  // Specific style components
  DotLanguages: LanguageDotSection,
  FlaggedLanguages: FlaggedLanguageSection,
  LevelBarSkills: LevelBarSection,
  CategorizedSkills: CategorizedSkillsSection,
  StarSkills: StarSkillSection,
  Hobbies: HobbiesSection,
  
  // Generic list for simple text items
  EditableList: EditableListSection,
  IconContact: IconContactSection,
  MixedHobbies: MixedHobbiesSection,
  SidebarSkills: SidebarSkillSection,
};
