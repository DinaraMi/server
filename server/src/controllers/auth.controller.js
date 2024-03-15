const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(
    email,
    password,
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  const { refresh } = req.cookies;
  if (
    refresh &&
    refresh.token &&
    refresh.expires &&
    refresh.expires > Date.now()
  ) {
    await authService.logout(refresh.token);
  }
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const refresh = JSON.parse(req.cookies.refresh);
  if (
    !refresh ||
    !refresh.token ||
    !refresh.expires ||
    refresh.expires < Date.now()
  ) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }
  const tokens = await authService.refreshAuth(refresh.token);
  res.send({ tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email,
  );
  await emailService.sendResetPasswordEmail(
    req.body.email,
    resetPasswordToken,
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user,
  );
  await emailService.sendVerificationEmail(
    req.user.email,
    verifyEmailToken,
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
