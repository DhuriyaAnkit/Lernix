export interface Course {
  id: string
  name: string
  description: string
  priceInCents: number
  image: string
  instructor: string
  level: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  students: number
  duration: string
  lessons: number
}

export const COURSES: Course[] = [
  {
    id: 'ai-fundamentals',
    name: 'AI Fundamentals',
    description: 'Learn the basics of artificial intelligence, machine learning, and deep learning with practical examples.',
    priceInCents: 9999, // $99.99
    image: '/courses/ai-fundamentals.jpg',
    instructor: 'Dr. Sarah Chen',
    level: 'beginner',
    rating: 4.8,
    students: 12500,
    duration: '8 weeks',
    lessons: 32
  },
  {
    id: 'machine-learning-pro',
    name: 'Machine Learning Professional',
    description: 'Master supervised and unsupervised learning, neural networks, and real-world ML applications.',
    priceInCents: 19999, // $199.99
    image: '/courses/ml-pro.jpg',
    instructor: 'Prof. James Mitchell',
    level: 'intermediate',
    rating: 4.9,
    students: 8300,
    duration: '12 weeks',
    lessons: 48
  },
  {
    id: 'deep-learning-advanced',
    name: 'Deep Learning Advanced',
    description: 'Advanced deep learning techniques including CNNs, RNNs, transformers, and cutting-edge architectures.',
    priceInCents: 29999, // $299.99
    image: '/courses/dl-advanced.jpg',
    instructor: 'Dr. Michael Zhang',
    level: 'advanced',
    rating: 4.7,
    students: 4200,
    duration: '10 weeks',
    lessons: 42
  },
  {
    id: 'nlp-mastery',
    name: 'Natural Language Processing Mastery',
    description: 'Build intelligent NLP systems with transformers, BERT, GPT, and modern language models.',
    priceInCents: 24999, // $249.99
    image: '/courses/nlp-mastery.jpg',
    instructor: 'Dr. Emily Watson',
    level: 'advanced',
    rating: 4.9,
    students: 6100,
    duration: '10 weeks',
    lessons: 45
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision Essentials',
    description: 'Master image processing, object detection, segmentation, and real-time computer vision applications.',
    priceInCents: 19999, // $199.99
    image: '/courses/cv-essentials.jpg',
    instructor: 'Prof. David Lee',
    level: 'intermediate',
    rating: 4.8,
    students: 7600,
    duration: '9 weeks',
    lessons: 40
  },
  {
    id: 'ai-deployment',
    name: 'AI Model Deployment & MLOps',
    description: 'Learn to deploy, monitor, and scale AI models in production using modern DevOps practices.',
    priceInCents: 17999, // $179.99
    image: '/courses/ai-deployment.jpg',
    instructor: 'Alex Rodriguez',
    level: 'intermediate',
    rating: 4.6,
    students: 5400,
    duration: '8 weeks',
    lessons: 36
  },
  {
    id: 'gen-ai-apps',
    name: 'Generative AI Applications',
    description: 'Build real-world applications with ChatGPT, image generation, and large language models.',
    priceInCents: 22999, // $229.99
    image: '/courses/gen-ai.jpg',
    instructor: 'Dr. Lisa Anderson',
    level: 'intermediate',
    rating: 4.9,
    students: 15200,
    duration: '6 weeks',
    lessons: 28
  },
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning',
    description: 'Deep dive into RL algorithms, Q-learning, policy gradients, and game-playing AI.',
    priceInCents: 26999, // $269.99
    image: '/courses/rl-learning.jpg',
    instructor: 'Prof. Thomas Brown',
    level: 'advanced',
    rating: 4.8,
    students: 3800,
    duration: '11 weeks',
    lessons: 50
  }
]
