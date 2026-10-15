/**
 * One-time admin setup script.
 * 
 * PREREQUISITES:
 * 1. Run the SQL migration (supabase/migrations/20260906_initial_schema.sql)
 *    in your Supabase Dashboard → SQL Editor FIRST.
 * 2. Then run this script: node scripts/setup-admin.mjs
 */

const SUPABASE_URL = "https://hpgwwpmynxklgeqdxcmm.supabase.co";
const SUPABASE_KEY = "sb_publishable_2ttpF8obmMowIFqwLG0_Kw_hlBoWqFx";

const ADMIN_EMAIL = "mukesh@admin.com";
const ADMIN_PASSWORD = "Mukeshverma@admin555";

async function main() {
  console.log("🔧 Setting up admin user...\n");

  // Step 1: Sign up the user
  console.log(`📧 Creating user: ${ADMIN_EMAIL}`);
  const signupRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  const signupData = await signupRes.json();

  if (!signupRes.ok) {
    // User might already exist - try signing in instead
    if (signupData?.msg?.includes("already") || signupData?.error_description?.includes("already") || signupData?.message?.includes("already")) {
      console.log("ℹ️  User already exists. Signing in instead...");
    } else {
      console.error("❌ Signup failed:", JSON.stringify(signupData, null, 2));
      console.log("\n💡 If you see auth errors, make sure:");
      console.log("   - Your Supabase project URL and key are correct");
      console.log("   - Email auth is enabled in Supabase Dashboard → Authentication → Providers");
      return;
    }
  } else {
    console.log("✅ User created successfully!");
    if (signupData?.user?.id) {
      console.log(`   User ID: ${signupData.user.id}`);
    }
  }

  // Step 2: Sign in to get access token
  console.log("\n🔑 Signing in...");
  const signinRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  const signinData = await signinRes.json();

  if (!signinRes.ok) {
    console.error("❌ Sign-in failed:", JSON.stringify(signinData, null, 2));
    console.log("\n💡 If email confirmation is required:");
    console.log("   1. Go to Supabase Dashboard → Authentication → Users");
    console.log("   2. Find the user and click 'Confirm email'");
    console.log("   OR disable email confirmation:");
    console.log("   1. Go to Supabase Dashboard → Authentication → Providers → Email");
    console.log("   2. Disable 'Confirm email'");
    return;
  }

  const accessToken = signinData.access_token;
  const userId = signinData.user?.id;
  console.log(`✅ Signed in! User ID: ${userId}`);

  // Step 3: Call claim_admin function (or insert directly)
  console.log("\n👑 Assigning admin role...");
  const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/claim_admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: "{}",
  });

  if (rpcRes.ok) {
    const result = await rpcRes.json();
    if (result === true) {
      console.log("✅ Admin role assigned successfully!");
    } else {
      console.log("ℹ️  An admin already exists. Trying direct insert...");
      // Try direct insert as fallback
      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/user_roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${accessToken}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          user_id: userId,
          role: "admin",
        }),
      });
      if (insertRes.ok) {
        console.log("✅ Admin role assigned via direct insert!");
      } else {
        const err = await insertRes.text();
        console.log("⚠️  Could not assign admin role:", err);
        console.log("\n💡 You may need to manually insert the admin role:");
        console.log(`   INSERT INTO user_roles (user_id, role) VALUES ('${userId}', 'admin');`);
      }
    }
  } else {
    const errText = await rpcRes.text();
    console.log("⚠️  claim_admin RPC failed:", errText);
    console.log("\n💡 Make sure you ran the SQL migration first!");
    console.log("   Go to Supabase Dashboard → SQL Editor and run:");
    console.log("   supabase/migrations/20260906_initial_schema.sql");
  }

  console.log("\n🎉 Setup complete!");
  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${"*".repeat(ADMIN_PASSWORD.length)}`);
  console.log("\n   You can now log in at: /admin/login");
}

main().catch(console.error);
