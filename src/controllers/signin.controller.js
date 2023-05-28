import Joi from 'joi';

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const handleSignin = (db, bcrypt) => async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    // Fetch user's email and hashed password from the database
    const data = await db
      .select('email', 'hash')
      .from('login')
      .where('email', '=', email)
      .first();

    if (!data) {
      return res.status(400).json('Login failed; Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, data.hash);

    if (isValid) {
      const user = await db
        .select('*')
        .from('users')
        .where('email', '=', email)
        .first();

      res.status(200).json(user);
    } else {
      res.status(400).json('Login failed; Invalid email or password');
    }
  } catch (err) {
    res.status(400).json('Login failed; Invalid email or password');
  }
};

export { handleSignin };
