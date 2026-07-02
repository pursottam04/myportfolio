/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SkillCategory, ExperienceItem, ReferenceItem } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "automated-packing",
    title: "Automated Packing System",
    category: "AUTOMATION",
    client: "Lallin Lammas Oy",
    period: "Spring 2024",
    summary: "Designed and implemented a complete automated sheep-meat and wool products packaging system in the SAMK laboratory.",
    problem: "Lallin Lammas Oy (a local Finnish agricultural business) required a streamlined, labor-efficient packaging and conveyor workflow to handle heavy box routing and product sorting safely in their facility.",
    solution: "Integrated a conveyor system with optical sensors, safety actuators, and a PLC control logic framework. Developed custom box routing and packaging triggers to sort wool and meat products dynamically based on size and weight parameters, gaining hands-on experience in industrial automation workflows.",
    technologies: ["PLC Programming", "Industrial Automation", "Sensor Integration", "Siemens TIA Portal", "Conveyor Control", "Safety Logic"],
    imageUrl: "/packing-system.jpg",
    videoUrl: "/packing-system.mp4",
    specifications: [
      { label: "Laboratory", value: "SAMK Mechatronics Lab" },
      { label: "Client Partner", value: "Lallin Lammas Oy" },
      { label: "System Core", value: "PLC Logic Controller" },
      { label: "Standard", value: "Finnish Workplace Safety" }
    ]
  },
  {
    id: "custom-gripper",
    title: "Transbox Handling Gripper",
    category: "CAD DESIGN",
    period: "Winter 2024",
    summary: "Designed, fabricated, and programmed a custom frame-based parallel mechanical gripper with linear guide rails and 3D printed holders to automate transbox pick-and-place operation.",
    problem: "The design, fabrication, and programming of a gripper system to handle a standard plastic transbox safely and reliably. The objective was to design a mechanical gripper suitable for transbox handling, manufacture/assemble the gripper, integrate the gripper with the industrial robot flange, and program the pick-and-place sequence.",
    solution: "Designed a frame-based structure in SolidWorks with linear guide rails and sliding arms to ensure parallel gripping. Custom holders were manufactured using FDM 3D printing (PETG) and machining, followed by careful assembly and alignment. Developed a robot program to perform the full pick-and-place operation, adjusting motion parameters (speed/position) to ensure smooth operations and resolving minor initial alignment slipping issues.",
    technologies: ["SolidWorks CAD", "Parallel Gripper Design", "Linear Guide Rails", "FDM 3D Printing (PETG)", "Precision Machining", "Turin Robot Controller", "Pick-and-Place Trajectories", "Pneumatic Integration", "System Alignment & Testing"],
    imageUrl: "/gripper.jpg",
    videoUrl: "/gripper.mp4",
    specifications: [
      { label: "CAD Tool", value: "SolidWorks" },
      { label: "Gripper Type", value: "Parallel sliding frame" },
      { label: "Manufacturing", value: "PETG 3D Printing & Machining" },
      { label: "Robot Integration", value: "TURIN Industrial Robot" },
      { label: "Cycle Pattern", value: "Automated Pick-and-Place" },
      { label: "Slide Guides", value: "Linear rails with sliding arms" }
    ]
  },
  {
    id: "christmas-window",
    title: "Christmas Window Automation",
    category: "ROBOTICS",
    period: "Nov - Dec 2024",
    summary: "Designed, programmed, and decorated an automated robotic Christmas display ('jouluikkuna') combining holiday tradition with modern technology.",
    problem: "Blending holiday traditions with mechatronics in a highly public, visible glass-front shop window in Huittinen and SAMK required reliable, continuous 24/7 operations, absolute spectator safety, and engaging visual choreography.",
    solution: "Programmed a TURIN TX-800 industrial robot arm adorned with a large festive bow to simulate an organic flight-path trajectory for Santa's sleigh. Curated a double-showcase public display: one presenting Santa's flight hovering over a warm glowing, handcrafted miniature winter village, and the other displaying a live digital simulation on a green-screen TV monitor, surrounded by festive gift boxes, traditional Nutcrackers, and a giant plush teddy bear wearing spectacles. Supported by the City of Huittinen, Satakuntaliitto, and co-funded by the European Union.",
    technologies: ["Robot Programming", "TURIN Kinematics", "Simulation Design", "Public Exhibition Art", "Safety Interlocking", "Sensor Control", "Double-Showcase Layout"],
    imageUrl: "/christmas-window.jpg",
    videoUrl: "/christmas-window.mp4",
    specifications: [
      { label: "Location", value: "SAMK / Huittinen Window" },
      { label: "Sponsor & EU Fund", value: "City of Huittinen / EU ERDF" },
      { label: "System Core", value: "TURIN TX-800 Industrial Robot" },
      { label: "Display Setup", value: "Physical Sleigh + Virtual Simulator" }
    ]
  },
  {
    id: "pick-and-place",
    title: "Automated Pick-and-Place Cell",
    category: "ROBOTICS",
    period: "Autumn 2024",
    summary: "Designed and programmed an automated pick-and-place robot cell by integrating sensors with a conveyor system.",
    problem: "Sorting and packaging delicate, variable-shape candy bags into shipping boxes at high speeds without crushing or damaging the food items.",
    solution: "Programmed an industrial robotic cell utilizing ABB RobotStudio for offline simulation and programming. Integrated photoelectric sensors with the conveyor system to detect the candy bags in real-time, triggering a precise robotic pick-and-place sequence with custom vacuum end-effectors into packaging containers.",
    technologies: ["RobotStudio", "ABB Offline Programming", "Pick-and-Place Kinematics", "Conveyor Tracking", "Vacuum Grippers", "Sensor Interfacing", "Industrial Workflows"],
    imageUrl: "/pick-and-place.jpg",
    videoUrl: "/pick-and-place.mp4",
    specifications: [
      { label: "Simulation Tool", value: "ABB RobotStudio" },
      { label: "End Effector", value: "Soft Vacuum Suction Cup" },
      { label: "Sensor Type", value: "Photoelectric Retroreflective" },
      { label: "Workflow", value: "High-Speed Product Sorting" }
    ]
  },
  {
    id: "welding-robot",
    title: "Robotic Welding with Han's Robot",
    category: "ROBOTICS",
    period: "Spring 2025",
    summary: "Programmed and operated a Han's collaborative robot (cobot) to perform automated MIG welding on structural steel parts.",
    problem: "Manual MIG welding of structural steel components requires consistent speed and angle which is highly repetitive and physically demanding. Automating the fillet welding path of steel T-joints requires high precision and real-world trajectory programming.",
    solution: "Developed precise movement trajectories using a Han's cobot integrated with a Kemppi welding machine. Programmed specific linear coordinates, wire-feed parameters, and torch angles to achieve high structural penetration and a clean, uniform weld seam on steel T-joint specimens.",
    technologies: ["Han's Robot Programming", "MIG/MAG Welding", "Collaborative Robots", "Fillet Welding Path", "Kemppi Weld Settings", "Robot Safety & Coordinates"],
    imageUrl: "/robotic-welding.jpg",
    videoUrl: "/robotic-welding.mp4",
    specifications: [
      { label: "Robot System", value: "Han's Collaborative Robot (Cobot)" },
      { label: "Welding Process", value: "Gas Metal Arc (MIG/MAG)" },
      { label: "Material Type", value: "S235 Structural Steel" },
      { label: "Weld Geometry", value: "Fillet Weld on T-Joint" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "mechanical",
    title: "Mechanical Engineering",
    skills: [
      {
        name: "SolidWorks & CAD",
        level: "Intermediate/Advanced",
        icon: "Cpu",
        description: "Part design, assemblies, static structural simulations (FEA), and technical drawings."
      },
      {
        name: "Mechanical Component Design",
        level: "Intermediate",
        icon: "PenTool",
        description: "Designing end effectors, custom linkages, and robust handling mechanisms like robot grippers."
      },
      {
        name: "Technical Drawings & GD&T",
        level: "Intermediate",
        icon: "FileText",
        description: "Creating precise manufacturing blueprints, assembly sheets, and engineering documentation."
      },
      {
        name: "Manual Welding",
        level: "Basic (Hands-on SAMK)",
        icon: "Flame",
        description: "Practical training in MMA and MIG/TIG welding at SAMK laboratories (Kemppi Expert certification)."
      }
    ]
  },
  {
    id: "electrical-automation",
    title: "Electrical & Automation",
    skills: [
      {
        name: "PLC Programming",
        level: "Basic/Intermediate",
        icon: "Sliders",
        description: "Basic PLC ladder logic programming and Siemens TIA Portal environment."
      },
      {
        name: "RobotStudio",
        level: "Intermediate",
        icon: "Bot",
        description: "Offline robot simulation, path planning, RAPID code scripting, and safety zone configurations."
      },
      {
        name: "Visual Components",
        level: "Intermediate",
        icon: "LayoutGrid",
        description: "Manufacturing layout simulations, robot cell cycle times, and automated line visualizations."
      },
      {
        name: "Industrial Automation & Sensors",
        level: "Intermediate",
        icon: "Zap",
        description: "Integrating photoelectric, inductive, and ultrasonic sensors with industrial actuators and control logic."
      }
    ]
  },
  {
    id: "software",
    title: "Software & Systems",
    skills: [
      {
        name: "Python Programming",
        level: "Basic/Intermediate",
        icon: "Terminal",
        description: "Scripting, telemetry visualization, basic algorithms, and serial port communications."
      },
      {
        name: "Arduino Programming",
        level: "Intermediate",
        icon: "CircuitBoard",
        description: "C++ embedded programming, sensor data acquisition, PWM actuator controls, and SPI/I2C communication."
      },
      {
        name: "Database Fundamentals",
        level: "Basic",
        icon: "Database",
        description: "Relational database schema structures, SQL queries, and basic telemetry log storage."
      },
      {
        name: "Office Suite & Docs",
        level: "Advanced",
        icon: "FileSpreadsheet",
        description: "Advanced Excel spreadsheet calculations, technical documentation writing, and professional reporting."
      }
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Practical Trainee – Cleaning Services",
    company: "RTK Palvelu",
    location: "Pori, Finland",
    period: "Nov 2024 – Present",
    description: [
      "Worked in a professional Finnish service organization adhering to rigorous workspace standards.",
      "Ensured high standards of reliability, punctuality, and responsibility across designated public and private client facilities.",
      "Demonstrated outstanding teamwork and adaptable communication within multi-cultural professional teams."
    ],
    highlights: [
      "Direct integration into Finnish work culture",
      "Strict compliance with Finnish occupational safety standards",
      "Demonstrated adaptability and continuous reliability"
    ]
  },
  {
    role: "Bachelor of Engineering Student (Mechatronics)",
    company: "Satakunta University of Applied Sciences (SAMK)",
    location: "Pori, Finland",
    period: "August 2023 – Present",
    description: [
      "Extensive laboratory work in robot automation, CAD component modeling, electrical wiring, and sensor integration.",
      "Led and contributed to multi-disciplinary engineering projects resolving real-world automation challenges.",
      "Acquired comprehensive theoretical foundations in engineering mathematics, electrical circuits, and material physics."
    ],
    highlights: [
      "3rd Year Mechatronics Engineering (Ongoing)",
      "Hands-on expertise in fully equipped SAMK robotics laboratory",
      "Expected Graduation: December 2026"
    ]
  }
];

export const REFERENCES: ReferenceItem[] = [
  {
    name: "Pulkkinen Petteri",
    role: "Lecturer, Mechatronics Engineering",
    organization: "Satakunta University of Applied Sciences (SAMK)",
    email: "petteri.pulkkinen@samk.fi",
    phone: "+358 44 710 3296"
  },
  {
    name: "Timo Kerminen",
    role: "Senior Lecturer / Sales Manager at Robomatik",
    organization: "Satakunta University of Applied Sciences (SAMK)",
    email: "timo.kerminen@samk.fi",
    phone: "+358 44 984 5704"
  }
];
