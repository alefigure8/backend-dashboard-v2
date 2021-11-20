import { Router } from 'express';
import { registerUser, LoginUser, listUser, deleteUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../libs/logged.js';
const router = Router(); // LOGIN VIEW

router.get('/', (req, res) => {
  res.render('./auth/login', {
    layout: false
  });
}); // LOGIN

router.post('/', LoginUser); // REGISTER VIEW

router.get('/register', isLoggedIn, (req, res) => {
  res.render('./auth/register');
}); // REGISTER

router.post('/register', isLoggedIn, registerUser); // VIEW LIST

router.get('/view', isLoggedIn, listUser); // DELETE

router.get('/delete/:id', isLoggedIn, deleteUser);
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/user');
});
export default router;