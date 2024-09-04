import { supabase } from '../utils/supabase';
export default async function getUserData(usersId) {
  
  try {
    const { data, error } = await supabase.from('users').select().eq('id', usersId).single();


    if (error) {
      return {
        success: false,
        msg: error?.message,
      };
    } 
    return { success: true, data };
  } catch (error) {
    console.log('got an error: ', error);
    return { success: false, msg: error.message };
  }
}
