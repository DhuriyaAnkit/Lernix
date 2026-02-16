-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name,
    full_name,
    mobile_number,
    address,
    pin_code,
    city,
    state,
    country
  )
  VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', null),
    coalesce(new.raw_user_meta_data ->> 'last_name', null),
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    coalesce(new.raw_user_meta_data ->> 'mobile_number', null),
    coalesce(new.raw_user_meta_data ->> 'address', null),
    coalesce(new.raw_user_meta_data ->> 'pin_code', null),
    coalesce(new.raw_user_meta_data ->> 'city', null),
    coalesce(new.raw_user_meta_data ->> 'state', null),
    coalesce(new.raw_user_meta_data ->> 'country', null)
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample courses
INSERT INTO public.courses (title, description, instructor_name, image_url, price_cents, category, level, duration_hours, what_you_learn, requirements)
VALUES
  (
    'Introduction to Machine Learning',
    'Learn the fundamentals of machine learning from scratch. Understand algorithms, data preprocessing, and how to build your first ML models.',
    'Dr. Sarah Chen',
    'https://images.unsplash.com/photo-1516321318423-f06fe33e9541?w=800',
    4999,
    'Machine Learning',
    'Beginner',
    12,
    ARRAY['Basic ML concepts', 'Supervised learning', 'Model evaluation', 'Python for ML', 'Feature engineering'],
    ARRAY['Basic Python knowledge', 'High school math']
  ),
  (
    'Advanced Deep Learning with TensorFlow',
    'Master deep neural networks, CNNs, RNNs, and transformers. Build production-ready deep learning applications.',
    'Prof. James Mitchell',
    'https://images.unsplash.com/photo-1559618666-cd4628902249?w=800',
    7999,
    'Deep Learning',
    'Advanced',
    24,
    ARRAY['Neural networks', 'CNNs for vision', 'RNNs for sequences', 'Transformers', 'Transfer learning', 'Model deployment'],
    ARRAY['ML fundamentals', 'Python proficiency', 'Linear algebra basics']
  ),
  (
    'Natural Language Processing Bootcamp',
    'Process and analyze text data with NLP. Learn to build chatbots, sentiment analysis, and language models.',
    'Dr. Emma Watson',
    'https://images.unsplash.com/photo-1677442d019cecf8e1aa76d01b06b9a6b?w=800',
    5999,
    'Natural Language Processing',
    'Intermediate',
    18,
    ARRAY['Text preprocessing', 'Word embeddings', 'Transformers', 'Sentiment analysis', 'Named entity recognition', 'Chatbots'],
    ARRAY['Python programming', 'Machine learning basics', 'Understanding of neural networks']
  ),
  (
    'Computer Vision Masterclass',
    'Build intelligent systems that can see and understand images. From basic image processing to advanced object detection.',
    'Prof. Michael Zhang',
    'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800',
    6999,
    'Computer Vision',
    'Intermediate',
    20,
    ARRAY['Image processing', 'CNNs', 'Object detection', 'Image segmentation', 'Face recognition', 'Real-time applications'],
    ARRAY['Python experience', 'Deep learning basics', 'Linear algebra']
  ),
  (
    'Generative AI and LLMs',
    'Explore the cutting edge of AI. Learn how large language models work and how to build with them.',
    'Dr. Alex Rodriguez',
    'https://images.unsplash.com/photo-1634438475955-e51519e5e601?w=800',
    8999,
    'Generative AI',
    'Advanced',
    16,
    ARRAY['Large language models', 'Prompt engineering', 'Fine-tuning', 'RAG systems', 'Building AI applications', 'Ethical AI'],
    ARRAY['Python mastery', 'Deep learning knowledge', 'Understanding transformers']
  ),
  (
    'AI for Business & Analytics',
    'Apply AI and machine learning to solve real business problems. Perfect for non-technical professionals.',
    'Ms. Lisa Chen',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    3999,
    'Business AI',
    'Beginner',
    10,
    ARRAY['AI fundamentals', 'Business applications', 'Data analytics', 'Decision making with ML', 'ROI calculation'],
    ARRAY['Basic computer literacy', 'No coding required']
  ),
  (
    'Reinforcement Learning: From Theory to Practice',
    'Master the art of training agents to make decisions. Build game-playing AI and autonomous systems.',
    'Prof. David Smith',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    6999,
    'Reinforcement Learning',
    'Advanced',
    22,
    ARRAY['RL fundamentals', 'Q-learning', 'Policy gradients', 'Game AI', 'Robotics control', 'OpenAI Gym'],
    ARRAY['Strong Python skills', 'Deep learning knowledge', 'Linear algebra']
  ),
  (
    'AI Ethics & Responsible AI',
    'Learn how to build AI systems that are fair, transparent, and beneficial to society.',
    'Dr. Patricia Lee',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    3999,
    'AI Ethics',
    'Beginner',
    8,
    ARRAY['AI bias and fairness', 'Transparency', 'Privacy preservation', 'Responsible deployment', 'Regulation compliance'],
    ARRAY['Basic AI understanding']
  );
