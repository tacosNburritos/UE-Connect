import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kepdoqlymzjszaktiukb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcGRvcWx5bXpqc3pha3RpdWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTk1OTIsImV4cCI6MjA2ODM5NTU5Mn0.z06JZ6zvobvjMQUPSo8HlZnxPeSHRT7JOT6PaDTZ-yg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
