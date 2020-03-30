"use strict";
const Ong = use("App/Models/Ong");
class SessionController {
  async session({ request, auth }) {
    const { email, password } = request.all();
    const { token } = await auth.attempt(email, password);
    if (!token) {
      return { status: "error", message: "Attemp failed." };
    }
    const { id, name } = await Ong.findBy("email", email);
    return {
      id,
      name,
      email,
      token
    };
  }
}

module.exports = SessionController;
