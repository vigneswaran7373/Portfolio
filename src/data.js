// All the text on the site lives here. Edit this file, save, and the page updates.
export const links = {
  email: 'vigneswaran7373@gmail.com',
  phone: '+919003916887',
  phoneText: '+91 90039 16887',
  linkedin: 'https://www.linkedin.com/in/vigneswaran-v-a1a383290',
  github: 'https://github.com/vigneswaran7373',
  resume: '/Vigneswaran-V-Resume.pdf',
};

export const phrases = ['full-stack MERN apps', 'real-time features', 'clean REST APIs', 'things people actually use'];

export const marquee = ['React', 'Node.js', 'Express', 'MongoDB', 'Java', 'JavaScript', 'REST APIs', 'WebSockets', 'JWT', 'Git', 'SQL', 'HTML', 'CSS', 'Vercel', 'Render'];

// Leave "live" or "code" empty ('') and that button is hidden until you fill it in.
export const projects = [
  {
    title: 'Remote Work Allocation System', sub: 'Deployed as WorkSync', color: '#34D399',
    live: 'https://remotework-allocation-mern-project.vercel.app',
    code: 'https://github.com/vigneswaran7373/Remotework-allocation-mern-project',
    img: '/assets/worksync.webp', frame: 'WorkSync, manager dashboard',
    alt: 'WorkSync manager dashboard with team score, workload and warnings per employee',
    desc: 'Managers create tasks and the system picks the best person for each one. Employees see only their own work and log a short check-in each day.',
    points: [
      'Scores every task against every employee on skill match, free weekly capacity and past on-time record, and shows the reason for each choice.',
      'A monitoring dashboard turns tasks and check-ins into productivity scores and flags overdue work, overload and missed check-ins.',
      'A background job assigns new tasks on a schedule. 24 automated tests cover the allocator and the API.',
    ],
    stack: 'MongoDB, Express, React, Node.js, JWT, REST APIs',
  },
  {
    title: 'Q-Easy', sub: 'Smart queue management system', color: '#FB7A3C',
    live: 'https://qeasy-queuemanagement-mern-project.vercel.app',
    code: 'https://github.com/vigneswaran7373/qeasy-queuemanagement-mern-project',
    img: '/assets/qeasy.webp', frame: 'Q-Easy, customer home',
    alt: "Q-Easy home page with live queue count, the customer's tickets and the service list",
    desc: 'Customers take a digital ticket and watch their position and wait time update live. A manager console runs the counter, and a lobby board shows who is being served.',
    points: [
      "Updates travel over WebSockets, so a manager's click reaches the customer's phone in under a second.",
      'Ticket numbers come from atomic counters, and simultaneous "call next" clicks can never serve two people at once.',
      'Wait estimates learn from real service times, and leftover tickets from earlier days are closed automatically.',
    ],
    stack: 'MongoDB, Express, React, Node.js, WebSockets, JWT, automation',
  },
  {
    title: 'Doctor Appointment Booking', sub: 'Deployed as CareSlot', color: '#5B8CFF',
    live: 'https://doctor-oppointment-mern-project.vercel.app',
    code: 'https://github.com/vigneswaran7373/Doctor-oppointment-mern-project',
    img: '/assets/careslot.webp', frame: 'CareSlot, patient view',
    alt: 'CareSlot doctors page with search and specialty filters',
    desc: 'Patients search doctors, pick a free slot and manage their bookings. Doctors confirm or complete visits, and an admin manages doctors and sees every appointment.',
    points: [
      "Slots are generated from each doctor's working days and hours, with booked and past times switched off.",
      'A unique slot lock in MongoDB rules out double booking. A test sends four patients after one slot and exactly one gets it.',
      'Login comes first: visitors only see the sign in page, and each role gets its own screens.',
    ],
    stack: 'MongoDB, Express, React, Node.js, JWT, REST APIs',
  },
];

export const skills = [
  { title: 'Core', items: ['Java', 'JavaScript', 'HTML', 'CSS', 'React.js', 'Node.js', 'Express.js', 'MongoDB'] },
  { title: 'Tools and concepts', items: ['Git', 'GitHub', 'SQL', 'Data Structures and Algorithms', 'REST APIs', 'MongoDB Atlas', 'Vercel', 'Render'] },
  { title: 'Soft skills', items: ['Problem solving', 'Teamwork', 'Communication', 'Adaptability'] },
];

export const timeline = [
  { type: 'Education', when: '2023 to 2027', title: 'B.E. Computer Science and Engineering', note: 'Mahendra Engineering College, CGPA 8.13' },
  { type: 'Achievement', title: '2nd prize, AITERHACK25 Hackathon', note: 'Also 3rd prize at the Intra-Institutional Innovation Challenge' },
  { type: 'Internship', title: 'Salesforce', note: 'CRM-based solutions and enterprise application concepts' },
  { type: 'Internship', title: 'ServiceNow', note: 'Enterprise service management and workflow-based solutions' },
  { type: 'Internship', title: 'WordPress', note: 'Website development, theme customization and content management' },
  { type: 'Activity', title: 'Bootcamps for juniors', note: 'Conducted HTML, CSS, JavaScript and IoT sessions to share hands-on knowledge' },
  { type: 'Certification', title: 'NPTEL', note: 'Programming in Java, Cloud Computing, Introduction to Internet of Things' },
  { type: 'Education', when: '2022 to 2023', title: 'HSC', note: 'The Gugai Higher Secondary School, 73.6%' },
];
