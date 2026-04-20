const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function fixPasswords() {
  console.log('Fetching users from Supabase...');
  const { data: users, error } = await supabase.from('usuario').select('*');
  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  let updatedCount = 0;
  for (const user of users) {
    if (!user.password_hash) continue;
    
    // bcrypt hashes start with $2a$, $2b$, or $2y$
    if (!user.password_hash.startsWith('$2')) {
      console.log(`Hashing plain-text password for user: ${user.email} (current plain password: ${user.password_hash})`);
      const hashedPassword = await bcrypt.hash(user.password_hash, 10);
      const { error: updateError } = await supabase
        .from('usuario')
        .update({ password_hash: hashedPassword })
        .eq('id_usuario', user.id_usuario);
      
      if (updateError) {
        console.error(`Failed to update ${user.email}:`, updateError);
      } else {
        console.log(`Successfully updated ${user.email}`);
        updatedCount++;
      }
    } else {
       console.log(`User ${user.email} already has a hashed password.`);
    }
  }
  console.log(`\nDone. Updated ${updatedCount} users.`);
}

fixPasswords();
