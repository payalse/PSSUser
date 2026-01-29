import { ViewStyle } from 'react-native';

export interface CalendarConnectionProps {
  isConnected: boolean;
  type: 'Google' | 'Outlook' | 'Phone';
}

interface PromptProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type TextVariant =
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption'
  | 'link'
  | 'backgroundFill'
  | 'royal';

export type EnumColors =
  | 'Primary'
  | 'Secondary'
  | 'Tertiary'
  | 'Red'
  | 'White';

export interface TemplateProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerProps?: HeaderProps;
  showFooter?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  renderStickyFooter?: () => React.ReactNode;
  isLoading?: boolean;
  scrollRef?: any;
  stickyHeader?: boolean;
}

export interface HeaderProps {
  title: string;
  variant?: 'Primary' | 'Secondary';
  color?: EnumColors;
  showTitle?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  showClose?: boolean;
  showMessage?: boolean;
  showNotification?: boolean;
  showWelcome?: boolean;
  overContent?: boolean;
  searchValue?: string;
  onChange?: (s: string) => void;
  type?: string;
  margin?: number;
}

export interface FullScreenModalProps {
  visible: boolean;
  title: string;
  message: string;
  renderBottom?: () => React.ReactNode;
  bottomFlexRow?: boolean;
  onBack?: () => void;
}

type Author = {
  name: string;
  _id: string;
};

export interface CourseProps {
  _id: string;
  title: string;
  description: string;
  author: Author;
  totalChapter: number;
  currentChapter: number;
  tag: string;
  completion_percentage: number;
  thumbnail: string;
  enrolled: string[];
  completionId?: string;
}

export type ResourceType = 'Videos' | 'Podcast' | 'Blog' | 'Jobs' | 'Documents';

interface BaseResourceProps {
  _id: string;
  type: ResourceType;
  title: string;
  thumbnail: string;
  author: Author;
  eventDate: string;
  description: string;
}

interface VideoResource extends BaseResourceProps {
  type: 'Videos';
  videoDuration: string;
  videoURL: string;
}

interface PodcastResource extends BaseResourceProps {
  type: 'Podcast';
  podcastDuration: string;
  podcastURL: string;
}

interface BlogResource extends BaseResourceProps {
  type: 'Blog';
  blogURL: string;
}

interface JobResource extends BaseResourceProps {
  type: 'Jobs';
  location: string;
  jobType: string;
  applicationURL: string;
}

interface DocumentResource extends BaseResourceProps {
  type: 'Documents';
  documentURL: string;
  isWhitePaper: boolean;
}

export type ResourceProps =
  | Videos
  | Podcasts
  | Blog
  | Jobs
  | Documents;

export interface AnnouncementProps {
  title: string;
  description: string;
  createdAt: string;
}

export interface BlogsProps {
  _id: number;
  title: string;
  description: string;
  createdAt: string;
  thumbnail: string;
}

export interface DropDown {
  _id: number;
  spelling: string;
  type: number;
  createdAt: string;
}

export interface EventProps {
  _id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  location: string;
  image: string;
  address: string;
  type: string;
  active: string;
  attendees: string[];
  createdBy: string;
  attending: boolean | false;
  deleteMyTask: (data: any) => void
}

export interface QuizProps {
  _id: string;
  question: string;
  options: string[];
  correct: string;
  selected: string;
  document?: string[];
}

export interface CourseSessionProps {
  _id: string;
  course_id: string;
  session_title: string;
  session_description: string;
  session_video: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  quizzes: SessionQuiz[];
}

export interface SessionQuiz {
  _id: string;
  ans: string;
  course: string;
  option_1: string;
  option_2: string;
  option_3: boolean;
  createdAt: string;
  updatedAt: string;
  option_4: string;
  question: string;
  session: string;
  options: string[];
  selected: string;
}

export interface CourseNoteProps {
  _id: string;
  title: string;
  description: string;
  media: string;
}
export interface NotificationProps {
  _id: string;
  type: 'CertificateAdded' | 'Commented' | 'Liked' | 'FriendRequest';
  title: string;
  createdAt: string;
  message: string;
  user: { _id: string; name: string; image: string };
  all_user: boolean | false;
  category : string;
  date : string;
  description : string;
  image : string;
  notif_tag: string;
  schedule_name : string;
  send_now : boolean | false;
  users : []
}

export interface SupportTicketProps {
  _id: string;
  title: string;
  description: string;
  status: 0 | 1 | 2;
  subject: string | null;
  createdAt: string;
  report: any;
  messages?: Messages[];
  updatedAt: string;
  user: string | null;
}

export interface Messages {
  _id: string;
  message: string;
  receiver: string;
  createdAt: string;
  sender: string;
  ticket: string;
  updatedAt: string;
}

export type AuthUser = {
  token: string;
  _id: string;
  uid: string;
  role: 0 | 1 | 2;
  email: string;
  account_status: 1 | 2 | 3 | 4;
  user_status: 0 | 1 | 2 | 3 | 4;
  email_verified?: boolean;
  type: 0;
  createdAt: string;
  updatedAt: string;
  bio?: string;
  name?: string;
  profile_pic?: string;
  mobile_number?: string;
  gender_identity?: string;
  date_of_birth?: string;
  profile_setup?: boolean | false;
  racial_identity?: string,
  sexual_orientation?: string,
  who_you_are?: string,
  denomination?: string,
  faith?: string,
  your_company?: string,
  school?: string,
};

export type UserAddress = {
  uid: string;
  _id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  uid: string;
  _id: string;
  all_notification: boolean;
  email_notification: boolean;
  event_notification: boolean;
  message_notification: boolean;
  push_notification: boolean;
  createdAt: string;
  updatedAt: string;
  notification_token: []
};

export type NotificationSettings = {
  all_notification: boolean;
  email_notification: boolean;
  event_notification: boolean;
  message_notification: boolean;
  push_notification: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Blog = {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  type: 'Blogs';
};

export interface FAQList {
  _id: string;
  ans: string;
  ques: string;
  createdAt: string;
}

export type Videos = {
  _id: string;
  title: string;
  video: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  type: 'Videos';
};

export type Podcasts = {
  _id: string;
  title: string;
  podcast: string;
  image: string;
  host_name: string;
  description: string;
  createdAt: string;
  type: 'Podcasts';
  updatedAt: string;
};

export type Jobs = {
  _id: string;
  title: string;
  category: string;
  image: string;
  status_detail: string;
  apply_link: string;
  doc: string;
  description: string;
  createdAt: string;
  type: 'Jobs';
  updatedAt: string;
};

export type Documents = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  type: 'Documents';
  isWhitePaper?: boolean | false;
};

export type Resource = {
  Videos: Videos[];
  Documents: Documents[];
  Jobs: Jobs[];
  Podcasts: Podcasts[];
  Blog: Blog[];
};

export type Announcements = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  date: string;
};

export type MyCourses = {
  _id: string;
  certificate_given: string;
  completed: string;
  createdAt: string;
  updatedAt: string;
  completed_sessions: [];
  completion_percentage: string;
  course_id: string;
  sessions: string;
  user_id: string;
  course: string
};

export type Dashboard = {
  announcements: Announcements[];
  blogs: Blog[];
  myCourses: any[];
  resources: {
    Videos: Videos[];
    Documents: Documents[];
    Jobs: Jobs[];
    Podcasts: Podcasts[];
    Blog: Blog[];
  };
  Blog: Blog[];
  courses: CourseList[];
};

export type CourseList = {
  _id: string;
  course_amt: number;
  course_category: string;
  course_instructor: string;
  updatedAt: string;
  course_pic: string;
  course_title: string;
  createdAt: string;
  description: string;
  paid_course: boolean | false;
  total_duration: number;
  total_session: number;
  tag: string;
  completion: number;
  thumbnail: string;
  enrolled: string[];
  completionId?: string;
};

export type AllCourse = {
  latest_courses : CourseList[];
  top_courses : CourseList[];
};
