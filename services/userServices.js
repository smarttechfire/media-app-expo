import { supabase } from '../utils/supabase';

// services/userServices.js

const getUserData = async (userId) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single(); // Assuming single user data is fetched

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};

export default getUserData;
