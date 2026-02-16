
import { 
  User, 
  MessStatus, 
  CrowdData, 
  FoodRecommendation, 
  WeightLog 
} from '../types';

const BASE_URL = '/api'; // This would be your Flask API URL

// Mock Data for fallback
const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@university.edu',
  age: 21,
  gender: 'male',
  height: 180,
  weight: 75,
  exerciseLevel: 'moderate',
  foodType: 'veg',
  goal: 'maintain',
  role: 'student'
};

const MOCK_MESS_STATUS: MessStatus = {
  occupancy: 45,
  capacity: 200,
  isOpen: true,
  entryAllowed: true
};

const MOCK_CROWD_DATA: CrowdData[] = [
  { time: '08:00', density: 20 },
  { time: '09:00', density: 80 },
  { time: '10:00', density: 40 },
  { time: '12:00', density: 150 },
  { time: '13:00', density: 180 },
  { time: '15:00', density: 60 },
  { time: '18:00', density: 120 },
];

const MOCK_FOOD_RECOMMENDATION: FoodRecommendation = {
  meal: 'Quinoa bowl with roasted chickpeas & spinach',
  calories: '450 - 550 kcal',
  reason: 'Based on your moderate activity level and maintenance goal, a high-fiber plant-based meal provides sustained energy without excess fats.'
};

const MOCK_WEIGHT_HISTORY: WeightLog[] = [
  { date: 'Mon', weight: 76.0 },
  { date: 'Tue', weight: 75.8 },
  { date: 'Wed', weight: 75.5 },
  { date: 'Thu', weight: 75.4 },
  { date: 'Fri', weight: 75.2 },
  { date: 'Sat', weight: 75.1 },
  { date: 'Sun', weight: 75.0 },
];

export const api = {
  login: async (email: string, pass: string): Promise<User> => {
    // POST /api/login
    console.log('API CALL: POST /api/login', { email });
    return MOCK_USER; 
  },

  register: async (userData: Partial<User>): Promise<User> => {
    // POST /api/register
    console.log('API CALL: POST /api/register', userData);
    return { ...MOCK_USER, ...userData } as User;
  },

  getDashboardData: async (): Promise<any> => {
    // GET /api/user/dashboard
    console.log('API CALL: GET /api/user/dashboard');
    return { user: MOCK_USER, mess: MOCK_MESS_STATUS };
  },

  getMessStatus: async (): Promise<MessStatus> => {
    // GET /api/mess/status
    console.log('API CALL: GET /api/mess/status');
    return MOCK_MESS_STATUS;
  },

  getCrowdDensity: async (): Promise<CrowdData[]> => {
    // GET /api/mess/crowd
    console.log('API CALL: GET /api/mess/crowd');
    return MOCK_CROWD_DATA;
  },

  getFoodRecommendation: async (userData: Partial<User>): Promise<FoodRecommendation> => {
    // POST /api/ml/food-recommendation
    console.log('API CALL: POST /api/ml/food-recommendation', userData);
    return MOCK_FOOD_RECOMMENDATION;
  },

  getWeightHistory: async (): Promise<WeightLog[]> => {
    // GET /api/user/weight-history
    console.log('API CALL: GET /api/user/weight-history');
    return MOCK_WEIGHT_HISTORY;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    // PUT /api/user/profile
    console.log('API CALL: PUT /api/user/profile', userData);
    return { ...MOCK_USER, ...userData } as User;
  },

  updateNotifications: async (settings: any): Promise<void> => {
    // POST /api/user/notifications
    console.log('API CALL: POST /api/user/notifications', settings);
  },

  // Admin Endpoints
  getAdminOccupancy: async () => {
    console.log('API CALL: GET /api/admin/occupancy');
    return { current: 45, history: MOCK_CROWD_DATA };
  },

  getAdminLogs: async () => {
    console.log('API CALL: GET /api/admin/logs');
    return [
      { id: 1, user: 'John Doe', action: 'Entry', time: '12:45 PM' },
      { id: 2, user: 'Jane Smith', action: 'Entry', time: '12:47 PM' },
    ];
  }
};
