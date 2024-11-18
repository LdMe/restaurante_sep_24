import bcrypt from "bcrypt";


async function hashPassword(password){
    const hash = await bcrypt.hash(password,10);
    return hash;
}

async function verifyPassword(password,hash){
  const match = await bcrypt.compare(password, hash);
  return match;
}

export {
    hashPassword,
    verifyPassword
}